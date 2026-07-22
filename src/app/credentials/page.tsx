'use client'

export default function CredentialsPage() {
  const print = () => window.print()

  return (
    <>
      {/* ── Screen: Download button ── */}
      <div className="screen-only" style={{
        position:'fixed', top:'16px', right:'16px', zIndex:100,
        display:'flex', gap:'10px',
      }}>
        <a href="/services" style={{ fontFamily:'monospace', fontSize:'11px', letterSpacing:'2px', color:'#8a8070', border:'1px solid #1e1e1e', padding:'10px 16px', borderRadius:'2px', textDecoration:'none' }}>
          ← Back
        </a>
        <button onClick={print} style={{
          fontFamily:'monospace', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase',
          background:'#ff4d00', color:'#080808', border:'none', padding:'10px 20px',
          borderRadius:'2px', cursor:'pointer', fontWeight:700,
        }}>
          ↓ Save as PDF
        </button>
      </div>

      {/* ── A4 Credentials Document ── */}
      <div className="credentials-page" style={{
        width:'210mm', minHeight:'297mm', margin:'0 auto',
        background:'#080808', color:'#ede8dd',
        fontFamily:'DM Sans, sans-serif',
        padding:'0',
        boxShadow:'0 20px 80px rgba(0,0,0,0.5)',
      }}>

        {/* Top bar */}
        <div style={{ height:'5px', background:'#ff4d00' }}/>

        {/* Header */}
        <div style={{ padding:'36px 44px 28px', borderBottom:'1px solid #1e1e1e', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
              <div style={{ width:'36px', height:'36px', background:'#ff4d00', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'16px', color:'#080808', borderRadius:'3px', flexShrink:0 }}>A</div>
              <span style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'4px', color:'#8a8070' }}>DESIGNAERIUM</span>
            </div>
            <div style={{ fontFamily:'Barlow Condensed, Clash Display, Arial Black, sans-serif', fontWeight:900, fontSize:'36px', color:'#ede8dd', letterSpacing:'-1px', lineHeight:1.05 }}>Abhijeeth Subhash</div>
            <div style={{ fontSize:'13px', color:'#ff4d00', marginTop:'5px', letterSpacing:'1px' }}>Senior Creative Designer · Dubai, UAE</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'2px', color:'#4a4a4a', marginBottom:'6px' }}>adesignaerium.com</div>
            <div style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'1px', color:'#4a4a4a', marginBottom:'4px' }}>abhijeethpiyush4@gmail.com</div>
            <div style={{ fontFamily:'monospace', fontSize:'9px', letterSpacing:'1px', color:'#4a4a4a' }}>+971 52 677 6884</div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ padding:'16px 44px', background:'#0d0d0d', borderBottom:'1px solid #1e1e1e' }}>
          <p style={{ fontSize:'13px', fontStyle:'italic', color:'#8a8070', margin:0, lineHeight:1.6 }}>
            "If it looks average, I didn't make it." — 7+ years turning brands into visual worlds across the UAE and GCC.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid #1e1e1e' }}>
          {[['7+','Years'],['100+','Brands'],['50+','Projects'],['100%','Delivery']].map(([n,l]) => (
            <div key={l} style={{ padding:'18px 16px', textAlign:'center', borderRight:'1px solid #1e1e1e' }}>
              <div style={{ fontFamily:'Barlow Condensed, Clash Display, sans-serif', fontWeight:900, fontSize:'30px', color:'#ff4d00', letterSpacing:'-1px', lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'2.5px', color:'#4a4a4a', marginTop:'3px' }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Services + Tools */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #1e1e1e' }}>
          {/* Services */}
          <div style={{ padding:'22px 28px', borderRight:'1px solid #1e1e1e' }}>
            <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'14px' }}>SERVICES</div>
            {['Brand Identity & Strategy','UI/UX & Web Design','AI Video Production','AI Creative Direction','Packaging & Print','Motion & Social Content','Photography & Art Direction'].map(s => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 0', borderBottom:'1px solid #141414' }}>
                <span style={{ width:'4px', height:'4px', background:'#ff4d00', borderRadius:'50%', flexShrink:0 }}/>
                <span style={{ fontSize:'11px', color:'#ede8dd' }}>{s}</span>
              </div>
            ))}
          </div>
          {/* Tools */}
          <div style={{ padding:'22px 28px' }}>
            <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'14px' }}>TOOLS & STACK</div>
            {['Adobe Suite (Ps Ai Id Ae Lr Pr)','Figma · Prototyping · Design Systems','Midjourney v6.1 · Flux · Ideogram','Veo3 · Seedance · Kling 2.5','ElevenLabs · Suno · Adobe Podcast AI','CapCut · Premiere Pro · After Effects','Next.js · React · TypeScript · Firebase'].map(t => (
              <div key={t} style={{ padding:'6px 0', borderBottom:'1px solid #141414', fontFamily:'monospace', fontSize:'10px', color:'#8a8070' }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Featured Work */}
        <div style={{ padding:'22px 28px', borderBottom:'1px solid #1e1e1e' }}>
          <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'16px' }}>FEATURED WORK</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px' }}>
            {[
              {name:'SIPPLE',cat:'Branding · UI/UX · App'},
              {name:'MAISON VALÉR',cat:'Luxury · Editorial'},
              {name:'ECORA',cat:'Sustainable · Brand'},
              {name:'KROSSOVER GIFTS',cat:'E-Commerce · Creative Direction'},
              {name:'AI CREATIVE DIRECTION',cat:'Midjourney · Veo3'},
            ].map(w => (
              <div key={w.name} style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:'4px', padding:'10px 10px' }}>
                <div style={{ fontFamily:'monospace', fontSize:'8px', fontWeight:700, color:'#ede8dd', letterSpacing:'0.5px', lineHeight:1.3, marginBottom:'4px' }}>{w.name}</div>
                <div style={{ fontFamily:'monospace', fontSize:'7px', color:'#4a4a4a', letterSpacing:'0.3px' }}>{w.cat}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Social */}
        <div style={{ padding:'22px 28px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'12px' }}>CONTACT</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              {['abhijeethpiyush4@gmail.com','+971 52 677 6884','adesignaerium.com','linkedin.com/in/abhijeethsubhash','behance.net/abhijeeth-subhash','@wonderartmedia'].map(c => (
                <div key={c} style={{ fontFamily:'monospace', fontSize:'9px', color:'#8a8070', letterSpacing:'0.5px' }}>{c}</div>
              ))}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:'Barlow Condensed, Clash Display, sans-serif', fontWeight:900, fontSize:'22px', color:'#ff4d00', letterSpacing:'-1px', lineHeight:1 }}>AVAILABLE</div>
            <div style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'2px', color:'#4a4a4a', marginTop:'3px' }}>FOR NEW PROJECTS</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height:'2px', background:'#1e1e1e' }}/>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&display=swap');

        body { background:#111; }

        .credentials-page {
          margin: 40px auto;
        }

        .screen-only { display:flex; }

        @media print {
          .screen-only { display:none !important; }
          body { background:#080808 !important; margin:0; padding:0; }
          .credentials-page {
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            min-height: 100vh !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
