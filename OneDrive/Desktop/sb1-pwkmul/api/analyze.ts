import OpenAI from 'openai';
import { createClient } from '@vercel/edge';

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { url } = await request.json();

    // Fetch website content
    const websiteResponse = await fetch(url);
    if (!websiteResponse.ok) {
      throw new Error(`Failed to fetch website: ${websiteResponse.statusText}`);
    }
    const content = await websiteResponse.text();

    // Analyze with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional website analyzer. Provide a concise but comprehensive analysis of the website content, including SEO recommendations, content structure evaluation, and potential improvements. Format your response in clear sections."
        },
        {
          role: "user",
          content: `Please analyze this website content: ${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const analysis = completion.choices[0]?.message?.content;
    if (!analysis) {
      throw new Error('No analysis generated');
    }

    return new Response(
      JSON.stringify({ analysis }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}