import { getDb } from "../database/mongodb.mjs";

/* =========================================
   GET PENDING REQUESTS
========================================= */

export async function getPendingRequests() {

  const db = await getDb();

  return db
    .collection("registration_requests")
    .find({
      status: "pending",
    })
    .toArray();

}
/* =========================================
   APPROVE REQUEST
========================================= */

export async function approveRequest(
  requestId,
  approver
) {

  const db = await getDb();

  const requests =
    db.collection("registration_requests");

  const users =
    db.collection("users");

  const students =
    db.collection("students");

  const faculty =
    db.collection("faculty");

  /* =========================================
     FIND REQUEST
  ========================================= */

  const request =
    await requests.findOne({
      id: requestId,
    });

  if (!request) {
    throw new Error(
      "Registration request not found."
    );
  }

  if (request.status !== "pending") {
    throw new Error(
      "This request has already been processed."
    );
  }

  /* =========================================
     PERMISSIONS
  ========================================= */

  const isAdmin =
    (approver.roles || []).includes("admin");

  const isFaculty =
    (approver.roles || []).includes("faculty");

  if (
    request.role === "faculty" &&
    !isAdmin
  ) {
    throw new Error(
      "Only administrators can approve faculty registrations."
    );
  }

  if (
    request.role === "student" &&
    !isAdmin &&
    !isFaculty
  ) {
    throw new Error(
      "You do not have permission to approve student registrations."
    );
  }

  /* =========================================
     CHECK EXISTING USER
  ========================================= */

  const existingUser =
    await users.findOne({
      email: request.email,
    });

  if (existingUser) {
    throw new Error(
      "User already exists."
    );
  }

  const now =
    new Date().toISOString();
  /* =========================================
 CREATE USER
========================================= */
  if (
    request.role === "student"
  ) {

    const existingStudent =
      await students.findOne({
        student_id:
          request.student_id,
      });

    if (existingStudent) {
      throw new Error(
        "Student ID already exists."
      );
    }

  }

  if (
    request.role === "faculty"
  ) {

    const existingFaculty =
      await faculty.findOne({
        faculty_id:
          request.faculty_id,
      });

    if (existingFaculty) {
      throw new Error(
        "Faculty ID already exists."
      );
    }

  }

  await users.insertOne({

    id: request.id,

    email: request.email,

    password_hash:
      request.password_hash,

    roles: [request.role],

    status: "active",

    profile: {

      full_name:
        request.full_name,

      avatar_url: null,

      phone:
        request.phone,

    },

    created_at: now,

    updated_at: now,

  });


  /* =========================================
     CREATE STUDENT
  ========================================= */

  if (request.role === "student") {

    await students.insertOne({

      id: request.id,

      student_id:
        request.student_id,

      full_name:
        request.full_name,

      email:
        request.email,

      phone:
        request.phone,

      department_id:
        request.department_id,

      semester:
        Number(request.semester),

      enrollment_year:
        Number(request.enrollment_year),

      status: "active",

      created_at: now,

      updated_at: now,

    });

  }

  /* =========================================
     CREATE FACULTY
  ========================================= */

  if (request.role === "faculty") {

    await faculty.insertOne({

      id: request.id,

      faculty_id:
        request.faculty_id,

      full_name:
        request.full_name,

      email:
        request.email,

      phone:
        request.phone,

      department_id:
        request.department_id,

      designation:
        request.designation,

      status: "active",

      created_at: now,

      updated_at: now,

    });

  }

  /* =========================================
     UPDATE REQUEST
  ========================================= */

  await requests.updateOne(

    {
      id: request.id,
    },

    {
      $set: {

        status: "approved",

        approved_by_role:
          isAdmin ? "admin" : "faculty",

        approved_at: now,

        updated_at: now,

      },

    }

  );

  return {

    success: true,

    message:
      "Registration approved successfully.",

  };

}
/* =========================================
   REJECT REQUEST
========================================= */

export async function rejectRequest(
  requestId,
  approver
) {

  const db = await getDb();

  const requests =
    db.collection("registration_requests");

  /* =========================================
     FIND REQUEST
  ========================================= */

  const request =
    await requests.findOne({
      id: requestId,
    });

  if (!request) {
    throw new Error(
      "Registration request not found."
    );
  }

  if (request.status !== "pending") {
    throw new Error(
      "This request has already been processed."
    );
  }

  /* =========================================
     PERMISSIONS
  ========================================= */

  const isAdmin =
    (approver.roles || []).includes("admin");

  const isFaculty =
    (approver.roles || []).includes("faculty");

  if (
    request.role === "faculty" &&
    !isAdmin
  ) {
    throw new Error(
      "Only administrators can reject faculty registrations."
    );
  }

  if (
    request.role === "student" &&
    !isAdmin &&
    !isFaculty
  ) {
    throw new Error(
      "You do not have permission to reject student registrations."
    );
  }

  /* =========================================
     UPDATE REQUEST
  ========================================= */

  const now =
    new Date().toISOString();

  await requests.updateOne(

    {
      id: request.id,
    },

    {
      $set: {

        status: "rejected",

        rejected_by: approver.id,

        rejected_by_role:
          isAdmin ? "admin" : "faculty",

        rejected_at: now,

        updated_at: now,

      },

    }

  );

  return {

    success: true,

    message:
      "Registration rejected successfully.",

  };

}