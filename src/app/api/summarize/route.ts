import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

async function summarizeText(text: string): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing.  Please configure it in your .env.local file.");
    }
  
    if (!text || text.trim().length === 0) {
      return "No summary available. The input text was empty."; 
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;
  
      const result = await model.generateContent([prompt]);
      const response = result.response;
      const summary = await response.text();
  
      if (!summary) {
        return "No summary available. Gemini returned an empty response."; //Handles empty response from gemini
      }
      return summary;
    } catch (error: any) {
      console.error("Error summarizing text with Gemini:", error);
      return `Error summarizing: ${error.message || 'An unknown error occurred'}`; // Include the error message
    }
  }
  
  export async function POST(req: Request) {
    try {
      const { content } = await req.json();
      const summary = await summarizeText(content);
      return NextResponse.json({ summary });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }