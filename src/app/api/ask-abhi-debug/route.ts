import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY

  if (!GEMINI_KEY) return NextResponse.json({ error: 'GEMINI_API_KEY not set in Vercel env vars' })

  const results: Record<string, unknown> = { keyPrefix: GEMINI_KEY.substring(0, 10) + '...' }

  for (const model of ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro']) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Say hello in 5 words.' }] }],
            generationConfig: { maxOutputTokens: 20 },
          }),
        }
      )
      const data = await res.json()
      results[model] = data.error ? `ERROR: ${data.error.message}` : `OK: ${data.candidates?.[0]?.content?.parts?.[0]?.text}`
    } catch (e) {
      results[model] = `EXCEPTION: ${e}`
    }
  }

  return NextResponse.json(results)
}
