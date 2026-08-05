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

import {
  serialize,
  sortFromSearch,
  filtersFromSearch,
  withCollectionDefaults,
} from "../utils/helpers.mjs";

import {
  hasPermission,
  scopedFilters,
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

    const payload =
      await parseBody(req);

    const doc =
      withCollectionDefaults(
        collection,
        payload,
        publicUser(user)
      );

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