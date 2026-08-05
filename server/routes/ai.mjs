import {
  send,
  sendError,
  parseBody,
} from "../utils/response.mjs";

import { detectIntent } from "../utils/aiIntent.mjs";
import { getStudentContext } from "../services/studentAITool.mjs";
import { getFacultyContext } from "../services/facultyAITool.mjs";
import { getAttendanceContext } from "../services/attendanceAITool.mjs";

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

export async function handleAI(req, res) {
  console.log("\n========== AI REQUEST ==========");

  if (req.method !== "POST") {
    return sendError(
      res,
      405,
      "Method not allowed."
    );
  }

  try {
    const { message } =
      await parseBody(req);

    if (!message?.trim()) {
      return sendError(
        res,
        400,
        "Message is required."
      );
    }

    console.log("User:", message);

    const intent =
      detectIntent(message);

    console.log("Intent:", intent);

    let context = "";

    switch (intent) {
      case "students": {
        context =
          await getStudentContext();
        console.log("\n===== STUDENT CONTEXT =====");
        console.log(context);
        console.log("===========================\n");

        break;
      }
      case "faculty": {
        context =
          await getFacultyContext();

        console.log(
          "\n===== FACULTY CONTEXT ====="
        );

        console.log(context);

        console.log(
          "===========================\n"
        );

        break;
      }

     case "attendance": {
    context = await getAttendanceContext();

    console.log("\n===== ATTENDANCE CONTEXT =====");
    console.log(context);
    console.log("==============================\n");

    break;
}

      case "notice":
        context =
          "Notice tool coming soon.";
        break;

      case "event":
        context =
          "Event tool coming soon.";
        break;

      default:
        context = "";
    }

    const response = await fetch(
      GROQ_API_URL,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",

          temperature: 0.4,

          max_tokens: 1024,

          messages: [
            {
              role: "system",

              content: `
You are CampusIQ AI.

CampusIQ is an AI-powered Campus Management System.

You assist students,
faculty and administrators.

Always answer professionally.

If campus data is provided below,
use ONLY that data.

If no campus data is available,
answer normally.

Campus Data:

${context}
`,
            },

            {
              role: "user",

              content: message,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error =
        await response.text();

      console.log(
        "\n======= GROQ ERROR ======="
      );

      console.log(
        "Status:",
        response.status
      );

      console.log(error);

      console.log(
        "=========================="
      );

      return sendError(
        res,
        response.status,
        "Groq API request failed."
      );
    }

    const data =
      await response.json();

    const reply =
      data.choices?.[0]?.message
        ?.content ??
      "No response generated.";

    console.log(
      "\n======= GROQ SUCCESS ======="
    );

    console.log(reply);

    console.log(
      "============================"
    );

    return send(res, 200, {
      success: true,
      reply,
    });

  } catch (error) {
    console.error(
      "\n======= SERVER ERROR ======="
    );

    console.error(error);

    console.error(
      "============================"
    );

    return sendError(
      res,
      500,
      "CampusIQ AI is unavailable."
    );
  }
}