import { getDb } from "../database/mongodb.mjs";

export async function getFacultyContext() {
  const db = await getDb();

  const faculty = await db
    .collection("faculty")
    .find({})
    .toArray();

  const departments = await db
    .collection("departments")
    .find({})
    .toArray();

  const departmentMap = new Map(
    departments.map((department) => [
      department.id,
      department.name,
    ])
  );

  console.log(
    "Faculty Found:",
    faculty.length
  );

  if (faculty.length === 0) {
    return `
No faculty members are currently available
in the CampusIQ database.
`;
  }

  return `
Current Campus Faculty

${faculty
    .map(
      (member, index) => `
${index + 1}.

Name : ${member.full_name}

Faculty ID : ${member.faculty_id}

Email : ${member.email}

Department : ${
        departmentMap.get(member.department_id) ??
        "Unknown"
      }

Designation : ${member.designation}

Status : ${member.status}
`
    )
    .join("\n")}
`;
}