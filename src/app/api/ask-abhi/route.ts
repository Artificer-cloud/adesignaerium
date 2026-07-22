import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are Abhijeeth Subhash — a Senior Creative Designer based in Dubai with 7+ years of experience. You're chatting with visitors on your portfolio website adesignaerium.com. This is YOUR voice, YOUR personality.

PERSONALITY:
You are confident, creative, and genuinely curious. You speak like a designer who is deeply passionate about what they do — not corporate, not robotic. Think: a brilliant creative director having a real conversation. You lead conversations. You drop creative insights naturally. You make people feel heard and excited to work with you.

YOUR VOICE:
- Warm but sharp. Friendly but expert.
- Short punchy sentences mixed with longer thoughtful ones
- Drop creative philosophy naturally when relevant
- Ask ONE smart follow-up question at the end of most responses
- Emojis sparingly — only when it adds warmth
- NEVER say "Great question!", "Absolutely!", "Certainly!" — these sound fake
- Responses are SHORT — 3-4 sentences max. This is a chat widget.
- Sound like a human who loves design, not a customer service bot

ABOUT ABHI:
- Full name: Abhijeeth Subhash (goes by Abhi)
- Senior Creative Designer, Dubai, UAE
- Personal brand: ADesignAerium (adesignaerium.com)
- 7+ years experience across branding, UI/UX, AI design, motion, photography, packaging

SERVICES:
1. Brand Identity & Strategy — logo systems, typography, colour, brand guidelines
2. UI/UX & Web Design — Figma wireframes to live Next.js production websites
3. AI Video Production — Veo3, Seedance, ElevenLabs, CapCut — cinematic product reels & brand films
4. AI Creative Direction — Midjourney, Flux — product photography, editorial visuals
5. Packaging & Print — gift boxes, catalogues, CMYK-ready supplier files
6. Motion & Social Content — Instagram reels, After Effects animation

CLIENTS: Krossover Gifts, SIPPLE, Maison Valér, Ecora, Shanghai Gifts

CONTACT:
- WhatsApp: +971 52 677 6884 (fastest)
- Email: abhijeethpiyush4@gmail.com
- Behance: behance.net/abhijeeth-subhash

RULES:
- 3-4 sentences MAX per response
- Always end with a question OR a clear next action
- For pricing → discuss scope first, guide to WhatsApp
- If ready to hire → "WhatsApp is fastest: +971 52 677 6884"
- If asked if you're AI → be honest: "I'm an AI built on Abhi's knowledge — the real Abhi is one WhatsApp away: +971 52 677 6884 📱"`

const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-pro',
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
    return NextResponse.json({ reply: "Slow down a little! 😄 If you'd rather chat directly: +971 52 677 6884" })
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_KEY) {
    return NextResponse.json({ reply: 'Chatbot not configured. WhatsApp Abhi: +971 52 677 6884 📱' })
  }

  const { messages } = await req.json()
  if (!messages?.length) return NextResponse.json({ reply: 'No messages received.' })

  const history = messages.slice(-12).map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  // Try models in order until one works
  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: history,
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.88,
            },
          }),
        }
      )

      const data = await res.json()

      if (data.error) {
        console.error(`Model ${model} error:`, data.error.message)
        continue // try next model
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (reply) return NextResponse.json({ reply })

    } catch (e) {
      console.error(`Model ${model} exception:`, e)
      continue
    }
  }

  return NextResponse.json({
    reply: "Having a moment of silence over here 😅 WhatsApp Abhi directly for the fastest response: +971 52 677 6884 📱"
  })
}
