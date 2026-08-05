const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

const API_KEY =
  import.meta.env.VITE_GROQ_API_KEY;

export async function askAI(
  prompt: string
): Promise<string> {
  try {
    const response = await fetch(
      GROQ_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${API_KEY}`,
        },

        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",

              content: `
You are CampusIQ AI.

You are an intelligent assistant for a Campus Management System.

Answer professionally.

Be concise.

If the question is outside CampusIQ,
answer normally.
`,
            },

            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.4,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to contact AI."
      );
    }

    const data =
      await response.json();

    return (
      data.choices?.[0]?.message
        ?.content ??
      "No response."
    );
  } catch (error) {
    console.error(error);

    return "CampusIQ AI is currently unavailable.";
  }
}