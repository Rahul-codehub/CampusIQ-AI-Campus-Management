import { getDb } from "../database/mongodb.mjs";

import crypto from "node:crypto";

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

import {
  serialize,
  sortFromSearch,
  filtersFromSearch,
  withCollectionDefaults,
} from "../utils/helpers.mjs";

import {
  hasPermission,
  scopedFilters,
  canUpdateComplaint,
} from "../utils/permissions.mjs";

const allowedCollections = new Set([
  "users",
  "registration_requests",
  "departments",
  "students",
  "faculty",
  "courses",
  "attendance",
  "complaints",
  "notices",
  "events",
  "chatbot_logs",
]);

export async function handleCollection(
  req,
  res,
  pathParts,
  url
) {
  const database = await getDb();

  const collection = pathParts[2];

  if (!allowedCollections.has(collection)) {
    return sendError(
      res,
      404,
      "Collection not found."
    );
  }

  const user = await getAuthUser(req);

  console.log(
    "Authenticated user:",
    user
  );

  const isPublicDepartments =
    req.method === "GET" &&
    collection === "departments";

  if (
    !user &&
    !isPublicDepartments
  ) {
    return sendError(
      res,
      401,
      "Authentication required."
    );
  }

  /* =========================================
     GET COUNT
  ========================================= */

  if (
    req.method === "GET" &&
    pathParts[3] === "count"
  ) {
    if (
      !isPublicDepartments &&
      !hasPermission(
        user,
        collection,
        "read"
      )
    ) {
      return sendError(
        res,
        403,
        "You do not have access to this data."
      );
    }

    const filters =
      isPublicDepartments
        ? filtersFromSearch(
            url.searchParams
          )
        : scopedFilters(
            collection,
            filtersFromSearch(
              url.searchParams
            ),
            user
          );

    const count =
      await database
        .collection(collection)
        .countDocuments(filters);

    return send(res, 200, {
      count,
    });
  }

  /* =========================================
     GET LIST
  ========================================= */
  if (req.method === "GET") {
    if (
      !isPublicDepartments &&
      !hasPermission(
        user,
        collection,
        "read"
      )
    ) {
      return sendError(
        res,
        403,
        "You do not have access to this data."
      );
    }

    const filters =
      isPublicDepartments
        ? filtersFromSearch(
            url.searchParams
          )
        : scopedFilters(
            collection,
            filtersFromSearch(
              url.searchParams
            ),
            user
          );

    const limit = Number(
      url.searchParams.get("limit") || 0
    );

    let cursor = database
      .collection(collection)
      .find(filters)
      .sort(
        sortFromSearch(
          url.searchParams
        )
      );

    if (limit > 0) {
      cursor = cursor.limit(limit);
    }

    const docs =
      await cursor.toArray();

    return send(res, 200, {
      data: docs.map(serialize),
    });
  }

  /* =========================================
   CREATE
========================================= */

if (req.method === "POST") {
  if (
    !hasPermission(
      user,
      collection,
      "create"
    )
  ) {
    return sendError(
      res,
      403,
      "You do not have permission to create this record."
    );
  }

  const payload = await parseBody(req);

  let doc;

  /* =========================================
     COMPLAINT CREATION
  ========================================= */

  if (collection === "complaints") {
    const roles = user?.roles || ["student"];

    /*
     * Determine the creator role from the
     * authenticated user.
     */
    let creatorRole = "student";

    if (roles.includes("admin")) {
      creatorRole = "admin";
    } else if (roles.includes("faculty")) {
      creatorRole = "faculty";
    }

    /*
     * Never trust these fields from the frontend.
     */
    const {
      user_id,
      creator_role,
      status,
      resolved_by,
      resolved_at,
      ...complaintPayload
    } = payload;

    doc = {
      ...complaintPayload,

      id: crypto.randomUUID(),

      user_id: user.id,

      creator_role: creatorRole,

      status: "pending",

      response: null,

      resolved_by: null,

      resolved_at: null,

      created_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),
    };
  } else {
    doc = withCollectionDefaults(
      collection,
      payload,
      publicUser(user)
    );
  }

  try {
    await database
      .collection(collection)
      .insertOne(doc);
  } catch (error) {
    if (error.code === 11000) {
      return sendError(
        res,
        409,
        "A record with this unique value already exists."
      );
    }

    throw error;
  }

  return send(res, 201, {
    data: serialize(doc),
  });
}



/* =========================================
   UPDATE
========================================= */

