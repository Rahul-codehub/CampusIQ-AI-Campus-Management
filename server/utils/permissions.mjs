// const collectionPermissions = {
//   registration_requests: {
//     read: ["admin", "faculty"],
//     create: [],
//     update: ["admin", "faculty"],
//   },

//   users: {
//     read: ["admin", "faculty"],
//     create: [],
//     update: ["admin", "faculty"],
//   },

//   departments: {
//     read: ["admin", "faculty"],
//     create: ["admin"],
//     update: ["admin"],
//     delete: ["admin"],
//   },

//   students: {
//     read: ["admin", "faculty"],
//     create: ["admin", "faculty"],
//     update: ["admin", "faculty"],
//     delete: ["admin", "faculty"],
//   },

//   faculty: {
//     read: ["admin", "faculty"],
//     create: ["admin"],
//     update: ["admin"],
//     delete: ["admin"],
//   },

//   courses: {
//     read: ["admin", "faculty"],
//     create: ["admin", "faculty"],
//     update: ["admin", "faculty"],
//     delete: ["admin", "faculty"],
//   },

//   attendance: {
//     read: ["admin"],
//     create: ["admin", "faculty"],
//     update: ["admin", "faculty"],
//   },

//   /* =========================================
//      COMPLAINTS
//   ========================================= */

//  complaints: {
//   read: ["admin", "faculty", "student"],
//   create: ["admin", "faculty", "student"],
//   update: ["admin", "faculty"],
//   delete: ["admin", "faculty"],
// },

//   notices: {
//     read: ["admin"],
//     create: ["admin"],
//     update: ["admin"],
//   },

//   events: {
//     read: ["admin", "faculty"],
//     create: ["admin", "faculty"],
//     update: ["admin", "faculty"],
//   },

//   chatbot_logs: {
//     read: ["admin", "student"],
//     create: ["admin", "student"],
//     update: ["admin"],
//   },
// };


// /* =========================================================
//    CHECK GENERAL COLLECTION PERMISSION
// ========================================================= */

// export function hasPermission(user, collection, action) {
//   const roles = user?.roles || ["student"];

//   /*
//    * Admin has full access.
//    */
//   if (roles.includes("admin")) {
//     return true;
//   }

//   const allowedRoles =
//     collectionPermissions[collection]?.[action] || [];

//   return roles.some((role) =>
//     allowedRoles.includes(role)
//   );
// }


// /* =========================================================
//    SCOPED READ FILTERS
// ========================================================= */

// export function scopedFilters(
//   collection,
//   filters,
//   user
// ) {
//   const roles = user?.roles || ["student"];

//   /*
//    * Admin can see everything.
//    */
//   if (roles.includes("admin")) {
//     return filters;
//   }


//   /* =========================================
//      COMPLAINTS
//   ========================================= */

//   if (collection === "complaints") {

//     /*
//      * Faculty can see:
//      *
//      * 1. Student complaints
//      * 2. Their own complaints
//      *
//      * They cannot see another faculty member's
//      * complaints.
//      */
//     if (roles.includes("faculty")) {
//       return {
//         ...filters,
//         $or: [
//           {
//             creator_role: "student",
//           },
//           {
//             user_id: user?.id,
//           },
//         ],
//       };
//     }


//     /*
//      * Students can only see complaints
//      * created by themselves.
//      */
//     if (roles.includes("student")) {
//       return {
//         ...filters,
//         user_id: user?.id,
//       };
//     }
//   }


//   /* =========================================
//      CHATBOT LOGS
//   ========================================= */

//   if (collection === "chatbot_logs") {
//     return {
//       ...filters,
//       user_id: user?.id,
//     };
//   }


//   return filters;
// }


// /* =========================================================
//    COMPLAINT UPDATE PERMISSION
// ========================================================= */

// export function canUpdateComplaint(user, complaint) {
//   const roles = user?.roles || ["student"];


//   /*
//    * Admin can update any complaint.
//    */
//   if (roles.includes("admin")) {
//     return true;
//   }


//   /*
//    * Students cannot update complaints.
//    */
//   if (roles.includes("student")) {
//     return false;
//   }


