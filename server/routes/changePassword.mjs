import { getDb } from "../database/mongodb.mjs";

import {
  send,
  sendError,
  parseBody,
} from "../utils/response.mjs";

import {
  verifyPassword,
  hashPassword,
} from "../utils/auth.mjs";

import {
  getAuthUser,
} from "../middleware/authMiddleware.mjs";

export async function handleChangePassword(
  req,
  res
) {
  if (req.method !== "PATCH") {
    return sendError(
      res,
      405,
      "Method not allowed."
    );
  }

  const user = await getAuthUser(req);

  if (!user) {
    return sendError(
      res,
      401,
      "Authentication required."
    );
  }

  const {
    currentPassword,
    newPassword,
  } = await parseBody(req);

  if (
    !currentPassword ||
    !newPassword
  ) {
    return sendError(
      res,
      400,
      "All fields are required."
    );
  }

  const valid =
    await verifyPassword(
      currentPassword,
      user.password_hash
    );

  if (!valid) {
    return sendError(
      res,
      400,
      "Current password is incorrect."
    );
  }

  const newHash =
    await hashPassword(newPassword);

  const db = await getDb();

  await db
    .collection("users")
    .updateOne(
      {
        id: user.id,
      },
      {
        $set: {
          password_hash: newHash,
          updated_at:
            new Date().toISOString(),
        },
      }
    );

  return send(res, 200, {
    success: true,
    message:
      "Password changed successfully.",
  });
}