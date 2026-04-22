'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { projects, categories } from '@/lib/projects'

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category.includes(active))

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh' }}>
      <section style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth:'1400px', margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ SELECTED WORK</span>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px', marginBottom:'32px' }}>
          <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(44px,10vw,120px)', letterSpacing:'-4px', color:'var(--bone)', lineHeight:.88, margin:0 }}>
            THE<br/><span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)' }}>Work.</span>
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,16px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'300px', lineHeight:1.7 }}>
            Branding, UI/UX, AI visual, packaging, motion — built from scratch, shipped to production.
          </p>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', padding:'8px 20px', borderRadius:'100px', cursor:'pointer', transition:'all .3s cubic-bezier(.23,1,.32,1)', background:active===cat?'var(--orange)':'transparent', color:active===cat?'var(--ink)':'var(--muted)', border:active===cat?'1px solid var(--orange)':'1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding:'0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'10px' }}>
          {filtered.map((p, i) => (
            <Link key={p.id} href={`/work/${p.id}`} className="project-card"
              style={{ background:p.color||'#1a1a1a', border:'1px solid var(--border)', borderRadius:'6px', minHeight:'clamp(240px,30vw,360px)', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden', opacity:0, animation:`fadeUp .8s cubic-bezier(.23,1,.32,1) ${.05+i*.07}s forwards` }}>
              {p.coverImage && (
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <Image src={p.coverImage} alt={p.title} fill style={{ objectFit:'cover', objectPosition:'center', opacity:0.25 }} onError={()=>{}}/>
                  <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,${p.color||'#1a1a1a'} 65%)` }}/>
                </div>
              )}
              <div style={{ position:'relative', zIndex:1, padding:'clamp(20px,2.5vw,28px)', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                  {p.category.map(cat => (
                    <span key={cat} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'2px', color:'var(--orange)', background:'rgba(255,77,0,0.08)', border:'1px solid rgba(255,77,0,0.2)', padding:'3px 8px', borderRadius:'2px' }}>{cat}</span>
                  ))}
                </div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'18px', color:'var(--dim)' }}>↗</span>
              </div>
              <div style={{ position:'relative', zIndex:1, padding:'0 clamp(20px,2.5vw,28px) clamp(20px,2.5vw,28px)' }}>
                <h2 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(22px,3.5vw,42px)', letterSpacing:'-1.5px', color:'var(--bone)', lineHeight:.9, marginBottom:'8px' }}>{p.title}</h2>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(12px,1.2vw,14px)', color:'var(--dim)', lineHeight:1.6, fontStyle:'italic' }}>{p.description}</p>
                <div style={{ display:'flex', gap:'12px', marginTop:'12px', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px', color:'var(--dim)' }}>{p.year}</span>
                  <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'var(--dim)', flexShrink:0 }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px', color:'var(--dim)' }}>{p.client}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
