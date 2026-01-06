
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Fix: Strictly following the coding guidelines for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  async generateSpiritualAdvice(prompt: string): Promise<string> {
    try {
      // Fix: Using the strictly initialized ai instance
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      return response.text || "As encruzilhadas estão em silêncio neste momento. Tente novamente em breve.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Houve uma interferência nos fios de energia. Por favor, reformule sua pergunta.";
    }
  }

  async startOracleChat() {
    // Fix: Using the strictly initialized ai instance
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
}

export const geminiService = new GeminiService();