if (
  req.method === "PATCH" &&
  pathParts[3]
) {
  const complaintId = pathParts[3];

  /* =========================================
     COMPLAINT UPDATE
  ========================================= */

  if (collection === "complaints") {
    const complaint =
      await database
        .collection("complaints")
        .findOne({
          id: complaintId,
        });

    if (!complaint) {
      return sendError(
        res,
        404,
        "Complaint not found."
      );
    }

    if (
      !canUpdateComplaint(
        user,
        complaint
      )
    ) {
      return sendError(
        res,
        403,
        "You do not have permission to update this complaint."
      );
    }

    const payload =
      await parseBody(req);

    /*
     * Never allow the frontend to modify
     * ownership or resolution identity.
     */
    const {
      id,
      user_id,
      creator_role,
      created_at,
      resolved_by,
      resolved_at,
      ...allowedPayload
    } = payload;

    const updateData = {
      ...allowedPayload,
      updated_at:
        new Date().toISOString(),
    };

    const roles =
      user?.roles || ["student"];

    /*
     * Faculty/Admin resolving a complaint
     */
    if (
      roles.includes("admin") ||
      roles.includes("faculty")
    ) {
      if (
        allowedPayload.status ===
        "resolved"
      ) {
        updateData.resolved_by =
          user.id;

        updateData.resolved_at =
          new Date().toISOString();
      }

      /*
       * If a resolved complaint is reopened,
       * clear the resolution metadata.
       */
      if (
        allowedPayload.status &&
        allowedPayload.status !==
          "resolved"
      ) {
        updateData.resolved_by =
          null;

        updateData.resolved_at =
          null;
      }
    }

    const result =
      await database
        .collection("complaints")
        .updateOne(
          {
            id: complaintId,
          },
          {
            $set: updateData,
          }
        );

    if (
      result.matchedCount === 0
    ) {
      return sendError(
        res,
        404,
        "Complaint not found."
      );
    }

    const updatedComplaint =
      await database
        .collection("complaints")
        .findOne({
          id: complaintId,
        });

    return send(res, 200, {
      data: serialize(
        updatedComplaint
      ),
    });
  }

  /* =========================================
     OTHER COLLECTIONS
  ========================================= */

  if (
    !hasPermission(
      user,
      collection,
      "update"
    )
  ) {
    return sendError(
      res,
      403,
      "You do not have permission to update this record."
    );
  }

  const payload =
    await parseBody(req);

  const updated_at =
    new Date().toISOString();

  const result =
    await database
      .collection(collection)
      .updateOne(
        {
          id: pathParts[3],
        },
        {
          $set: {
            ...payload,
            updated_at,
          },
        }
      );

  if (
    result.matchedCount === 0
  ) {
    return sendError(
      res,
      404,
      "Record not found."
    );
  }

  const doc =
    await database
      .collection(collection)
      .findOne({
        id: pathParts[3],
      });

  return send(res, 200, {
    data: serialize(doc),
  });
}
  
 /* =========================================
   DELETE
========================================= */

if (
  req.method === "DELETE" &&
  pathParts[3]
) {
  if (
    !hasPermission(
      user,
      collection,
      "delete"
    )
  ) {
    return sendError(
      res,
      403,
      "You do not have permission to delete this record."
    );
  }

  /* =========================================
     COMPLAINT-SPECIFIC DELETE RULES
  ========================================= */

  if (collection === "complaints") {
    const complaint =
      await database
        .collection("complaints")
        .findOne({
          id: pathParts[3],
        });

    if (!complaint) {
      return sendError(
        res,
        404,
        "Complaint not found."
      );
    }

    const roles =
      user?.roles || ["student"];

    /* Admin can delete any complaint */
    if (roles.includes("admin")) {
      // allowed
    }

    /* Faculty can delete only their own
       faculty-created complaints */
    else if (roles.includes("faculty")) {
      if (
        complaint.creator_role !==
          "faculty" ||
        complaint.user_id !== user.id
      ) {
        return sendError(
          res,
          403,
          "Faculty can only delete their own complaints."
        );
      }
    }

    /* Students cannot delete */
    else {
      return sendError(
        res,
        403,
        "Students cannot delete complaints."
      );
    }
  }

  const result =
    await database
      .collection(collection)
      .deleteOne({
        id: pathParts[3],
      });

  if (
    result.deletedCount === 0
  ) {
    return sendError(
      res,
      404,
      "Record not found."
    );
  }

  return send(res, 200, {
    success: true,
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
}