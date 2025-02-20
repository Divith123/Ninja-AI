"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage } from "ai";
import { rateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate environment variable
const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("GOOGLE_GEMINI_API_KEY environment variable is not set.");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(geminiApiKey);

export async function continueConversation(
  messages: CoreMessage[],
  model: string,
) {
  const ip = headers().get("x-forwarded-for") ?? "unknown";

  // Enforce rate limiting
  if (rateLimit(ip)) {
    console.error(`Rate limit exceeded for IP: ${ip}`);
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  try {
    // Initialize the Gemini model
    const geminiModel = genAI.getGenerativeModel({ model });

    // Convert CoreMessage[] to Gemini's expected format
    const chatHistory = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start a chat session with history
    const chat = geminiModel.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.8,
        topP: 0.7,
        maxOutputTokens: 1024,
      },
    });

    // Get the latest user message
    const lastUserMessage = messages[messages.length - 1].content;

    // Stream the response from Gemini
    const result = await chat.sendMessageStream(lastUserMessage);

    // Create a streamable value for the response
    const stream = createStreamableValue("");

    // Stream the response chunks
    (async () => {
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        stream.update(chunkText);
      }
      stream.done();
    })();

    // Return the stream value
    return stream.value;
  } catch (error) {
    console.error("Error in continueConversation:", error);

    // Handle API errors gracefully
    if (error instanceof Error) {
      throw new Error(`Failed to continue conversation: ${error.message}`);
    } else {
      throw new Error("Failed to continue conversation due to an unknown error.");
    }
  }
}