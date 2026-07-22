'use client'
import Link from 'next/link'
import { useState } from 'react'

const SERVICES = [
  {
    num:'01', title:'Brand Identity\n& Strategy',
    desc:'Logo systems, typography, colour, brand guidelines. Full visual world-building — from positioning to pixel. Not a logo. A universe.',
    tags:['Logo Design','Brand Strategy','Typography','Visual Identity','Brand Guidelines','Naming'],
    time:'2–4 weeks', color:'#ff4d00',
  },
  {
    num:'02', title:'UI/UX &\nWeb Design',
    desc:'Figma wireframes to live Next.js production websites. E-commerce, brand sites, app interfaces — designed and shipped.',
    tags:['Figma','Next.js','React','Prototyping','E-Commerce','App UI','Design Systems'],
    time:'4–8 weeks', color:'#7c3aed',
  },
  {
    num:'03', title:'AI Video &\nCreative Direction',
    desc:'Product reels, brand films, AI campaigns. Full pipeline: storyboard → Midjourney → Veo3 → ElevenLabs → delivery. Cinematic results at a fraction of production cost.',
    tags:['Veo3','Midjourney','ElevenLabs','Seedance','CapCut','Kling 2.5','Runway'],
    time:'3–7 days', color:'#0ea5e9',
  },
  {
    num:'04', title:'Packaging\n& Print',
    desc:'Gift box design, catalogues, branded inserts, ribbons. CMYK-ready, dieline-accurate, supplier-ready files every time.',
    tags:['Gift Packaging','Catalogue Design','Dielines','CMYK','Offset Print','Branded Inserts'],
    time:'1–3 weeks', color:'#d97706',
  },
  {
    num:'05', title:'Motion &\nSocial Content',
    desc:'Instagram reels, product reveals, stop motion, After Effects animations, brand films. Content built to perform.',
    tags:['After Effects','Premiere Pro','Instagram Reels','Stop Motion','Brand Animation','Social Strategy'],
    time:'2–5 days', color:'#10b981',
  },
  {
    num:'06', title:'Photography &\nArt Direction',
    desc:'Product photography, lifestyle shoots, AI-enhanced imagery. Art direction from concept to final edit — every frame intentional.',
    tags:['Product Photography','Lightroom','AI Enhancement','Lifestyle','Compositing','Retouching'],
    time:'1–3 days', color:'#f472b6',
  },
]

const PROCESS = [
  { num:'01', title:'Brief', desc:'Deep dive into your brand, goals, and audience. I ask the questions most designers avoid.' },
  { num:'02', title:'Concept', desc:'Strategic direction and visual concept. No templates. No shortcuts. Built from your brief.' },
  { num:'03', title:'Execute', desc:'Design, build, produce. Iterative process with 2–3 clear feedback rounds — tight and collaborative.' },
  { num:'04', title:'Deliver', desc:'Production-ready files. Clean handoff. No loose ends. You own everything, completely.' },
]

const CLIENTS = ['Krossover Gifts','Shanghai Gifts','Maison Valér','SIPPLE','Ecora','KELTRON']

