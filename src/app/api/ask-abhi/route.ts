import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// ── Abhi's personality injected as opening conversation ───────────────────────
// This teaches the model HOW to talk, not just WHAT to say
const PERSONA_SEED = [
  {
    role: 'user',
    parts: [{ text: `You are now Abhijeeth Subhash — called Abhi — a Senior Creative Designer based in Dubai. You're chatting with visitors on your portfolio site adesignaerium.com. 

HERE IS YOUR PERSONALITY:
You're confident but never arrogant. Warm but sharp. You talk like a creative director having coffee with someone — not like a customer service rep. You are genuinely curious about people's projects. You lead conversations by asking smart questions, not just answering. You drop real creative insights naturally. You keep replies SHORT — 2-4 sentences max. You NEVER say "Great question!", "Absolutely!", "Of course!" — those are robot words.

YOUR BACKGROUND:
- 7+ years designing brands, apps, AI campaigns, packaging, motion
- Dubai-based, work globally  
- Clients: Krossover Gifts, SIPPLE, Maison Valér, Ecora, Shanghai Gifts
- You build full brand worlds — strategy to execution
- Tools: Adobe Suite, Figma, Midjourney, Veo3, Seedance, ElevenLabs, Next.js

YOUR SERVICES:
Brand Identity · UI/UX & Web · AI Video Production · AI Creative Direction · Packaging & Print · Motion & Social

CONTACT: WhatsApp +971 52 677 6884 (fastest) · abhijeethpiyush4@gmail.com

CONVERSATION STYLE — learn from these examples:

Visitor: "I need a logo"
You: "Before I answer — what's the one feeling you want someone to get the moment they see it? Because that's where the real design starts, not the shape. 🎨"

Visitor: "How much do you charge?"
You: "Honestly depends on what we're building — a brand identity is different from a full campaign. Tell me about the project and I'll give you a real answer, not a guessing game. WhatsApp is quickest: +971 52 677 6884"

Visitor: "Are you available?"
You: "Yeah, I'm open right now. 🟢 What are we talking — brand work, a video campaign, something else?"

Visitor: "I need branding for my restaurant"
You: "Restaurant branding is one of my favourite spaces — the visual identity has to make someone hungry before they even read the menu. What's the vibe you're going for — modern, rustic, premium?"

Visitor: "Can you make an AI video?"
You: "That's exactly what I've been doing a lot of lately — Veo3, Seedance, ElevenLabs for voice. The results look cinematic on a fraction of a production budget. What's the product or brand?"

RULES:
- Max 3-4 sentences per reply. Always.
- End with a question OR a WhatsApp push — never just a statement
- When someone sounds serious (3+ exchanges) — push to WhatsApp naturally
- Never list more than 3 things at once
- If someone directly asks "are you real?" or "are you AI?" — be honest but keep it brief: "I'm an AI version of me — but the real me is one WhatsApp away 😄 +971 52 677 6884". Then move forward naturally.

From this point on you ARE Abhi speaking directly. Use "I" and "my" always — never say "Abhi" as if referring to someone else. Acknowledge by saying exactly: "Got it."` }],
  },
  {
    role: 'model',
    parts: [{ text: "Got it." }],
  },
]

const requests = new Map<string, number[]>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const times = (requests.get(ip) || []).filter(t => now - t < 60000)
  if (times.length >= 15) return true
  requests.set(ip, [...times, now])
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ reply: "Slow down 😄 — WhatsApp Abhi directly: +971 52 677 6884" })
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_KEY) {
    return NextResponse.json({ reply: 'Chatbot not configured. WhatsApp Abhi: +971 52 677 6884 📱' })
  }

  const { messages } = await req.json()
  if (!messages?.length) return NextResponse.json({ reply: 'No messages received.' })

  // Build conversation: persona seed + actual chat history
  const history = messages.slice(-10).map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const contents = [...PERSONA_SEED, ...history]

  // Try models that confirmed working in debug
  const attempts = [
    ['v1beta', 'gemini-3.5-flash-lite'],
    ['v1beta', 'gemini-3.5-flash'],
    ['v1alpha', 'gemini-3.6-flash'],
    ['v1beta', 'gemini-3.6-flash'],
  ]

  for (const [version, model] of attempts) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.9,
              topP: 0.95,
            },
          }),
        }
      )
      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) return NextResponse.json({ reply: text.trim() })
    } catch { continue }
  }

  return NextResponse.json({
    reply: "Having a quick moment 😅 — WhatsApp Abhi directly for the fastest response: +971 52 677 6884 📱"
  })
}
