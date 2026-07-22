import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.GEMINI_API_KEY
  if (!key) return NextResponse.json({ error: 'GEMINI_API_KEY not set' })

  const results: Record<string, string> = { keyPrefix: key.substring(0,14)+'...' }

  const combos = [
    ['v1alpha', 'gemini-3.6-flash'],
    ['v1beta',  'gemini-3.6-flash'],
    ['v1beta',  'gemini-3.5-flash'],
    ['v1beta',  'gemini-3.5-flash-lite'],
    ['v1alpha', 'gemini-3.5-flash'],
    ['v1',      'gemini-3.6-flash'],
  ]

  for (const [version, model] of combos) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Say hi in 3 words.' }] }],
            generationConfig: { maxOutputTokens: 20 },
          }),
        }
      )
      const data = await res.json()
      if (data.error) {
        results[`${version}/${model}`] = `❌ ${data.error.message?.substring(0,80)}`
      } else {
        results[`${version}/${model}`] = `✅ ${data.candidates?.[0]?.content?.parts?.[0]?.text}`
      }
    } catch (e) {
      results[`${version}/${model}`] = `❌ exception: ${e}`
    }
  }

  return NextResponse.json(results)
}
