import { randomUUID } from "node:crypto";

import { getDb } from "../database/mongodb.mjs";
import { hashPassword } from "../utils/auth.mjs";

const DEMO_PASSWORD = "CampusIQ@Demo2026";

const DEMO_ACCOUNTS = {
  student: {
    email: "demo.student@campusiq.demo",
    fullName: "CampusIQ Demo Student",
    studentId: "DEMO-STU-001",
  },

  faculty: {
    email: "demo.faculty@campusiq.demo",
    fullName: "CampusIQ Demo Faculty",
    facultyId: "DEMO-FAC-001",
  },

  admin: {
    email: "demo.admin@campusiq.demo",
    fullName: "CampusIQ Demo Administrator",
  },
};

async function seedDemoAccounts() {
  const db = await getDb();

  const users = db.collection("users");
  const students = db.collection("students");
  const faculty = db.collection("faculty");
  const departments = db.collection("departments");

  const now = new Date().toISOString();

  /* =========================================
     GET DEMO DEPARTMENT
  ========================================= */

  let department = await departments.findOne({
    code: "CSE",
  });

  if (!department) {
    department = await departments.findOne({});
  }

  if (!department) {
    throw new Error(
      "No department exists. CampusIQ must have at least one department before creating demo accounts."
    );
  }

  console.log(
    `Using department: ${department.name} (${department.id})`
  );

  /* =========================================
     PASSWORD
  ========================================= */

  const passwordHash =
    await hashPassword(DEMO_PASSWORD);

  /* =========================================
     STUDENT
  ========================================= */

  const student =
    DEMO_ACCOUNTS.student;

  let studentUser =
    await users.findOne({
      email: student.email,
    });

  if (!studentUser) {

    const userId =
      randomUUID();

    await users.insertOne({
      id: userId,

      email:
        student.email,

      password_hash:
        passwordHash,

      roles: ["student"],

      status: "active",

      profile: {
        full_name:
          student.fullName,

        avatar_url: null,

        phone: "9000000001",
      },

      created_at: now,

      updated_at: now,
    });

    await students.updateOne(
      {
        student_id:
          student.studentId,
      },
      {
        $setOnInsert: {
          id: userId,

          student_id:
            student.studentId,

          full_name:
            student.fullName,

          email:
            student.email,

          phone:
            "9000000001",

          department_id:
            department.id,

          semester: 7,

          enrollment_year: 2023,

          status: "active",

          created_at: now,

          updated_at: now,
        },
      },
      {
        upsert: true,
      }
    );

    console.log(
      "✅ Demo student created."
    );

  } else {

    await users.updateOne(
      {
        email: student.email,
      },
      {
        $set: {
          password_hash:
            passwordHash,

          roles: ["student"],

          status: "active",

          "profile.full_name":
            student.fullName,

          updated_at: now,
        },
      }
    );

    console.log(
      "✅ Demo student password/account updated."
    );
  }

  /* =========================================
     FACULTY
  ========================================= */

  const facultyAccount =
    DEMO_ACCOUNTS.faculty;

  let facultyUser =
    await users.findOne({
      email:
        facultyAccount.email,
    });

  if (!facultyUser) {

    const userId =
      randomUUID();

    await users.insertOne({
      id: userId,

      email:
        facultyAccount.email,

      password_hash:
        passwordHash,

      roles: ["faculty"],

      status: "active",

      profile: {
        full_name:
          facultyAccount.fullName,

        avatar_url: null,

        phone: "9000000002",
      },

      created_at: now,

      updated_at: now,
    });

    await faculty.updateOne(
      {
        faculty_id:
          facultyAccount.facultyId,
      },
      {
        $setOnInsert: {
          id: userId,

          faculty_id:
            facultyAccount.facultyId,

          full_name:
            facultyAccount.fullName,

          email:
            facultyAccount.email,

          phone:
            "9000000002",

          department_id:
            department.id,

          designation:
            "Demo Faculty",

          status: "active",

          created_at: now,

          updated_at: now,
        },
      },
      {
        upsert: true,
      }
    );

    console.log(
      "✅ Demo faculty created."
    );

  } else {

    await users.updateOne(
      {
        email:
          facultyAccount.email,
      },
      {
        $set: {
          password_hash:
            passwordHash,

          roles: ["faculty"],

          status: "active",

          "profile.full_name":
            facultyAccount.fullName,

          updated_at: now,
        },
      }
    );

    console.log(
      "✅ Demo faculty password/account updated."
    );
  }

  /* =========================================
     ADMIN
  ========================================= */

  const admin =
    DEMO_ACCOUNTS.admin;

  const existingAdmin =
    await users.findOne({
      email:
        admin.email,
    });

  if (!existingAdmin) {

    await users.insertOne({
      id:
        randomUUID(),

      email:
        admin.email,

      password_hash:
        passwordHash,

      roles: ["admin"],

      status: "active",

      profile: {
        full_name:
          admin.fullName,

        avatar_url: null,

        phone: "9000000003",
      },

      created_at: now,

      updated_at: now,
    });

    console.log(
      "✅ Demo admin created."
    );

  } else {

    await users.updateOne(
      {
        email:
          admin.email,
      },
      {
        $set: {
          password_hash:
            passwordHash,

          roles: ["admin"],

          status: "active",

          "profile.full_name":
            admin.fullName,

          updated_at: now,
        },
      }
    );

    console.log(
      "✅ Demo admin password/account updated."
    );
  }

  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    "CampusIQ Demo Accounts Ready"
  );
  console.log(
    "========================================"
  );
  console.log(
    `Student : ${DEMO_ACCOUNTS.student.email}`
  );
  console.log(
    `Faculty : ${DEMO_ACCOUNTS.faculty.email}`
  );
  console.log(
    `Admin   : ${DEMO_ACCOUNTS.admin.email}`
  );
  console.log(
    `Password: ${DEMO_PASSWORD}`
  );
  console.log(
    "========================================"
  );
}

seedDemoAccounts()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "❌ Failed to seed demo accounts."
    );
    console.error(error);
    process.exit(1);
  });