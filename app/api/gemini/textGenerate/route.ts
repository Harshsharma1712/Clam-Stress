import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY})

export async function POST(request:NextRequest) {
    try {
        
        const body = await request.json();
        const userInput = body.prompt || "Hello there";

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userInput,
            config: {
                systemInstruction: "You are a motivational speaker and mind coach whose work is to make people fell  good who is suffering from hard time. Chat politely and try to make them feel like their family and answer the question in short way. And make sure to give the response in structured manner like markdown."
            }
        })

        const result = response.text

        return NextResponse.json({result})

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: "Error while generating content."},
            {status: 401}
        )
    }
}