import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" }));

// Initialize the server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chat Scenario Generator endpoint
app.post("/api/generate-scenario", async (req, res) => {
  try {
    const { prompt, template = "imessage" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Please enter a scenario description or idea!" });
    }

    // Build standard system prompt that steers Gemini to write extremely funny, witty, and contextual messages
    const systemPrompt = `You are a world-class comedic scriptwriter and online meme genius. Your task is to generate a highly realistic, extremely funny, and contextually matching text message conversation based on a user's prompt. Depending on the chat template type ('imessage', 'whatsapp', 'instagram' or 'messenger'), make sure the texts use authentic messaging style (lowercase, abbreviations, emojis, internet slang, punctuation styles).
The conversation should have between 4 to 8 messages.
Occasionally, you can add structural system separators (type 'system') representing timestamps or status divider bands.
If appropriate, you can add an image message (type 'image') with:
- a funny image URL. Use one of these high-quality direct Unsplash URLs:
  - Private Jet: https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&auto=format&fit=crop&q=80
  - Broken Screen: https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80
  - Stack of Cash: https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80
  - Confused Dog: https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80
  - Cozy Coffee Spot: https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80
  - Locked Out Key: https://images.unsplash.com/photo-1512418490979-92798cec1380?w=600&auto=format&fit=crop&q=80
  - Pizza Box: https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80
Ensure the generated scenario has cohesive characters, back-and-forth tension, and a funny payoff or climax!`;

    // Generate content with structured JSON schema
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a funny chat dialogue for a platform of type "${template}" matching this story idea: "${prompt}"`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["contactName", "contactStatusText", "theme", "messages"],
          properties: {
            contactName: {
              type: Type.STRING,
              description: "The name of the prank target or chatter (e.g. Delusional Boss, Tanner (Marketplace))"
            },
            contactStatusText: {
              type: Type.STRING,
              description: "The header status line (e.g. online, typing..., active 5m ago)"
            },
            theme: {
              type: Type.STRING,
              enum: ["light", "dark"],
              description: "The visual style mood best suited for this chat preset (light or dark)"
            },
            messages: {
              type: Type.ARRAY,
              description: "The list of conversation text bubbles in order",
              items: {
                type: Type.OBJECT,
                required: ["sender", "type", "text"],
                properties: {
                  sender: {
                    type: Type.STRING,
                    enum: ["me", "them"],
                    description: "me for outgoing message bubble (right side), them for incoming bubble (left side)"
                  },
                  type: {
                    type: Type.STRING,
                    enum: ["text", "image", "system"],
                    description: "text for normal messages, image for photo attachments, system for dates/spacers"
                  },
                  text: {
                    type: Type.STRING,
                    description: "The body of the message. For image type, this should be the caption text."
                  },
                  time: {
                    type: Type.STRING,
                    description: "Small timestamp indicator (e.g. '12:05 PM', 'Read', 'Yesterday')"
                  },
                  status: {
                    type: Type.STRING,
                    enum: ["none", "sent", "delivered", "read"],
                    description: "Custom checkmark status of messaging delivery"
                  },
                  imageUrl: {
                    type: Type.STRING,
                    description: "Unsplash URL if type is image (leave empty otherwise)"
                  }
                }
              }
            }
          }
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Empty response received from AI model.");
    }

    const scenarioData = JSON.parse(outputText);
    return res.json(scenarioData);
  } catch (error: any) {
    console.error("AI Generation error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong during scenario generation." });
  }
});

// Vite middleware setup
async function setupServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully active on port ${PORT}`);
  });
}

setupServer();
