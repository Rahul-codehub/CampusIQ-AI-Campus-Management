import { send } from "../utils/response.mjs";
import { getAnalytics } from "../services/analyticsService.mjs";

export async function handleAnalytics(
  req,
  res
) {
  if (req.method !== "GET") {
    return send(res, 405, {
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const analytics =
      await getAnalytics();

    return send(res, 200, {
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error(error);

    return send(res, 500, {
      success: false,
      message:
        "Unable to fetch analytics.",
    });
  }
}