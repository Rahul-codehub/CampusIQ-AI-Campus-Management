import { randomUUID } from "node:crypto";

export function serialize(doc) {
  if (!doc) return null;

  const {
    _id,
    password_hash,
    ...rest
  } = doc;

  return rest;
}

export function sortFromSearch(searchParams) {
  const sortParam = searchParams.get("sort");

  if (!sortParam) {
    return {};
  }

  return Object.fromEntries(
    sortParam
      .split(",")
      .filter(Boolean)
      .map((part) => {
        const [field, direction] = part.split(":");

        return [
          field,
          direction === "asc" ? 1 : -1,
        ];
      })
  );
}

export function filtersFromSearch(searchParams) {
  const filters = {};

  for (const [key, value] of searchParams.entries()) {
    if (!key.startsWith("filter_")) {
      continue;
    }

    const field = key.slice("filter_".length);

    if (value.includes(",")) {
      filters[field] = {
        $in: value.split(","),
      };
    } else {
      filters[field] = value;
    }
  }

  return filters;
}

export function withCollectionDefaults(
  collection,
  payload,
  user
) {
  const now = new Date().toISOString();

  const doc = {
    id: randomUUID(),
    created_at: now,
    updated_at: now,
    ...payload,
  };

  switch (collection) {
    case "students":
      doc.mobile ??= null;
      doc.department_id ??= null;
      doc.semester ??= 1;
      doc.enrollment_year ??=
        new Date().getFullYear();
      doc.status ??= "active";
      break;

    case "faculty":
      doc.phone ??= null;
      doc.department_id ??= null;
      doc.designation ??=
        "Assistant Professor";
      doc.specialization ??= null;
      doc.status ??= "active";
      break;

    case "courses":
      doc.department_id ??= null;
      doc.faculty_id ??= null;
      doc.credits ??= 3;
      doc.max_students ??= 60;
      doc.status ??= "active";
      break;

    case "complaints":
      doc.user_id = user.id;
      doc.status ??= "pending";
      doc.priority ??= "medium";
      doc.response ??= null;
      break;

    case "notices":
      doc.posted_by = user.id;
      doc.is_pinned ??= false;
      doc.expires_at ??= null;
      break;

    case "events":
      doc.created_by = user.id;
      doc.description ??= null;
      doc.location ??= null;
      doc.organizer ??= null;
      doc.max_participants ??= null;
      break;

    case "chatbot_logs":
      doc.user_id = user.id;
      break;

    case "attendance":
      doc.status ??= "present";
      break;
  }

  return doc;
}