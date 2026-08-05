import { randomUUID } from "node:crypto";

import { getDb } from "../database/mongodb.mjs";

import {
  send,
  sendError,
  parseBody,
} from "../utils/response.mjs";

import {
  publicUser,
  signToken,
  hashPassword,
  verifyPassword,
  normalizeRole,
} from "../utils/auth.mjs";

import {
  getAuthUser,
} from "../middleware/authMiddleware.mjs";

export async function handleAuth(req, res, pathParts) {
  const database = await getDb();

  const users = database.collection("users");
  const registrationRequests = database.collection("registration_requests");

  /* =========================================
     SESSION
  ========================================= */

  if (req.method === "GET" && pathParts[2] === "session") {
    const user = await getAuthUser(req);

    if (!user) {
      return send(res, 200, {
        session: null,
      });
    }

    return send(res, 200, {
      session: {
        user: publicUser(user),
      },
    });
  }

  /* =========================================
     SIGNUP
  ========================================= */

  if (req.method === "POST" && pathParts[2] === "signup") {
    const {
      email,
      password,
      fullName,
      role,

      // Student
      studentId,
      semester,
      enrollmentYear,

      // Faculty
      facultyId,
      designation,

      // Common
      mobile,
      departmentId,

    } = await parseBody(req);

    if (!email || !password) {
      return sendError(
        res,
        400,
        "Email and password are required."
      );
    }

    const selectedRole = normalizeRole(role);

    if (selectedRole === "admin") {
      return sendError(
        res,
        403,
        "Administrator accounts cannot be created through public registration."
      );
    }

    const now = new Date().toISOString();

    const request = {
      id: randomUUID(),

      full_name: fullName,

      email: String(email).toLowerCase(),

      password_hash: await hashPassword(password),

      role: selectedRole,

      /* Student */

      student_id:
        studentId || null,

      semester:
        semester ?? null,

      enrollment_year:
        enrollmentYear ?? null,

      /* Faculty */

      faculty_id:
        facultyId || null,

      designation:
        designation || null,

      /* Common */

      phone:
        mobile || null,

      department_id:
        departmentId || null,

      /* Workflow */

      status: "pending",

      approved_by: null,

      approved_at: null,

      rejected_by: null,

      rejected_at: null,

      created_at: now,
    };

    try {
      const existingUser = await users.findOne({
        email: request.email,
      });

      const existingRequest =
        await registrationRequests.findOne({
          email: request.email,
          status: "pending",
        });

      if (existingUser || existingRequest) {
        return sendError(
          res,
          409,
          "A registration with this email already exists."
        );
      }

      await registrationRequests.insertOne(request);

      return send(res, 201, {
        success: true,
        message:
          "Registration submitted successfully. Your account is awaiting approval.",
      });
    } catch (error) {
      if (error.code === 11000) {
        return sendError(
          res,
          409,
          "An account with this email already exists."
        );
      }

      throw error;
    }
  }

  /* =========================================
     LOGIN
  ========================================= */

  if (req.method === "POST" && pathParts[2] === "login") {
    const {
      email,
      password,
      role,
    } = await parseBody(req);

    const selectedRole = normalizeRole(role);

    const user = await users.findOne({
      email: String(email || "").toLowerCase(),
    });
    

    if (
      !user ||
      !(await verifyPassword(
        password || "",
        user.password_hash
      ))
    ) {
      return sendError(
        res,
        401,
        "Invalid email or password."
      );
    }

    if (
      !(user.roles || []).includes(selectedRole)
    ) {
      return sendError(
        res,
        403,
        `This account is not registered as ${selectedRole}.`
      );
    }

    if (user.status === "pending") {
      return sendError(
        res,
        403,
        "Your account is awaiting approval."
      );
    }

    if (user.status === "rejected") {
      return sendError(
        res,
        403,
        "Your registration request has been rejected."
      );
    }

    if (user.status === "blocked") {
      return sendError(
        res,
        403,
        "Your account has been blocked. Please contact the administrator."
      );
    }

    return send(res, 200, {
      session: {
        access_token: signToken(user),
        user: publicUser(user),
      },
    });
  }

  /* =========================================
     FORGOT PASSWORD
  ========================================= */

  if (
    req.method === "POST" &&
    pathParts[2] === "forgot-password"
  ) {
    const {
      email,
      password,
    } = await parseBody(req);

    if (!email || !password) {
      return sendError(
        res,
        400,
        "Email and new password are required."
      );
    }

    if (String(password).length < 6) {
      return sendError(
        res,
        400,
        "Password must be at least 6 characters."
      );
    }

    const result = await users.updateOne(
      {
        email: String(email).toLowerCase(),
      },
      {
        $set: {
          password_hash: await hashPassword(password),
          updated_at: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return sendError(
        res,
        404,
        "No account found for this email."
      );
    }

    return send(res, 200, {
      ok: true,
    });
  }

  /* =========================================
     LOGOUT
  ========================================= */

  if (
    req.method === "POST" &&
    pathParts[2] === "logout"
  ) {
    return send(res, 200, {
      ok: true,
    });
  }

  return sendError(
    res,
    404,
    "Route not found."
  );
}