function ServiceRow({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderBottom:'1px solid var(--border)', cursor:'pointer',
        padding:'clamp(24px,3vw,36px) 0',
        transition:'background .2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,77,0,0.03)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'clamp(16px,3vw,40px)', flexWrap:'wrap' }}>
        {/* Number */}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', color:'var(--dim)', minWidth:'28px' }}>{s.num}</span>

        {/* Title */}
        <h3 style={{
          fontFamily:'var(--font-display), Clash Display, Arial Black, sans-serif',
          fontWeight:900, fontSize:'clamp(28px,4.5vw,60px)',
          letterSpacing:'-1px', color:'var(--bone)', lineHeight:.92,
          flex:'1', whiteSpace:'pre-line', margin:0,
          transition:'color .2s',
        }}>{s.title}</h3>

        {/* Timeline chip */}
        <span style={{
          fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'2px',
          color:s.color, border:`1px solid ${s.color}`,
          padding:'5px 14px', borderRadius:'100px', whiteSpace:'nowrap',
          background:`${s.color}12`,
        }}>{s.time}</span>

        {/* Expand toggle */}
        <div style={{
          width:'32px', height:'32px', borderRadius:'50%', flexShrink:0,
          border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition:'transform .3s cubic-bezier(.23,1,.32,1)',
          color:'var(--muted)',
        }}>+</div>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: open ? '300px' : '0',
        overflow:'hidden',
        transition:'max-height .5s cubic-bezier(.23,1,.32,1)',
      }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'clamp(20px,4vw,60px)', paddingTop:'24px', paddingLeft:'calc(28px + clamp(16px,3vw,40px))' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.5vw,17px)', fontStyle:'italic', color:'var(--muted)', lineHeight:1.75, margin:0 }}>{s.desc}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'7px', alignContent:'flex-start', maxWidth:'280px' }}>
            {s.tags.map(t => (
              <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1.5px', color:'var(--dim)', border:'1px solid var(--border)', padding:'4px 10px', borderRadius:'100px', whiteSpace:'nowrap' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ padding:'clamp(60px,10vh,120px) clamp(20px,6vw,80px) clamp(40px,6vh,80px)', maxWidth:'1400px', margin:'0 auto', position:'relative', overflow:'hidden' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px', color:'var(--orange)', display:'block', marginBottom:'24px' }}>✦ EXPERTISE</span>
        <h1 style={{
          fontFamily:'var(--font-display), Clash Display, Arial Black, sans-serif',
          fontWeight:900, fontSize:'clamp(52px,13vw,160px)',
          letterSpacing:'-3px', color:'var(--bone)', lineHeight:.82,
          textTransform:'uppercase', margin:'0 0 32px',
        }}>
          Building Brands<br/>
          <span style={{ color:'var(--orange)', fontFamily:'Cormorant Garamond, Georgia, serif', fontStyle:'italic', fontWeight:600, textTransform:'none', letterSpacing:'-2px' }}>that mean</span><br/>
          Something.
        </h1>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.6vw,18px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'480px', lineHeight:1.75, margin:0 }}>
            Seven years. Five brands built from scratch. One creative director who does strategy, design, AI production, and code — all under one roof.
          </p>
          <div style={{ display:'flex', gap:'12px' }}>
            <Link href="/contact" style={{ fontFamily:'Clash Display, Arial Black, sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', background:'var(--orange)', color:'var(--ink)', padding:'13px 28px', borderRadius:'2px', whiteSpace:'nowrap' }}>
              Start a Project →
            </Link>
            <Link href="/credentials" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', border:'1px solid var(--border)', color:'var(--muted)', padding:'13px 20px', borderRadius:'2px', whiteSpace:'nowrap' }}>
              Download PDF ↓
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ background:'var(--orange)', padding:'clamp(20px,3vh,28px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth:'1400px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0' }}>
          {[['7+','Years Experience'],['100+','Brands Touched'],['5','Built from Scratch'],['100%','Client Retention']].map(([n, l]) => (
            <div key={l} style={{ padding:'8px 0', borderRight:'1px solid rgba(0,0,0,0.15)', textAlign:'center' }}>
              <div style={{ fontFamily:`'Barlow Condensed', 'Clash Display', sans-serif`, fontWeight:900, fontSize:'clamp(28px,5vw,56px)', color:'#080808', lineHeight:1, letterSpacing:'-2px' }}>{n}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'2px', color:'rgba(0,0,0,0.55)', marginTop:'3px' }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ACCORDION ── */}
      <section style={{ padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth:'1400px', margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(40px,6vh,64px)', flexWrap:'wrap', gap:'16px' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px', color:'var(--orange)' }}>✦ WHAT I DO</span>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontStyle:'italic', color:'var(--dim)' }}>Click any service to expand →</p>
        </div>
        <div style={{ borderTop:'1px solid var(--border)' }}>
          {SERVICES.map((s, i) => <ServiceRow key={s.num} s={s} i={i}/>)}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth:'1400px', margin:'0 auto' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px', color:'var(--orange)', display:'block', marginBottom:'40px' }}>✦ HOW IT WORKS</span>
          <h2 style={{ fontFamily:'var(--font-display), Clash Display, Arial Black, sans-serif', fontWeight:900, fontSize:'clamp(40px,8vw,100px)', letterSpacing:'-2px', color:'var(--bone)', textTransform:'uppercase', lineHeight:.85, marginBottom:'60px' }}>
            The Process.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap:'clamp(24px,4vw,48px)' }}>
            {PROCESS.map(p => (
              <div key={p.num}>
                <div style={{ fontFamily:`'Barlow Condensed', 'Clash Display', sans-serif`, fontWeight:900, fontSize:'clamp(56px,8vw,100px)', color:'var(--orange)', lineHeight:1, letterSpacing:'-3px', marginBottom:'16px', opacity:.85 }}>{p.num}</div>
                <h3 style={{ fontFamily:'Clash Display, Arial Black, sans-serif', fontWeight:700, fontSize:'clamp(18px,2vw,24px)', letterSpacing:'-0.5px', color:'var(--bone)', marginBottom:'10px' }}>{p.title}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic', color:'var(--muted)', lineHeight:1.7, margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS STRIP ── */}
      <section style={{ padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth:'1400px', margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'48px', flexWrap:'wrap', gap:'24px' }}>
          <div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ CREDENTIALS</span>
            <h2 style={{ fontFamily:'var(--font-display), Clash Display, Arial Black, sans-serif', fontWeight:900, fontSize:'clamp(36px,6vw,80px)', letterSpacing:'-2px', color:'var(--bone)', textTransform:'uppercase', lineHeight:.88, margin:0 }}>
              Who I&apos;ve<br/>Worked With.
            </h2>
          </div>
          <Link href="/credentials" style={{
            display:'inline-flex', alignItems:'center', gap:'10px',
            fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase',
            border:'1px solid var(--border)', color:'var(--muted)', padding:'13px 24px', borderRadius:'2px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M7 9L4 6M7 9l3-3M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Credentials PDF
          </Link>
        </div>

        {/* Client list */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'48px' }}>
          {CLIENTS.map(c => (
            <span key={c} style={{ fontFamily:'Clash Display, Arial Black, sans-serif', fontWeight:600, fontSize:'clamp(13px,1.8vw,18px)', letterSpacing:'-0.5px', color:'var(--bone)', background:'var(--surface)', border:'1px solid var(--border)', padding:'10px 20px', borderRadius:'4px' }}>{c}</span>
          ))}
        </div>

        {/* Tools grid */}
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--orange)', marginBottom:'16px' }}>TOOLS & STACK</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {['Adobe Suite','Figma','Midjourney v6.1','Veo3','Seedance','ElevenLabs','Kling 2.5','Runway ML','Flux','Ideogram','CapCut','After Effects','Next.js','React','TypeScript','Firebase','Vercel'].map(t => (
              <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px', color:'var(--dim)', border:'1px solid var(--border)', padding:'5px 12px', borderRadius:'100px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--ink)', borderTop:'1px solid var(--border)', padding:'clamp(80px,12vh,140px) clamp(20px,6vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'4px', color:'var(--orange)', display:'block', marginBottom:'24px' }}>✦ READY TO BUILD?</span>
        <h2 style={{ fontFamily:'var(--font-display), Clash Display, Arial Black, sans-serif', fontWeight:900, fontSize:'clamp(48px,12vw,140px)', letterSpacing:'-4px', color:'var(--bone)', textTransform:'uppercase', lineHeight:.82, marginBottom:'40px' }}>
          LET&apos;S MAKE<br/>
          <span style={{ color:'var(--orange)', fontFamily:'Cormorant Garamond, Georgia, serif', fontStyle:'italic', fontWeight:600, textTransform:'none', letterSpacing:'-3px' }}>Something</span><br/>
          GREAT.
        </h2>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contact" style={{ fontFamily:'Clash Display, Arial Black, sans-serif', fontWeight:600, fontSize:'12px', letterSpacing:'2px', textTransform:'uppercase', background:'var(--orange)', color:'var(--ink)', padding:'16px 40px', borderRadius:'2px' }}>
            Start a Project →
          </Link>
          <a href="https://wa.me/971526776884?text=Hi%20Abhi%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', border:'1px solid var(--border)', color:'var(--muted)', padding:'16px 28px', borderRadius:'2px' }}>
            WhatsApp Me ↗
          </a>
        </div>
      </section>

      {/* Load Barlow Condensed */}
      <style>{`
        @media(max-width:560px){
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </main>
  )
}
