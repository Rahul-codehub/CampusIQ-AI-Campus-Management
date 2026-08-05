import type { AppRole, CollectionName, Session, Tables } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const TOKEN_KEY = "campus_ai_auth_token";

interface ListOptions {
  sort?: string;
  limit?: number;
  filters?: Record<string, string | string[] | number | null | undefined>;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(body?.error || "Request failed.", response.status);
  }

  return body as T;
}

function toQuery(options: ListOptions = {}) {
  const params = new URLSearchParams();
  if (options.sort) params.set("sort", options.sort);
  if (options.limit) params.set("limit", String(options.limit));
  for (const [key, value] of Object.entries(options.filters || {})) {
    if (value === null || value === undefined) continue;
    params.set(`filter_${key}`, Array.isArray(value) ? value.join(",") : String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export const authApi = {
  async getSession(): Promise<Session | null> {
    if (!getToken()) return null;
    const { session } = await request<{ session: Session | null }>("/auth/session");
    if (!session) clearToken();
    return session;
  },

  async signIn(email: string, password: string, role: AppRole): Promise<Session> {
    const { session } = await request<{ session: Session }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
    if (session.access_token) setToken(session.access_token);
    return session;
  },

  async signUp(payload: {
  email: string;
  password: string;
  fullName: string;
  role: AppRole;

  mobile?: string;

  studentId?: string;

  facultyId?: string;

  departmentId?: string;

  semester?: number;

  enrollmentYear?: number;

  designation?: string;
}): Promise<void> {

  await request<{
    success: boolean;
    message: string;
  }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

},

  async resetPassword(email: string, password: string) {
    await request<{ ok: boolean }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async signOut() {
    try {
      await request("/auth/logout", { method: "POST" });
    } finally {
      clearToken();
    }
  },

 async getProfile() {
  const response = await request<{
    user: Session["user"];
  }>("/profile");

  console.log("GET PROFILE RESPONSE:", response);

  return response.user;
},

async changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  return request<{
    success: boolean;
    message: string;
  }>("/change-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
},

async updateProfile(profile: {
  full_name: string;
  phone: string | null;
}) {
  const response = await request<{
    success?: boolean;
    message?: string;
    user: Session["user"];
  }>("/profile", {
    method: "PATCH",
    body: JSON.stringify(profile),
  });

  console.log("UPDATE PROFILE RESPONSE:", response);

  return response.user;
},
};

export const dbApi = {
  async list<T extends CollectionName>(
    collection: T,
    options?: ListOptions
  ): Promise<Tables<T>[]> {
    const { data } = await request<{ data: Tables<T>[] }>(
      `/db/${collection}${toQuery(options)}`
    );

    return data;
  },

  async count(
    collection: CollectionName,
    filters?: ListOptions["filters"]
  ): Promise<number> {
    const { count } = await request<{ count: number }>(
      `/db/${collection}/count${toQuery({ filters })}`
    );

    return count;
  },

  async insert<T extends CollectionName>(
    collection: T,
    payload: Partial<Tables<T>>
  ): Promise<Tables<T>> {
    const { data } = await request<{ data: Tables<T> }>(
      `/db/${collection}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    return data;
  },

  async update<T extends CollectionName>(
    collection: T,
    id: string,
    payload: Partial<Tables<T>>
  ): Promise<Tables<T>> {
    const { data } = await request<{ data: Tables<T> }>(
      `/db/${collection}/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );

    return data;
  },
 async delete(
  collection: CollectionName,
  id: string
): Promise<boolean> {
  const { success } = await request<{ success: boolean }>(
    `/db/${collection}/${id}`,
    {
      method: "DELETE",
    }
  );

  return success;
},

  /* =========================================
     Registration Requests
  ========================================= */

  async getRegistrationRequests() {
    const { data } = await request<{
      data: any[];
    }>("/registration-requests");

    return data;
  },

  async approveRegistration(requestId: string) {
    return request("/registration-requests/approve", {
      method: "POST",
      body: JSON.stringify({
        requestId,
      }),
    });
  },

  async rejectRegistration(requestId: string) {
    return request("/registration-requests/reject", {
      method: "POST",
      body: JSON.stringify({
        requestId,
      }),
    });
  },
};

export { ApiError };
