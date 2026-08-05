import { getDb } from "../database/mongodb.mjs";
import { verifyToken } from "../utils/auth.mjs";

export async function getAuthUser(req) {
  const database = await getDb();

  const header = req.headers.authorization || "";

  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  const payload = token
    ? verifyToken(token)
    : null;

  if (!payload?.sub) {
    return null;
  }

  return database
    .collection("users")
    .findOne({
      id: payload.sub,
    });
}