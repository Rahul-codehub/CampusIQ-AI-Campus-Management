export function send(res, status, body = null) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      process.env.CLIENT_ORIGIN || "*",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Methods":
      "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  });

  res.end(
    body === null
      ? ""
      : JSON.stringify(body)
  );
}

export function sendError(
  res,
  status,
  message
) {
  send(res, status, {
    error: message,
  });
}

export async function parseBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(
    Buffer.concat(chunks).toString("utf8")
  );
}