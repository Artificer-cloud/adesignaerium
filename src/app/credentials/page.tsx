'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

// A4 at 96dpi = 794 × 1123px
const DOC_W = 794
const DOC_H = 1123

export default function CredentialsPage() {
  const [scale,     setScale]    = useState(1)
  const wrapperRef               = useRef<HTMLDivElement>(null)

  // Hide site chrome
  useEffect(() => {
    document.body.classList.add('pdf-mode')
    document.body.style.background = '#d0cbc4'
    return () => {
      document.body.classList.remove('pdf-mode')
      document.body.style.background = ''
    }
  }, [])

  // Scale to fit viewport
  useEffect(() => {
    const calc = () => {
      const pad    = 24
      const avail  = window.innerWidth - pad
      const next   = avail < DOC_W ? avail / DOC_W : 1
      setScale(next)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const save = () => window.print()

  return (
    <>
      {/* ── Toolbar (screen only) ── */}
      <div className="no-print" style={{
        position:'fixed', top:0, left:0, right:0, zIndex:9999,
        background:'rgba(8,8,8,0.96)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid #1e1e1e',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'10px 16px', gap:'8px',
      }}>
        <Link href="/services" style={{
          fontFamily:'monospace', fontSize:'10px', letterSpacing:'2px',
          color:'#8a8070', textDecoration:'none',
          border:'1px solid #1e1e1e', padding:'7px 14px', borderRadius:'2px',
          whiteSpace:'nowrap',
        }}>← Back</Link>

        <span style={{
          fontFamily:'monospace', fontSize:'9px', letterSpacing:'2px',
          color:'#4a4a4a', display:'none',
        }} className="label-md">CREDENTIALS · A4</span>

        <button onClick={save} style={{
          fontFamily:'monospace', fontSize:'10px', letterSpacing:'2px',
          textTransform:'uppercase', background:'#ff4d00', color:'#080808',
          border:'none', padding:'7px 16px', borderRadius:'2px',
          cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:'6px',
          whiteSpace:'nowrap',
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M7 9L4 6M7 9l3-3M1 12h12" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Save PDF
        </button>
      </div>

      {/* ── Scaled A4 wrapper ── */}
      <div style={{
        paddingTop: '56px',
        paddingBottom: '40px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Outer container — sized to match the SCALED document */}
        <div ref={wrapperRef} style={{
          width:  DOC_W * scale,
          height: DOC_H * scale,
          position: 'relative',
          flexShrink: 0,
        }}>
          {/* The actual document — full size, then scaled via transform */}
          <div id="pdf-doc" style={{
            width:  DOC_W,
            height: DOC_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: '#ffffff',
            color: '#080808',
            fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif",
            boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            position: 'absolute',
            top: 0, left: 0,
          }}>

            {/* Orange top bar */}
            <div style={{ height:'5px', background:'#ff4d00' }}/>

            {/* HEADER */}
            <div style={{ padding:'28px 36px 22px', borderBottom:'1px solid #e8e0d5', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                  <div style={{ width:'30px', height:'30px', background:'#ff4d00', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Clash Display',Arial Black,sans-serif", fontWeight:700, fontSize:'13px', color:'#fff', borderRadius:'3px' }}>A</div>
                  <span style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'4px', color:'#8a8070' }}>DESIGNAERIUM</span>
                </div>
                <h1 style={{ fontFamily:"'Clash Display',Arial Black,sans-serif", fontWeight:700, fontSize:'34px', color:'#080808', letterSpacing:'-1.5px', lineHeight:1, margin:'0 0 6px' }}>Abhijeeth Subhash</h1>
                <p style={{ fontFamily:'monospace', fontSize:'11px', color:'#ff4d00', letterSpacing:'1px', margin:0 }}>Senior Creative Designer · Dubai, UAE</p>
              </div>
              <div style={{ textAlign:'right' }}>
                {['adesignaerium.com','abhijeethpiyush4@gmail.com','+971 52 677 6884'].map(c => (
                  <div key={c} style={{ fontFamily:'monospace', fontSize:'8px', color:'#6a6060', letterSpacing:'0.5px', marginBottom:'4px' }}>{c}</div>
                ))}
              </div>
            </div>

            {/* TAGLINE */}
            <div style={{ padding:'13px 36px', background:'#faf8f5', borderBottom:'1px solid #e8e0d5' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:'italic', fontSize:'13px', color:'#6a6060', margin:0, lineHeight:1.6 }}>
                "If it looks average, I didn&apos;t make it." — 7+ years turning brands into visual worlds across the UAE and GCC.
              </p>
            </div>

            {/* STATS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid #e8e0d5' }}>
              {[['7+','Years'],['100+','Brands'],['50+','Projects'],['100%','Delivery']].map(([n,l]) => (
                <div key={l} style={{ padding:'16px 10px', textAlign:'center', borderRight:'1px solid #e8e0d5' }}>
                  <div style={{ fontFamily:"'Clash Display',Arial Black,sans-serif", fontWeight:700, fontSize:'26px', color:'#ff4d00', letterSpacing:'-1px', lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'2.5px', color:'#aaa098', marginTop:'2px' }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* SERVICES + TOOLS */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ padding:'18px 24px', borderRight:'1px solid #e8e0d5' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'12px' }}>SERVICES</div>
                {['Brand Identity & Strategy','UI/UX & Web Design','AI Video Production','AI Creative Direction','Packaging & Print','Motion & Social Content','Photography & Art Direction'].map(s => (
                  <div key={s} style={{ display:'flex', alignItems:'center', gap:'7px', padding:'5px 0', borderBottom:'1px solid #f0ece6' }}>
                    <span style={{ width:'3px', height:'3px', background:'#ff4d00', borderRadius:'50%', flexShrink:0 }}/>
                    <span style={{ fontSize:'10px', color:'#080808' }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding:'18px 24px' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'12px' }}>TOOLS & STACK</div>
                {['Adobe Suite (Ps Ai Id Ae Lr Pr)','Figma · Prototyping · Design Systems','Midjourney v6.1 · Flux · Ideogram','Veo3 · Seedance · Kling 2.5','ElevenLabs · Suno · Adobe Podcast AI','CapCut · Premiere Pro · After Effects','Next.js · React · TypeScript · Firebase'].map(t => (
                  <div key={t} style={{ padding:'5px 0', borderBottom:'1px solid #f0ece6', fontFamily:'monospace', fontSize:'9px', color:'#6a6060' }}>{t}</div>
                ))}
              </div>
            </div>

            {/* FEATURED WORK */}
            <div style={{ padding:'16px 24px', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'12px' }}>FEATURED WORK</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'6px' }}>
                {[
                  {name:'SIPPLE',               cat:'Branding · UI/UX · App'},
                  {name:'MAISON VALÉR',          cat:'Luxury · Editorial'},
                  {name:'ECORA',                 cat:'Sustainable · Brand'},
                  {name:'KROSSOVER GIFTS',       cat:'E-Commerce · Creative'},
                  {name:'AI CREATIVE DIRECTION', cat:'Midjourney · Veo3'},
                ].map(w => (
                  <div key={w.name} style={{ background:'#faf8f5', border:'1px solid #e8e0d5', borderRadius:'3px', padding:'9px 8px' }}>
                    <div style={{ fontFamily:'monospace', fontSize:'7px', fontWeight:700, color:'#080808', lineHeight:1.3, marginBottom:'3px' }}>{w.name}</div>
                    <div style={{ fontFamily:'monospace', fontSize:'6.5px', color:'#aaa098' }}>{w.cat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT + AVAILABLE */}
            <div style={{ padding:'18px 24px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <div>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'10px' }}>CONTACT</div>
                {['abhijeethpiyush4@gmail.com','+971 52 677 6884','adesignaerium.com','linkedin.com/in/abhijeethsubhash','behance.net/abhijeeth-subhash','@wonderartmedia'].map(c => (
                  <div key={c} style={{ fontFamily:'monospace', fontSize:'8.5px', color:'#6a6060', letterSpacing:'0.3px', marginBottom:'3px' }}>{c}</div>
                ))}
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:"'Clash Display',Arial Black,sans-serif", fontWeight:700, fontSize:'24px', color:'#ff4d00', letterSpacing:'-0.5px', lineHeight:1 }}>AVAILABLE</div>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'2px', color:'#aaa098', marginTop:'2px' }}>FOR NEW PROJECTS</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ height:'3px', background:'#e8e0d5' }}/>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #ffffff !important; padding: 0 !important; }
          #pdf-doc {
            transform: none !important;
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            position: static !important;
          }
          div[ref] { width: 100% !important; height: auto !important; }
        }
        @media (min-width: 500px) {
          .label-md { display: block !important; }
        }
      `}</style>
    </>
  )
}
