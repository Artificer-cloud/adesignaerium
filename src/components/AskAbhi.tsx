'use client'
import { useState, useEffect, useRef } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  "I need branding for my business",
  "Can you make an AI video for my product?",
  "Are you available for a project?",
  "What makes your work different?",
]

export default function AskAbhi() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [mounted,  setMounted]  = useState(false)
  const [unread,   setUnread]   = useState(true)
  const bottomRef              = useRef<HTMLDivElement>(null)
  const inputRef               = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res  = await fetch('/api/ask-abhi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, {
        role: 'assistant',
        content: data.reply || data.error || 'Something went wrong. WhatsApp: +971 52 677 6884 📱',
      }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection issue. WhatsApp Abhi: +971 52 677 6884 📱' }])
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Chat panel ── */}
      <div style={{
        position:'fixed', bottom:'96px', left:'24px', zIndex:998,
        width:'clamp(300px,92vw,360px)',
        background:'#080808', border:'1px solid #1e1e1e',
        borderRadius:'14px', overflow:'hidden',
        boxShadow:'0 24px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,77,0,0.08)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        pointerEvents: open ? 'auto' : 'none',
        transition:'all .35s cubic-bezier(.23,1,.32,1)',
        transformOrigin:'bottom left',
      }}>

        {/* Header */}
        <div style={{
          background:'linear-gradient(135deg, #ff4d00 0%, #e63d00 100%)',
          padding:'16px 18px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ position:'relative' }}>
              <div style={{
                width:'38px', height:'38px', borderRadius:'50%',
                background:'rgba(0,0,0,0.25)', border:'2px solid rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
                fontSize:'15px', color:'#fff', flexShrink:0,
              }}>A</div>
              <span style={{
                position:'absolute', bottom:'1px', right:'1px',
                width:'9px', height:'9px', borderRadius:'50%',
                background:'#22c55e', border:'2px solid #e63d00',
              }}/>
            </div>
            <div>
              <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'15px', color:'#fff', letterSpacing:'-0.5px' }}>Ask Abhi</div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.7)', fontFamily:'monospace', letterSpacing:'0.5px' }}>
                Senior Creative Designer · Dubai
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            background:'rgba(0,0,0,0.2)', border:'none', color:'rgba(255,255,255,0.8)',
            width:'28px', height:'28px', borderRadius:'50%', cursor:'pointer',
            fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
          >✕</button>
        </div>

        {/* Messages area */}
        <div style={{
          height:'320px', overflowY:'auto', padding:'16px',
          display:'flex', flexDirection:'column', gap:'12px',
          scrollbarWidth:'none',
        }}>

          {/* Welcome */}
          {messages.length === 0 && (
            <div>
              <div style={{
                background:'#111', border:'1px solid #1e1e1e',
                borderRadius:'4px 14px 14px 14px', padding:'13px 15px', maxWidth:'90%',
              }}>
                <p style={{ fontFamily:'var(--font-body,DM Sans,sans-serif)', fontSize:'13.5px', color:'#ede8dd', lineHeight:1.7, margin:0 }}>
                  Hey! 👋 I&apos;m Abhi&apos;s AI — trained on his work, his process, his way of thinking. What are you working on?
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px', marginTop:'14px' }}>
                {STARTERS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    background:'transparent', border:'1px solid #222',
                    borderRadius:'8px', padding:'9px 13px', textAlign:'left',
                    color:'#8a8070', fontFamily:'var(--font-body,DM Sans,sans-serif)',
                    fontSize:'12px', cursor:'pointer', transition:'all .2s ease',
                    lineHeight:1.4,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#ff4d00'; e.currentTarget.style.color='#ff4d00'; e.currentTarget.style.background='rgba(255,77,0,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#222'; e.currentTarget.style.color='#8a8070'; e.currentTarget.style.background='transparent' }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((m, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:'86%',
                background: m.role === 'user' ? '#ff4d00' : '#111',
                border: m.role === 'user' ? 'none' : '1px solid #1e1e1e',
                borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
                padding:'11px 14px',
              }}>
                <p style={{
                  fontFamily:'var(--font-body,DM Sans,sans-serif)',
                  fontSize:'13.5px', lineHeight:1.7, margin:0,
                  color: m.role === 'user' ? '#080808' : '#ede8dd',
                  whiteSpace:'pre-line',
                }}>{m.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display:'flex', justifyContent:'flex-start' }}>
              <div style={{
                background:'#111', border:'1px solid #1e1e1e',
                borderRadius:'4px 14px 14px 14px', padding:'13px 16px',
                display:'flex', gap:'5px', alignItems:'center',
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width:'7px', height:'7px', borderRadius:'50%',
                    background:'#ff4d00', display:'block', opacity:0.8,
                    animation:`bounce 1.3s ease-in-out ${i * 0.2}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* WhatsApp nudge */}
        <div style={{ padding:'8px 16px', background:'#0a0a0a', borderTop:'1px solid #161616', display:'flex', alignItems:'center', gap:'7px' }}>
          <span style={{ fontSize:'12px' }}>💬</span>
          <a href="https://wa.me/971526776884?text=Hi%20Abhi%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.8px', color:'#4a4a4a', textDecoration:'none' }}>
            Rather talk directly? <span style={{ color:'#ff4d00' }}>WhatsApp Abhi ↗</span>
          </a>
        </div>

        {/* Input */}
        <div style={{ padding:'12px 14px', borderTop:'1px solid #1e1e1e', display:'flex', gap:'8px', alignItems:'center', background:'#080808' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder="Tell me about your project..."
            disabled={loading}
            style={{
              flex:1, background:'#111', border:'1px solid #1e1e1e',
              borderRadius:'8px', padding:'10px 13px', color:'#ede8dd',
              fontSize:'13px', fontFamily:'var(--font-body,DM Sans,sans-serif)',
              outline:'none', transition:'border-color .2s',
              opacity: loading ? 0.6 : 1,
            }}
            onFocus={e => (e.target.style.borderColor = '#ff4d00')}
            onBlur={e => (e.target.style.borderColor = '#1e1e1e')}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading ? '#ff4d00' : '#1e1e1e',
              border:'none', borderRadius:'8px',
              width:'38px', height:'38px', flexShrink:0,
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all .2s ease',
              transform: input.trim() && !loading ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke={input.trim() && !loading ? '#080808' : '#4a4a4a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Floating trigger ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ask Abhi AI"
        style={{
          position:'fixed', bottom:'24px', left:'24px', zIndex:999,
          width:'58px', height:'58px', borderRadius:'50%',
          background: open ? '#111' : '#ff4d00',
          border: open ? '1px solid #2e2e2e' : 'none',
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: open ? 'none' : '0 4px 20px rgba(255,77,0,0.5), 0 8px 40px rgba(255,77,0,0.2)',
          transition:'all .35s cubic-bezier(.23,1,.32,1)',
          transform: open ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="#8a8070" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M13 2.5C7.48 2.5 3 6.7 3 12c0 2.3.88 4.4 2.34 6.05L4 23l5.1-1.55A10.12 10.12 0 0013 22c5.52 0 10-4.2 10-9.5S18.52 2.5 13 2.5Z" fill="#080808"/>
            <circle cx="9" cy="12.5" r="1.3" fill="#ff4d00"/>
            <circle cx="13" cy="12.5" r="1.3" fill="#ff4d00"/>
            <circle cx="17" cy="12.5" r="1.3" fill="#ff4d00"/>
          </svg>
        )}
        {unread && !open && (
          <span style={{
            position:'absolute', top:'2px', right:'2px',
            width:'13px', height:'13px', borderRadius:'50%',
            background:'#22c55e', border:'2px solid #080808',
            animation:'blink 2s ease-in-out infinite',
          }}/>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%,60%,100%{transform:translateY(0);opacity:0.6}
          30%{transform:translateY(-6px);opacity:1}
        }
        @keyframes blink {
          0%,100%{opacity:1}
          50%{opacity:0.3}
        }
      `}</style>
    </>
  )
}
