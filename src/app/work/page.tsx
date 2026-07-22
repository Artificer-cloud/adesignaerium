'use client'
import Link from 'next/link'
import { useState } from 'react'
import { projects, categories } from '@/lib/projects'

function WorkCard({ p, index, featured }: { p: any; index: number; featured: boolean }) {
  const [hovered, setHovered] = useState(false)
  const microlinkUrl = p.url
    ? `https://api.microlink.io/?url=${encodeURIComponent(p.url)}&screenshot=true&meta=false&embed=screenshot.url`
    : null
  const [imgSrc, setImgSrc] = useState<string>(microlinkUrl || p.coverImage || '')

  return (
    <Link href={`/work/${p.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={featured ? 'work-card work-card-featured' : 'work-card'}
      style={{
        position:'relative', overflow:'hidden', borderRadius:'8px',
        display:'block', background: p.color || '#0a0a0a',
        border:`1px solid ${hovered ? 'rgba(255,77,0,0.5)' : 'var(--border)'}`,
        transition:'border-color .3s ease', cursor:'pointer',
        animation:`fadeUp .7s cubic-bezier(.23,1,.32,1) ${.04+index*.06}s both`,
      }}>

      {/* Screenshot — contain shows full website, no cropping */}
      {imgSrc && (
        <img src={imgSrc} alt={p.title}
          onError={() => { if (imgSrc !== p.coverImage) setImgSrc(p.coverImage || '') }}
          style={{
            position:'absolute', top:0, left:0, width:'100%', height:'100%',
            objectFit:'contain',          // ← full website visible
            objectPosition:'center top',  // ← header always at top
            opacity: hovered ? 0.9 : 0.72,
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition:'opacity .5s ease, transform .7s cubic-bezier(.23,1,.32,1)',
          }}
        />
      )}

      {/* Bottom gradient so text stays readable */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'55%', zIndex:1, pointerEvents:'none',
        background:'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,0.92) 100%)',
      }}/>
      {/* Top gradient for category badges */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'30%', zIndex:1, pointerEvents:'none',
        background:'linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,transparent 100%)',
      }}/>

      {/* Top row */}
      <div style={{ position:'absolute', top:'16px', left:'16px', right:'16px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', zIndex:2 }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
          {p.category.slice(0,2).map((cat: string) => (
            <span key={cat} style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px', color:'white', textTransform:'uppercase', background:'rgba(255,77,0,0.9)', padding:'3px 9px', borderRadius:'2px' }}>{cat}</span>
          ))}
        </div>
        <div style={{
          width:'30px', height:'30px', borderRadius:'50%',
          background: hovered ? '#ff4d00' : 'rgba(0,0,0,0.45)',
          border:`1px solid ${hovered ? '#ff4d00' : 'rgba(255,255,255,0.25)'}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(8px)', transition:'all .3s ease', flexShrink:0,
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke={hovered?'#080808':'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2, padding:'0 18px 18px' }}>
        <p style={{
          fontFamily:'var(--font-body)', fontSize:'clamp(11px,1.1vw,13px)',
          fontStyle:'italic', color:'rgba(255,255,255,0.6)', lineHeight:1.5, marginBottom:'8px',
          maxHeight: hovered ? '60px' : '0px', overflow:'hidden',
          opacity: hovered ? 1 : 0,
          transition:'max-height .4s cubic-bezier(.23,1,.32,1), opacity .3s ease',
        }}>{p.description}</p>

        <h2 className={featured ? 'work-card-title-lg' : 'work-card-title'} style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
          letterSpacing:'-1px', color:'#fff', lineHeight:.92, marginBottom:'8px',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition:'transform .4s cubic-bezier(.23,1,.32,1)',
        }}>{p.title}</h2>

        <div style={{ display:'flex', alignItems:'center', gap:'8px', opacity: hovered?1:0.5, transition:'opacity .3s' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px', color:'rgba(255,255,255,0.5)' }}>{p.year}</span>
          <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'rgba(255,77,0,0.8)', flexShrink:0 }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px', color:'rgba(255,255,255,0.5)' }}>{p.client}</span>
        </div>
      </div>

      {/* Orange bottom sweep */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'#ff4d00',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin:'left',
        transition:'transform .5s cubic-bezier(.23,1,.32,1)', zIndex:3,
      }}/>
    </Link>
  )
}

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category.includes(active))

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh' }}>
      <section style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth:'1400px', margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ SELECTED WORK</span>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px', marginBottom:'36px' }}>
          <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(44px,10vw,120px)', letterSpacing:'-4px', color:'var(--bone)', lineHeight:.88, margin:0 }}>
            THE<br/><span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)' }}>Work.</span>
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,16px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'300px', lineHeight:1.7 }}>
            7+ years of branding, UI/UX, AI design, motion, and creative direction.
          </p>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase',
              padding:'8px 20px', borderRadius:'100px', cursor:'pointer',
              transition:'all .3s cubic-bezier(.23,1,.32,1)',
              background: active===cat ? 'var(--orange)' : 'transparent',
              color: active===cat ? 'var(--ink)' : 'var(--muted)',
              border: active===cat ? '1px solid var(--orange)' : '1px solid var(--border)',
            }}>{cat}</button>
          ))}
        </div>
      </section>

      <section style={{ padding:'0 clamp(12px,3vw,48px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>
        <div className="work-grid">
          {filtered.map((p: any, i: number) => (
            <WorkCard key={p.id} p={p} index={i} featured={active==='All' && (i===0||i===5)}/>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--dim)', fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px' }}>NO PROJECTS IN THIS CATEGORY YET.</div>
        )}
      </section>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

        /* ── Responsive bento grid ── */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(8px, 1vw, 12px);
        }
        .work-card          { min-height: 380px; }
        .work-card-featured { grid-column: span 2; min-height: 480px; }
        .work-card-title    { font-size: clamp(20px, 2.2vw, 30px); }
        .work-card-title-lg { font-size: clamp(26px, 3.5vw, 48px); }

        /* Tablet — 2 columns */
        @media (max-width: 900px) {
          .work-grid          { grid-template-columns: repeat(2, 1fr); }
          .work-card          { min-height: 320px; }
          .work-card-featured { grid-column: span 2; min-height: 400px; }
        }

        /* Mobile — 1 column, no featured spanning */
        @media (max-width: 560px) {
          .work-grid          { grid-template-columns: 1fr; gap: 8px; }
          .work-card          { min-height: 280px; }
          .work-card-featured { grid-column: span 1; min-height: 280px; }
          .work-card-title-lg { font-size: clamp(22px, 6vw, 30px); }
        }

        /* Light mode overlay */
        [data-theme="light"] .work-card { border-color: rgba(0,0,0,0.1); }
      `}</style>
    </main>
  )
}
