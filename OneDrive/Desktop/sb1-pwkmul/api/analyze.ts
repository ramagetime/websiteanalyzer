import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Fetch website content
    const response = await fetch(url)
    const html = await response.text()

    // Create a prompt for OpenAI
    const prompt = `Analyze this website HTML and provide insights about:
    1. Overall design and layout
    2. SEO readiness
    3. Key improvement suggestions
    4. Performance considerations
    
    HTML: ${html.substring(0, 4000)}` // Limiting HTML to avoid token limits

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    })

    const analysis = completion.choices[0].message.content

    return res.status(200).json({ analysis })
    
  } catch (error) {
    console.error('Analysis error:', error)
    return res.status(500).json({ error: 'Failed to analyze website' })
  }
}