export function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    text.includes("student") ||
    text.includes("students")
  ) {
    return "students";
  }

if (
  text.includes("faculty") ||
  text.includes("teacher") ||
  text.includes("professor") ||
  text.includes("lecturer")
) {
  return "faculty";
}

  if (
  text.includes("attendance") ||
  text.includes("absent") ||
  text.includes("present") ||
  text.includes("below 75")
) {
  return "attendance";
}
  if (
    text.includes("notice")
  ) {
    return "notice";
  }

  if (
    text.includes("event")
  ) {
    return "event";
  }

  return "general";
}