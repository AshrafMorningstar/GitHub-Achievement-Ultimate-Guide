import { GoogleGenAI } from "@google/genai";
import { BADGES } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      throw new Error("API Key is missing. Please set process.env.API_KEY.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are the "GitHub Badge Expert AI", a specialized assistant for a web application called "GitHub Badges: The Ultimate Visual Guide".
Your goal is to help users understand, earn, and strategize their GitHub profile badges.

Here is the current database of badges:
${JSON.stringify(BADGES, null, 2)}

Knowledge Base:
- "Highlights" are status badges like PRO, Sponsor, etc. "Achievements" are activity-based like Pull Shark, YOLO.
- Tiers usually go Base -> Bronze -> Silver -> Gold.
- Quickdraw is notoriously tricky; you must close within 5 minutes of *opening* the issue/PR.
- YOLO means merging without review (requires admin rights or a repo without branch protection).
- Mars 2020 and Arctic Code Vault are historical and cannot be earned anymore.

When answering:
1. Be encouraging and use emojis appropriate for GitHub (🚀, ✨, 💻).
2. If a user asks how to earn a specific badge, give a step-by-step "recipe".
3. If asked about "strategy", suggest easier badges first (Starstruck, Pair Extraordinaire).
4. Keep responses concise but formatted beautifully with markdown.

You are using a high-reasoning model. Use your thinking capabilities to analyze complex user scenarios (e.g., "I have a small repo, how do I get Starstruck Gold?").
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const client = getAI();
    
    // Convert history to format expected by @google/genai if using chat directly,
    // but for single turn with context, we can just append or use chat.
    // Let's use chat for history.
    
    const chat = client.chats.create({
      model: 'gemini-3-pro-preview', // Using the high-reasoning model as requested
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
            thinkingBudget: 32768, // Max thinking budget for deep reasoning
        }
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the Badge Intelligence Network.";
  }
};
