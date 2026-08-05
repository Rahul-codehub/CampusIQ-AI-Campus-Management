const collectionPermissions = {
  registration_requests: {
    read: ["admin", "faculty"],
    create: [],
    update: ["admin", "faculty"],
  },

  users: {
    read: ["admin", "faculty"],
    create: [],
    update: ["admin", "faculty"],
  },

  departments: {
    read: ["admin", "faculty"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

  students: {
    read: ["admin", "faculty"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
    delete: ["admin", "faculty"],
  },

  faculty: {
    read: ["admin", "faculty"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

  courses: {
    read: ["admin", "faculty"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
    delete: ["admin", "faculty"],
  },

  attendance: {
    read: ["admin"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
  },

  complaints: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty", "student"],
    update: ["admin", "faculty"],
  },

  notices: {
    read: ["admin"],
    create: ["admin"],
    update: ["admin"],
  },

  events: {
    read: ["admin", "faculty"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
  },

  chatbot_logs: {
    read: ["admin", "student"],
    create: ["admin", "student"],
    update: ["admin"],
  },
};

export function hasPermission(user, collection, action) {
  const roles = user?.roles || ["student"];

  if (roles.includes("admin")) {
    return true;
  }

  const allowedRoles =
    collectionPermissions[collection]?.[action] || [];

  return roles.some((role) =>
    allowedRoles.includes(role)
  );
}

export function scopedFilters(
  collection,
  filters,
  user
) {
  const roles = user?.roles || ["student"];

  if (
    roles.includes("admin") ||
    roles.includes("faculty")
  ) {
    return filters;
  }

  if (
    collection === "complaints" ||
    collection === "chatbot_logs"
  ) {
    return {
      ...filters,
      user_id: user?.id,
    };
  }

  return filters;
}