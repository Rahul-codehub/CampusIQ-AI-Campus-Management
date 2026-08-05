import { getDb } from "../database/mongodb.mjs";

export async function getAnalytics() {
  const db = await getDb();

  const [
    students,
    faculty,
    courses,
    departments,
    notices,
    events,
    complaints,
    attendance,
    studentList,
    departmentList,
  ] = await Promise.all([
    db.collection("students").countDocuments(),
    db.collection("faculty").countDocuments(),
    db.collection("courses").countDocuments(),
    db.collection("departments").countDocuments(),
    db.collection("notices").countDocuments(),
    db.collection("events").countDocuments(),
    db.collection("complaints").countDocuments(),
    db.collection("attendance").find({}).toArray(),
    db.collection("students").find({}).toArray(),
    db.collection("departments").find({}).toArray(),
  ]);

  /* =========================================
     ATTENDANCE ANALYTICS
  ========================================= */

  let present = 0;

  attendance.forEach((record) => {
    if (
      record.status?.toLowerCase() === "present"
    ) {
      present++;
    }
  });

  const attendancePercentage =
    attendance.length === 0
      ? 0
      : Number(
          (
            (present / attendance.length) *
            100
          ).toFixed(2)
        );

  const attendanceChart = [
    {
      name: "Present",
      value: present,
    },
    {
      name: "Absent",
      value:
        attendance.length - present,
    },
  ];

  /* =========================================
     COMPLAINT ANALYTICS
  ========================================= */

  const pendingComplaints =
    await db.collection("complaints").countDocuments({
      status: "pending",
    });

  const resolvedComplaints =
    await db.collection("complaints").countDocuments({
      status: "resolved",
    });

  const complaintChart = [
    {
      name: "Pending",
      value: pendingComplaints,
    },
    {
      name: "Resolved",
      value: resolvedComplaints,
    },
  ];

  /* =========================================
     STUDENTS BY DEPARTMENT
  ========================================= */

  const departmentMap = new Map(
    departmentList.map((department) => [
      department.id,
      department.name,
    ])
  );

  const departmentCounts = {};

  studentList.forEach((student) => {
    const department =
      departmentMap.get(
        student.department_id
      ) || "Unknown";

    departmentCounts[department] =
      (departmentCounts[department] || 0) + 1;
  });

  const studentDepartmentChart =
    Object.entries(
      departmentCounts
    ).map(([name, value]) => ({
      name,
      value,
    }));

  /* =========================================
     RETURN
  ========================================= */

  return {
    overview: {
      students,
      faculty,
      courses,
      departments,
      notices,
      events,
      complaints,
      attendancePercentage,
    },

    complaints: {
      pending: pendingComplaints,
      resolved: resolvedComplaints,
    },

    charts: {
      attendance: attendanceChart,

      studentDepartments:
        studentDepartmentChart,

      complaints:
        complaintChart,
    },
  };
}