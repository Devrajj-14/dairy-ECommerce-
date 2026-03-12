import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/advisor-prompt";
import type { AdvisorRequest, ProductRecommendation } from "@/lib/types/advisor";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Parses the RECOMMENDATION_START...RECOMMENDATION_END block
 * from the model response text.
 */
function parseRecommendation(text: string): {
  cleanText: string;
  recommendation?: ProductRecommendation;
} {
  const startMarker = "RECOMMENDATION_START";
  const endMarker = "RECOMMENDATION_END";

  const startIdx = text.indexOf(startMarker);
  const endIdx = text.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    return { cleanText: text };
  }

  const block = text.slice(startIdx + startMarker.length, endIdx).trim();
  const before = text.slice(0, startIdx).trim();
  const after = text.slice(endIdx + endMarker.length).trim();
  const cleanText = [before, after].filter(Boolean).join("\n\n");

  const lines = block.split("\n");
  const get = (key: string) => {
    const line = lines.find((l) => l.startsWith(`${key}:`));
    return line ? line.slice(key.length + 1).trim() : "";
  };

  const alternativesRaw = get("ALTERNATIVES");
  const alternatives = alternativesRaw
    ? alternativesRaw
        .split(";")
        .map((a) => {
          const parts = a.trim().split("|");
          return {
            name: parts[0]?.trim() || "",
            price: parts[1]?.trim() || "",
            reason: parts[2]?.trim() || "",
          };
        })
        .filter((a) => a.name)
    : undefined;

  const addOnsRaw = get("ADD_ONS");
  const addOns = addOnsRaw
    ? addOnsRaw
        .split(";")
        .map((a) => a.trim())
        .filter(Boolean)
    : undefined;

  const recommendation: ProductRecommendation = {
    product: get("PRODUCT"),
    price: get("PRICE"),
    fatLevel: get("FAT_LEVEL"),
    reason: get("REASON"),
    suggestedQuantity: get("QUANTITY"),
    suggestedSchedule: get("SCHEDULE"),
    ...(alternatives && alternatives.length > 0 && { alternatives }),
    ...(addOns && addOns.length > 0 && { addOns }),
  };

  return { cleanText, recommendation };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured on the server." },
      { status: 500 }
    );
  }

  let body: AdvisorRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages array required" }, { status: 400 });
  }

  // Build alternating contents array for Gemini (must alternate user/model, must start with user).
  // We skip any leading assistant messages (the welcome message shown in UI).
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];

  for (const msg of body.messages) {
    const role = msg.role === "user" ? "user" : "model";

    // Skip leading model messages — Gemini must start with "user"
    if (contents.length === 0 && role === "model") continue;

    // Merge consecutive same-role messages to maintain strict alternation
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += "\n" + msg.content;
    } else {
      contents.push({ role, parts: [{ text: msg.content }] });
    }
  }

  if (contents.length === 0) {
    return NextResponse.json({ error: "No user message provided." }, { status: 400 });
  }

  try {
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // systemInstruction is the correct Gemini way to provide system context
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", errText);

      // Handle rate limiting specifically with actionable message
      if (geminiRes.status === 429) {
        return NextResponse.json(
          {
            error:
              "The AI advisor is taking a short break due to high demand. Please wait 15–30 seconds and try again.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!rawText) {
      console.error("Empty Gemini response:", JSON.stringify(data));
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 502 }
      );
    }

    const { cleanText, recommendation } = parseRecommendation(rawText);

    return NextResponse.json({
      message: cleanText,
      isRecommendation: !!recommendation,
      recommendation: recommendation ?? null,
    });
  } catch (err) {
    console.error("Advisor route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
