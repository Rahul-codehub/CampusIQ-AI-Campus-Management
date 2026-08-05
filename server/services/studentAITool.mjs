import { getDb } from "../database/mongodb.mjs";

export async function getStudentContext() {
  const db = await getDb();

  // Fetch students
  const students = await db
    .collection("students")
    .find({})
    .toArray();

  // Fetch departments
  const departments = await db
    .collection("departments")
    .find({})
    .toArray();

  // Create Department ID -> Name map
  const departmentMap = new Map(
    departments.map((department) => [
      department.id,
      department.name,
    ])
  );

  console.log(
    "Students Found:",
    students.length
  );

  if (students.length === 0) {
    return `
No students are currently available
in the CampusIQ database.
`;
  }

  return `
Current Campus Students

${students
  .map(
    (student, index) => `
${index + 1}.

Name : ${student.full_name}

Student ID : ${student.student_id}

Department : ${
  departmentMap.get(student.department_id) ??
  "Unknown"
}

Semester : ${student.semester}

Status : ${student.status}
`
  )
  .join("\n")}
`;
}