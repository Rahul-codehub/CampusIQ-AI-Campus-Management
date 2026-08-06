import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";

import { MONGODB_URI, DB_NAME } from "../config/env.mjs";

let client = null;
let db = null;
let initialized = false;

export async function getDb() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add it to your .env file."
    );
  }

  if (!client) {
    client = new MongoClient(MONGODB_URI);
    try {
  await client.connect();
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.error("❌ Mongo Error");
  console.error(err);
  throw err;
}
  }

  if (!db) {
    db = client.db(DB_NAME);
  }

  if (!initialized) {
    console.log("client:", !!client);
    console.log("db:", !!db);
    await initializeDatabase();
    initialized = true;
  }

  return db;
}

async function initializeDatabase() {
  await Promise.all([
    db.collection("users").createIndex(
      { email: 1 },
      { unique: true }
    ),

    db.collection("departments").createIndex(
      { code: 1 },
      { unique: true }
    ),

    db.collection("students").createIndex(
      { student_id: 1 },
      { unique: true }
    ),

    db.collection("faculty").createIndex(
      { faculty_id: 1 },
      { unique: true }
    ),

    db.collection("courses").createIndex(
      { course_code: 1 },
      { unique: true }
    ),
  ]);

  const departmentCount =
    await db.collection("departments").countDocuments();

  if (departmentCount === 0) {
    const now = new Date().toISOString();

    await db.collection("departments").insertMany([
      {
        id: randomUUID(),
        name: "Computer Science",
        code: "CSE",
        head_name: null,
        created_at: now,
      },
      {
        id: randomUUID(),
        name: "Electronics",
        code: "ECE",
        head_name: null,
        created_at: now,
      },
      {
        id: randomUUID(),
        name: "Mechanical",
        code: "ME",
        head_name: null,
        created_at: now,
      },
      {
        id: randomUUID(),
        name: "Civil",
        code: "CE",
        head_name: null,
        created_at: now,
      },
    ]);
  }
}