//   /*
//    * Faculty can update ONLY student complaints.
//    *
//    * A faculty member cannot resolve or modify
//    * another faculty member's complaint.
//    */
//   if (roles.includes("faculty")) {
//     return complaint?.creator_role === "student";
//   }


//   return false;
// }











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
    read: ["admin", "faculty", "student"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

  students: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
    delete: ["admin", "faculty"],
  },

  faculty: {
    read: ["admin", "faculty", "student"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

  courses: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
    delete: ["admin", "faculty"],
  },

  attendance: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
  },

  /* =========================================
     COMPLAINTS
  ========================================= */

  complaints: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty", "student"],
    update: ["admin", "faculty"],
    delete: ["admin", "faculty"],
  },

  notices: {
    read: ["admin", "faculty", "student"],
    create: ["admin"],
    update: ["admin"],
  },

  events: {
    read: ["admin", "faculty", "student"],
    create: ["admin", "faculty"],
    update: ["admin", "faculty"],
  },

  chatbot_logs: {
    read: ["admin", "student"],
    create: ["admin", "student"],
    update: ["admin"],
  },
};


/* =========================================================
   CHECK GENERAL COLLECTION PERMISSION
========================================================= */

export function hasPermission(user, collection, action) {
  const roles = user?.roles || ["student"];

  /*
   * Admin has full access.
   */
  if (roles.includes("admin")) {
    return true;
  }

  const allowedRoles =
    collectionPermissions[collection]?.[action] || [];

  return roles.some((role) =>
    allowedRoles.includes(role)
  );
}


/* =========================================================
   SCOPED READ FILTERS
========================================================= */

export function scopedFilters(
  collection,
  filters,
  user
) {
  const roles = user?.roles || ["student"];

  /*
   * Admin can see everything.
   */
  if (roles.includes("admin")) {
    return filters;
  }


  /* =========================================
     ATTENDANCE
  ========================================= */

  if (collection === "attendance") {

    /*
     * Students can only see their own
     * attendance records.
     *
     * student_id in attendance refers to
     * the student's student record ID.
     *
     * The database route will combine this
     * with the authenticated user's identity.
     */
    if (roles.includes("student")) {
      return {
        ...filters,
        student_user_id: user?.id,
      };
    }
  }


  /* =========================================
     STUDENTS
  ========================================= */

  if (collection === "students") {

    /*
     * Students can only see their own
     * student record.
     */
    if (roles.includes("student")) {
      return {
        ...filters,
        user_id: user?.id,
      };
    }
  }


  /* =========================================
     * FACULTY
     ========================================= */

  if (collection === "faculty") {

    /*
     * Students may read faculty information
     * required by the academic UI.
     *
     * No personal faculty record restriction
     * is required here.
     */
  }


  /* =========================================
     * COMPLAINTS
  ========================================= */

  if (collection === "complaints") {

    /*
     * Faculty can see:
     *
     * 1. Student complaints
     * 2. Their own complaints
     *
     * They cannot see another faculty member's
     * complaints.
     */
    if (roles.includes("faculty")) {
      return {
        ...filters,
        $or: [
          {
            creator_role: "student",
          },
          {
            user_id: user?.id,
          },
        ],
      };
    }


    /*
     * Students can only see complaints
     * created by themselves.
     */
    if (roles.includes("student")) {
      return {
        ...filters,
        user_id: user?.id,
      };
    }
  }


  /* =========================================
     * CHATBOT LOGS
  ========================================= */

  if (collection === "chatbot_logs") {
    return {
      ...filters,
      user_id: user?.id,
    };
  }


  return filters;
}


/* =========================================================
   COMPLAINT UPDATE PERMISSION
========================================================= */

export function canUpdateComplaint(
  user,
  complaint
) {
  const roles = user?.roles || ["student"];


  /*
   * Admin can update any complaint.
   */
  if (roles.includes("admin")) {
    return true;
  }


  /*
   * Students cannot update complaints.
   */
  if (roles.includes("student")) {
    return false;
  }


  /*
   * Faculty can update ONLY student complaints.
   *
   * A faculty member cannot resolve or modify
   * another faculty member's complaint.
   */
  if (roles.includes("faculty")) {
    return complaint?.creator_role === "student";
  }


  return false;
}