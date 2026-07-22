'use client'
import { useState, useEffect, useRef } from 'react'

type Message = { from: 'abhi' | 'user'; text: string }

// ── FAQ DATABASE — edit answers here anytime ──────────────────────────────────
const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['service','offer','do you do','what do you','specialise','specialize','help with','work on'],
    answer: "I offer Brand Identity & Strategy, UI/UX & Web Design, AI Video Production, Packaging & Print, Motion & Social Content, and AI Creative Direction. Which one are you looking for? 👀",
  },
  {
    keywords: ['brand','logo','identity','guidelines','typography'],
    answer: "Branding is my bread and butter — logo systems, colour palettes, typography, brand guidelines, the full package. Tell me about your brand and what you're building. 🎨",
  },
  {
    keywords: ['ui','ux','web','website','app','figma','design system','prototype','wireframe'],
    answer: "I design and build — from Figma wireframes and prototypes all the way to a live Next.js website. I've built 5 brand websites for the Krossover ecosystem. What are you building?",
  },
  {
    keywords: ['ai video','veo','seedance','reel','video','commercial','film','campaign','ugc'],
    answer: "AI video is where I do my most exciting work right now. I use Veo3, Seedance, ElevenLabs and CapCut to produce product reels, brand films and social content that looks cinematic without the cinematic budget. 🎬",
  },
  {
    keywords: ['midjourney','ai image','ai visual','ai design','generative','prompt'],
    answer: "I use Midjourney, Flux and Ideogram for AI image production — product photography, lifestyle imagery, editorial visuals. I treat it as creative direction, not just generation. Every image starts with a brief. ✦",
  },
  {
    keywords: ['packaging','print','catalogue','box','gift','corporate gift'],
    answer: "I've done 3+ years of packaging and print for corporate gifting brands in the UAE — gift boxes, ribbons, tissue, catalogues, branded inserts. All delivered print-ready with CMYK profiles. 📦",
  },
  {
    keywords: ['social','instagram','reel','content','motion','animation','after effects'],
    answer: "Social content and motion is a big part of what I do — Instagram reels, product reveals, stop motion, brand animations. I direct, shoot, edit and deliver. What platform are you creating for?",
  },
  {
    keywords: ['price','cost','rate','charge','budget','quote','how much','pricing','fee','package'],
    answer: "I prefer discussing pricing after understanding your project scope — every project is different. WhatsApp me and we can figure it out quickly: +971 52 677 6884 📱",
  },
  {
    keywords: ['available','availability','hire','book','free','open','taking','project','work together','collaborate'],
    answer: "I'm currently open for new projects! 🟢 Best to reach me on WhatsApp for a quick chat about what you need: +971 52 677 6884",
  },
  {
    keywords: ['process','how do you work','workflow','step','phase','approach'],
    answer: "My process: Brief → Research → Concept → Execution → Delivery. I keep it tight and collaborative — usually 2-3 rounds of feedback. Want me to walk you through a specific type of project?",
  },
  {
    keywords: ['turnaround','timeline','how long','deadline','time','delivery','when','rush'],
    answer: "Timelines depend on scope — a brand identity takes 2-3 weeks, a website 4-6 weeks, an AI video reel 3-5 days. Tight deadline? WhatsApp me and I'll tell you if I can make it work: +971 52 677 6884",
  },
  {
    keywords: ['tool','software','use','adobe','figma','stack','tech'],
    answer: "Adobe Suite (Ps Ai Id Ae Lr Pr), Figma, Midjourney, Veo3, Seedance, ElevenLabs, CapCut, Next.js, React. I pick the right tool for the job — not the trendiest one. 🛠",
  },
  {
    keywords: ['dubai','uae','gcc','remote','location','based','where','middle east'],
    answer: "I'm based in Dubai, UAE — working with clients across the UAE, GCC and globally. Remote collaboration is seamless. Where are you based?",
  },
  {
    keywords: ['experience','year','background','history','senior'],
    answer: "7+ years as a Senior Creative Designer — branding, UI/UX, AI design, motion, packaging, photography. I've worked across B2B, corporate gifting, tech, education and luxury. What kind of experience matters for your project?",
  },
  {
    keywords: ['client','brand','krossover','sipple','ecora','maison','shanghai','work with'],
    answer: "My main clients are Krossover Gifts, Shanghai Gifts, Ecora, Maison Valér and Sipple — all in the UAE corporate gifting space. I'm the full creative stack for all five brands. 💼",
  },
  {
    keywords: ['behance','dribbble','portfolio','work','project','case study','see','show','example'],
    answer: "You're on my portfolio right now! 😄 Check out the Work section for case studies — or Behance for the deep dives: behance.net/abhijeeth-subhash",
  },
  {
    keywords: ['contact','reach','email','whatsapp','phone','message','talk','speak','call'],
    answer: "Best ways to reach me:\n📱 WhatsApp: +971 52 677 6884\n📧 Email: abhijeethpiyush4@gmail.com\n💼 LinkedIn: abhijeethsubhash\nWhatsApp is the fastest — I usually reply within the hour.",
  },
  {
    keywords: ['instagram','linkedin','social media','follow','profile'],
    answer: "Find me here:\n📸 Instagram: @wonderartmedia\n💼 LinkedIn: abhijeethsubhash\n🎨 Behance: abhijeeth-subhash\n🏀 Dribbble: Artificer_666",
  },
  {
    keywords: ['hello','hi','hey','hii','good morning','good afternoon','sup','yo'],
    answer: "Hey! 👋 Great to have you here. I'm Abhi's AI — ask me anything about his work, services, or how to get in touch. What brings you to the portfolio today?",
  },
  {
    keywords: ['thank','thanks','cheers','appreciate','perfect','great','awesome','cool'],
    answer: "Glad I could help! 🙌 If you want to discuss an actual project, WhatsApp is the fastest route: +971 52 677 6884. Abhi usually replies within the hour.",
  },
  {
    keywords: ['who are you','what are you','are you ai','are you real','are you human','are you abhi'],
    answer: "I'm a smart FAQ assistant built into Abhi's portfolio — not real AI, but I know everything about his work! For the real Abhi, one WhatsApp message away: +971 52 677 6884 📱",
  },
  {
    keywords: ['freelance','full time','agency','studio'],
    answer: "Abhi works as an independent Senior Creative Designer under his brand ADesignAerium — so yes, freelance/contract. He's not tied to an agency, which means full creative focus on your project.",
  },
]

