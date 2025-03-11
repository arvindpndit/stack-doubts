import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    // Extract both title and content from the request
    const { title, content } = await request.json();

    // Check if content exists (content is the actual question)
    if (!content) {
      return NextResponse.json(
        { error: 'Question content is required' },
        { status: 400 },
      );
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: ' API key is required' },
        { status: 400 },
      );
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Create prompt
    const prompt = `You are a coding expert assistant.   
      Title: ${title || 'Coding Question'}
      Question: ${content}

      Please provide a comprehensive answer to the above coding question with:
      1. Clear explanations of the concepts involved
      2. Practical, ready-to-use code examples
      3. Best practices and potential pitfalls
      4. Context for when and how to use this approach

      Format your response with proper markdown for code blocks.`;
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error('Error querying Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}

