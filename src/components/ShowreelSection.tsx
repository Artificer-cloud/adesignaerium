'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function ShowreelSection() {
  const [videoId, setVideoId]   = useState<string | null>(null)
  const [muted,   setMuted]     = useState(true)
  const [ready,   setReady]     = useState(false)
  const iframeRef               = useRef<HTMLIFrameElement>(null)

  // Auto-pick the latest YouTube upload as the showreel
  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.json())
      .then(data => {
        if (data.videos?.[0]?.id) setVideoId(data.videos[0].id)
      })
      .catch(() => {})
  }, [])

  const toggleMute = () => {
    const msg = muted
      ? '{"event":"command","func":"unMute","args":""}'
      : '{"event":"command","func":"mute","args":""}'
    iframeRef.current?.contentWindow?.postMessage(msg, '*')
    setMuted(m => !m)
  }

  return (
    <section style={{
      position:'relative', height:'clamp(420px,62vh,700px)',
      overflow:'hidden', background:'#050505',
    }}>

      {/* ── YouTube background ── */}
      {videoId ? (
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            style={{
              position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-50%)',
              width:'calc(177.78vh)', height:'100vh',
              minWidth:'100%', minHeight:'56.25vw',
              border:'none',
              opacity: ready ? 1 : 0,
              transition:'opacity 1.2s ease',
            }}
            onLoad={() => setReady(true)}
            title="Showreel"
          />
        </div>
      ) : (
        <div style={{
          position:'absolute', inset:0,
          background:'repeating-linear-gradient(45deg,#0a0a0a 0,#0a0a0a 10px,#0f0f0f 10px,#0f0f0f 20px)',
        }}/>
      )}

      {/* Gradients */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(100deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.45) 55%,rgba(0,0,0,0.1) 100%)' }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'25%', pointerEvents:'none', background:'linear-gradient(to bottom,var(--ink),transparent)' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', pointerEvents:'none', background:'linear-gradient(to bottom,transparent,var(--ink))' }}/>

      {/* ── Content ── */}
      <div style={{ position:'absolute', inset:0, zIndex:2, display:'flex', alignItems:'center', padding:'0 clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth:'580px' }}>

          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginBottom:'20px', fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)' }}>
            <span style={{ width:'7px', height:'7px', background:'var(--orange)', borderRadius:'50%', animation:'blink 2s ease-in-out infinite', flexShrink:0 }}/>
            {videoId ? 'LATEST UPLOAD' : 'SHOWREEL 2026'}
          </div>

          <h2 style={{
            fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
            fontSize:'clamp(44px,8.5vw,100px)', letterSpacing:'-4px',
            color:'var(--bone)', lineHeight:0.86, marginBottom:'20px',
          }}>
            THE<br/>
            <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)', letterSpacing:'-2px' }}>Motion</span><br/>
            WORK.
          </h2>

          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,16px)', fontStyle:'italic', color:'rgba(237,232,221,0.55)', lineHeight:1.75, marginBottom:'32px', maxWidth:'380px' }}>
            Product videos, AI campaigns, brand films and social content — built for brands across the UAE and GCC.
          </p>

          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
            <Link href="/reel" style={{
              display:'inline-block', background:'var(--orange)', color:'var(--ink)',
              fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600,
              fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase',
              padding:'13px 28px', borderRadius:'2px', whiteSpace:'nowrap',
            }}>View All Videos ↗</Link>

            {videoId && (
              <button onClick={toggleMute} style={{
                background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)',
                color:'rgba(237,232,221,0.75)', fontFamily:'var(--font-mono)',
                fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase',
                padding:'13px 18px', borderRadius:'2px', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'8px',
              }}>
                <span style={{ fontSize:'13px' }}>{muted ? '🔇' : '🔊'}</span>
                {muted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ position:'absolute', bottom:0, right:0, zIndex:3, padding:'14px clamp(20px,6vw,80px)', display:'flex' }}>
        {[{n:'UAE',l:'Based'},{n:'9',l:'Brands'},{n:'30+',l:'Videos'}].map(({ n, l }) => (
          <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'0 clamp(14px,2vw,24px)', borderLeft:'1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'18px', color:'var(--orange)', letterSpacing:'-0.5px' }}>{n}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px', marginTop:'2px' }}>{l.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  )
}
