'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function CredentialsPage() {

  // Hide navbar, chat, cursor while on this page
  useEffect(() => {
    document.body.classList.add('pdf-mode')
    document.body.style.background = '#e5e5e5'
    return () => {
      document.body.classList.remove('pdf-mode')
      document.body.style.background = ''
    }
  }, [])

  const save = () => window.print()

  return (
    <>
      {/* ── Screen-only toolbar ── */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, zIndex:9999,
        background:'rgba(8,8,8,0.95)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid #1e1e1e',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 24px',
      }} className="no-print">
        <Link href="/services" style={{
          fontFamily:'monospace', fontSize:'11px', letterSpacing:'2px',
          color:'#8a8070', textDecoration:'none',
          display:'flex', alignItems:'center', gap:'8px',
          border:'1px solid #1e1e1e', padding:'8px 16px', borderRadius:'2px',
          transition:'all .2s',
        }}>
          ← BACK TO SERVICES
        </Link>
        <span style={{
          fontFamily:'monospace', fontSize:'10px', letterSpacing:'3px',
          color:'#4a4a4a',
        }}>CREDENTIALS · A4 FORMAT</span>
        <button onClick={save} style={{
          fontFamily:'monospace', fontSize:'11px', letterSpacing:'2px',
          textTransform:'uppercase', background:'#ff4d00', color:'#080808',
          border:'none', padding:'8px 20px', borderRadius:'2px',
          cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:'8px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M7 9L4 6M7 9l3-3M1 12h12" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Save as PDF
        </button>
      </div>

      {/* ── A4 Page wrapper ── */}
      <div style={{ paddingTop:'60px', paddingBottom:'60px', minHeight:'100vh' }} className="no-print-padding">
        <div id="pdf-doc" style={{
          width:'210mm',
          minHeight:'297mm',
          margin:'0 auto',
          background:'#ffffff',
          color:'#080808',
          fontFamily:"'DM Sans', 'Helvetica Neue', Arial, sans-serif",
          boxShadow:'0 8px 40px rgba(0,0,0,0.2)',
          position:'relative',
          overflow:'hidden',
        }}>

          {/* Orange top bar */}
          <div style={{ height:'5px', background:'#ff4d00', width:'100%' }}/>

          {/* ── HEADER ── */}
          <div style={{
            padding:'32px 40px 24px',
            borderBottom:'1px solid #e8e0d5',
            display:'flex', justifyContent:'space-between', alignItems:'flex-start',
          }}>
            <div>
              {/* Logo mark */}
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                <div style={{
                  width:'32px', height:'32px', background:'#ff4d00',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:"'Clash Display', Arial Black, sans-serif",
                  fontWeight:700, fontSize:'15px', color:'#ffffff', borderRadius:'3px',
                }}>A</div>
                <span style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'4px', color:'#8a8070' }}>
                  DESIGNAERIUM
                </span>
              </div>
              {/* Name */}
              <h1 style={{
                fontFamily:"'Clash Display', Arial Black, sans-serif",
                fontWeight:700, fontSize:'38px', color:'#080808',
                letterSpacing:'-1.5px', lineHeight:1, margin:'0 0 8px',
              }}>Abhijeeth Subhash</h1>
              <p style={{
                fontFamily:'monospace', fontSize:'12px', color:'#ff4d00',
                letterSpacing:'1px', margin:0,
              }}>Senior Creative Designer · Dubai, UAE</p>
            </div>
            {/* Contact right */}
            <div style={{ textAlign:'right' }}>
              {[
                'adesignaerium.com',
                'abhijeethpiyush4@gmail.com',
                '+971 52 677 6884',
              ].map(c => (
                <div key={c} style={{
                  fontFamily:'monospace', fontSize:'9px',
                  color:'#6a6060', letterSpacing:'0.5px', marginBottom:'5px',
                }}>{c}</div>
              ))}
            </div>
          </div>

          {/* ── TAGLINE ── */}
          <div style={{ padding:'16px 40px', background:'#faf8f5', borderBottom:'1px solid #e8e0d5' }}>
            <p style={{
              fontFamily:"'Cormorant Garamond', 'Georgia', serif",
              fontStyle:'italic', fontSize:'14px', color:'#6a6060',
              margin:0, lineHeight:1.6,
            }}>
              "If it looks average, I didn't make it." — 7+ years turning brands into visual worlds across the UAE and GCC.
            </p>
          </div>

          {/* ── STATS ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid #e8e0d5' }}>
            {[['7+','Years'],['100+','Brands'],['50+','Projects'],['100%','Delivery']].map(([n,l]) => (
              <div key={l} style={{
                padding:'18px 12px', textAlign:'center',
                borderRight:'1px solid #e8e0d5',
              }}>
                <div style={{
                  fontFamily:"'Clash Display', Arial Black, sans-serif",
                  fontWeight:700, fontSize:'30px', color:'#ff4d00',
                  letterSpacing:'-1px', lineHeight:1,
                }}>{n}</div>
                <div style={{
                  fontFamily:'monospace', fontSize:'8px', letterSpacing:'2.5px',
                  color:'#aaa098', marginTop:'3px',
                }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* ── SERVICES + TOOLS ── */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5' }}>
            {/* Services */}
            <div style={{ padding:'22px 28px', borderRight:'1px solid #e8e0d5' }}>
              <div style={{
                fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px',
                color:'#ff4d00', marginBottom:'14px',
              }}>SERVICES</div>
              {[
                'Brand Identity & Strategy',
                'UI/UX & Web Design',
                'AI Video Production',
                'AI Creative Direction',
                'Packaging & Print',
                'Motion & Social Content',
                'Photography & Art Direction',
              ].map(s => (
                <div key={s} style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  padding:'6px 0', borderBottom:'1px solid #f0ece6',
                }}>
                  <span style={{ width:'4px', height:'4px', background:'#ff4d00', borderRadius:'50%', flexShrink:0 }}/>
                  <span style={{ fontSize:'11px', color:'#080808', fontFamily:"'DM Sans', sans-serif" }}>{s}</span>
                </div>
              ))}
            </div>
            {/* Tools */}
            <div style={{ padding:'22px 28px' }}>
              <div style={{
                fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px',
                color:'#ff4d00', marginBottom:'14px',
              }}>TOOLS & STACK</div>
              {[
                'Adobe Suite (Ps Ai Id Ae Lr Pr)',
                'Figma · Prototyping · Design Systems',
                'Midjourney v6.1 · Flux · Ideogram',
                'Veo3 · Seedance · Kling 2.5',
                'ElevenLabs · Suno · Adobe Podcast AI',
                'CapCut · Premiere Pro · After Effects',
                'Next.js · React · TypeScript · Firebase',
              ].map(t => (
                <div key={t} style={{
                  padding:'6px 0', borderBottom:'1px solid #f0ece6',
                  fontFamily:'monospace', fontSize:'9px', color:'#6a6060',
                }}>{t}</div>
              ))}
            </div>
          </div>

          {/* ── FEATURED WORK ── */}
          <div style={{ padding:'20px 28px', borderBottom:'1px solid #e8e0d5' }}>
            <div style={{
              fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px',
              color:'#ff4d00', marginBottom:'14px',
            }}>FEATURED WORK</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px' }}>
              {[
                {name:'SIPPLE',        cat:'Branding · UI/UX · App'},
                {name:'MAISON VALÉR',  cat:'Luxury · Editorial'},
                {name:'ECORA',         cat:'Sustainable · Brand'},
                {name:'KROSSOVER',     cat:'E-Commerce · Creative Direction'},
                {name:'AI CREATIVE DIRECTION', cat:'Midjourney · Veo3'},
              ].map(w => (
                <div key={w.name} style={{
                  background:'#faf8f5', border:'1px solid #e8e0d5',
                  borderRadius:'3px', padding:'10px 10px',
                }}>
                  <div style={{
                    fontFamily:'monospace', fontSize:'8px', fontWeight:700,
                    color:'#080808', letterSpacing:'0.5px', lineHeight:1.3,
                    marginBottom:'4px',
                  }}>{w.name}</div>
                  <div style={{
                    fontFamily:'monospace', fontSize:'7px', color:'#aaa098',
                    letterSpacing:'0.3px',
                  }}>{w.cat}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONTACT + AVAILABILITY ── */}
          <div style={{ padding:'22px 28px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div style={{
                fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px',
                color:'#ff4d00', marginBottom:'12px',
              }}>CONTACT</div>
              {[
                'abhijeethpiyush4@gmail.com',
                '+971 52 677 6884',
                'adesignaerium.com',
                'linkedin.com/in/abhijeethsubhash',
                'behance.net/abhijeeth-subhash',
                '@wonderartmedia',
              ].map(c => (
                <div key={c} style={{
                  fontFamily:'monospace', fontSize:'9px',
                  color:'#6a6060', letterSpacing:'0.5px', marginBottom:'4px',
                }}>{c}</div>
              ))}
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{
                fontFamily:"'Clash Display', Arial Black, sans-serif",
                fontWeight:700, fontSize:'28px', color:'#ff4d00',
                letterSpacing:'-1px', lineHeight:1,
              }}>AVAILABLE</div>
              <div style={{
                fontFamily:'monospace', fontSize:'8px', letterSpacing:'2px',
                color:'#aaa098', marginTop:'3px',
              }}>FOR NEW PROJECTS</div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ height:'3px', background:'#e8e0d5', width:'100%' }}/>
        </div>
      </div>

      <style>{`
        /* Hide toolbar and padding when printing */
        @media print {
          .no-print { display: none !important; }
          .no-print-padding { padding: 0 !important; }
          body { background: #ffffff !important; }
          #pdf-doc {
            width: 100% !important;
            min-height: 100vh !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