const FALLBACK = "Great question! That's best answered by Abhi directly — WhatsApp him for a quick reply: +971 52 677 6884 📱"

const STARTERS = [
  "What services do you offer?",
  "Are you available for projects?",
  "How does AI video production work?",
  "How do I get a quote?",
]

function getReply(input: string): string {
  const lower = input.toLowerCase()
  for (const faq of FAQ) {
    if (faq.keywords.some(k => lower.includes(k))) return faq.answer
  }
  return FALLBACK
}

export default function AskAbhi() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)
  const [mounted,  setMounted]  = useState(false)
  const [unread,   setUnread]   = useState(true)
  const bottomRef              = useRef<HTMLDivElement>(null)
  const inputRef               = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 320)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    const userMsg: Message = { from: 'user', text: text.trim() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    // Simulate natural typing delay 600–1000ms
    const delay = 600 + Math.random() * 400
    setTimeout(() => {
      const reply = getReply(text)
      setMessages(m => [...m, { from: 'abhi', text: reply }])
      setTyping(false)
    }, delay)
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Chat panel ── */}
      <div style={{
        position:'fixed', bottom:'96px', left:'24px', zIndex:998,
        width:'clamp(300px,90vw,356px)',
        background:'#080808', border:'1px solid #1e1e1e',
        borderRadius:'12px', overflow:'hidden',
        boxShadow:'0 24px 64px rgba(0,0,0,0.7)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        pointerEvents: open ? 'auto' : 'none',
        transition:'all .3s cubic-bezier(.23,1,.32,1)',
        transformOrigin:'bottom left',
      }}>

        {/* Header */}
        <div style={{ background:'#ff4d00', padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'36px', height:'36px', borderRadius:'50%',
              background:'#080808', display:'flex', alignItems:'center',
              justifyContent:'center', fontFamily:'Clash Display,Arial Black,sans-serif',
              fontWeight:700, fontSize:'14px', color:'#ff4d00', flexShrink:0,
              border:'2px solid rgba(0,0,0,0.2)',
            }}>A</div>
            <div>
              <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'15px', color:'#080808', letterSpacing:'-0.5px' }}>Ask Abhi</div>
              <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                <span style={{ width:'6px', height:'6px', background:'#080808', borderRadius:'50%', opacity:.55, animation:'blink 2s infinite' }}/>
                <span style={{ fontSize:'10px', color:'rgba(0,0,0,0.55)', fontFamily:'monospace', letterSpacing:'0.5px' }}>Usually replies instantly</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            background:'rgba(0,0,0,0.15)', border:'none', color:'#080808',
            width:'28px', height:'28px', borderRadius:'50%', cursor:'pointer',
            fontSize:'15px', display:'flex', alignItems:'center', justifyContent:'center',
          }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{
          height:'300px', overflowY:'auto', padding:'16px',
          display:'flex', flexDirection:'column', gap:'10px',
          scrollbarWidth:'none',
        }}>

          {/* Welcome state */}
          {messages.length === 0 && (
            <div>
              <div style={{
                background:'#111', border:'1px solid #1e1e1e',
                borderRadius:'10px 10px 10px 2px', padding:'12px 14px', maxWidth:'88%',
              }}>
                <p style={{ fontFamily:'var(--font-body,DM Sans,sans-serif)', fontSize:'13px', color:'#ede8dd', lineHeight:1.65, margin:0 }}>
                  Hey! 👋 I&apos;m Abhi&apos;s assistant. Ask me anything about his work, services, or how to get in touch.
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginTop:'12px' }}>
                {STARTERS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    style={{
                      background:'transparent', border:'1px solid #222',
                      borderRadius:'6px', padding:'8px 12px', textAlign:'left',
                      color:'#8a8070', fontFamily:'monospace', fontSize:'11px',
                      letterSpacing:'0.3px', cursor:'pointer', transition:'all .2s',
                    }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor='#ff4d00'; b.style.color='#ff4d00' }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor='#222'; b.style.color='#8a8070' }}
                  >{s} →</button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation messages */}
          {messages.map((m, i) => (
            <div key={i} style={{ display:'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:'84%',
                background: m.from === 'user' ? '#ff4d00' : '#111',
                border: m.from === 'user' ? 'none' : '1px solid #1e1e1e',
                borderRadius: m.from === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                padding:'10px 13px',
              }}>
                <p style={{
                  fontFamily:'var(--font-body,DM Sans,sans-serif)',
                  fontSize:'13px', lineHeight:1.65, margin:0,
                  color: m.from === 'user' ? '#080808' : '#ede8dd',
                  whiteSpace:'pre-line',
                }}>{m.text}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display:'flex', justifyContent:'flex-start' }}>
              <div style={{
                background:'#111', border:'1px solid #1e1e1e',
                borderRadius:'10px 10px 10px 2px', padding:'12px 16px',
                display:'flex', gap:'5px', alignItems:'center',
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width:'6px', height:'6px', borderRadius:'50%',
                    background:'#ff4d00', display:'block',
                    animation:`bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef}/>
        </div>

        {/* WhatsApp strip */}
        <div style={{ padding:'8px 16px', background:'#0a0a0a', borderTop:'1px solid #161616', display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'11px' }}>💬</span>
          <a href="https://wa.me/971526776884?text=Hi%20Abhi%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.8px', color:'#4a4a4a', textDecoration:'none' }}>
            Prefer to chat directly? <span style={{ color:'#ff4d00' }}>WhatsApp Abhi ↗</span>
          </a>
        </div>

        {/* Input bar */}
        <div style={{ padding:'12px 14px', borderTop:'1px solid #1e1e1e', display:'flex', gap:'8px', alignItems:'center', background:'#080808' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send(input) } }}
            placeholder="Ask anything..."
            style={{
              flex:1, background:'#111', border:'1px solid #1e1e1e',
              borderRadius:'6px', padding:'9px 12px', color:'#ede8dd',
              fontSize:'13px', fontFamily:'var(--font-body,DM Sans,sans-serif)', outline:'none',
            }}
            onFocus={e => (e.target.style.borderColor = '#ff4d00')}
            onBlur={e => (e.target.style.borderColor = '#1e1e1e')}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            style={{
              background: input.trim() && !typing ? '#ff4d00' : '#1e1e1e',
              border:'none', borderRadius:'6px',
              width:'36px', height:'36px', flexShrink:0,
              cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background .2s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke={input.trim() && !typing ? '#080808' : '#4a4a4a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ask Abhi"
        style={{
          position:'fixed', bottom:'24px', left:'24px', zIndex:999,
          width:'56px', height:'56px', borderRadius:'50%',
          background: open ? '#111' : '#ff4d00',
          border: open ? '1px solid #2e2e2e' : 'none',
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: open ? 'none' : '0 4px 24px rgba(255,77,0,0.45)',
          transition:'all .3s cubic-bezier(.23,1,.32,1)',
          transform: open ? 'scale(0.9) rotate(90deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="#8a8070" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7.03 3 3 6.8 3 11.5c0 2.1.8 4.1 2.2 5.6L4 21l4.6-1.4C9.9 20.2 11 20.5 12 20.5c4.97 0 9-3.8 9-8.5S16.97 3 12 3Z" fill="#080808"/>
            <circle cx="8.5" cy="12" r="1.1" fill="#ff4d00"/>
            <circle cx="12" cy="12" r="1.1" fill="#ff4d00"/>
            <circle cx="15.5" cy="12" r="1.1" fill="#ff4d00"/>
          </svg>
        )}

        {/* Unread notification dot */}
        {unread && !open && (
          <span style={{
            position:'absolute', top:'1px', right:'1px',
            width:'13px', height:'13px', borderRadius:'50%',
            background:'#22c55e', border:'2px solid #080808',
            animation:'blink 2s infinite',
          }}/>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%,60%,100% { transform:translateY(0); opacity:0.6; }
          30%          { transform:translateY(-5px); opacity:1; }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
      `}</style>
    </>
  )
}
