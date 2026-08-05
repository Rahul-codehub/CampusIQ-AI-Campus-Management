import { getDb } from "../database/mongodb.mjs";

import {
  send,
  sendError,
  parseBody,
} from "../utils/response.mjs";

import {
  publicUser,
} from "../utils/auth.mjs";

import {
  getAuthUser,
} from "../middleware/authMiddleware.mjs";

export async function handleProfile(req, res) {
  try {
    const database = await getDb();

    const user = await getAuthUser(req);

    if (!user) {
      return sendError(
        res,
        401,
        "Authentication required."
      );
    }

    /* =========================================
       GET PROFILE
    ========================================= */

    if (req.method === "GET") {
      return send(res, 200, {
        user: publicUser(user),
      });
    }

    /* =========================================
       UPDATE PROFILE
    ========================================= */

    if (req.method === "PATCH") {
      const {
        full_name,
        phone,
        avatar_url,
      } = await parseBody(req);

      console.log("PATCH BODY:", {
  full_name,
  phone,
});

      const profile = {
        ...user.profile,

        full_name:
          full_name ??
          user.profile?.full_name ??
          "",

        phone:
          phone ??
          user.profile?.phone ??
          null,

        avatar_url:
          avatar_url ??
          user.profile?.avatar_url ??
          null,
      };

     const result =
  await database
    .collection("users")
    .updateOne(
      {
        id: user.id,
      },
      {
        $set: {
          profile,
          updated_at:
            new Date().toISOString(),
        },
      }
    );

console.log(
  "UPDATE RESULT:",
  result
);

      const updatedUser =
        await database
          .collection("users")
          .findOne({
            id: user.id,
          });

      return send(res, 200, {
        success: true,
        message:
          "Profile updated successfully.",
        user: publicUser(updatedUser),
      });
    }

    /* =========================================
       METHOD NOT ALLOWED
    ========================================= */

    return sendError(
      res,
      405,
      "Method not allowed."
    );
  } catch (error) {
    console.error(
      "Profile Route Error:",
      error
    );

    return sendError(
      res,
      500,
      "Internal server error."
    );
  }
}