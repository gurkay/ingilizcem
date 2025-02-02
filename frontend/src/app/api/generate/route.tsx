import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
    console.log(req)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not defined');
    }
    try {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        const model = generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const data = await req.json();
        const prompt = data.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();
        return NextResponse.json({ output: output });
    } catch (error: any) {
        console.error("server:::error: ", error);

        // Specific error handling for service overload
        if (error.status === 503) {
            return NextResponse.json({
                success: false,
                error: "AI service is temporarily unavailable. Please try again in a few moments.",
                status: 503
            }, { status: 503 });
        }

        // Generic error handling
        return NextResponse.json({
            success: false,
            error: "An error occurred while generating content. Please try again.",
            status: error.status || 500
        }, { status: error.status || 500 });
    }
}