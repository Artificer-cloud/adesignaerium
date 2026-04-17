'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { projects, categories } from '@/lib/projects'

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category.includes(active))

  return (
    <main style={{ paddingTop:'80px' }}>
      <section style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth:'1400px', margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ THE STUDIO WALL</span>
        <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(44px,10vw,120px)', letterSpacing:'-4px', color:'var(--bone)', lineHeight:.88, marginBottom:'16px' }}>
          ALL WORK
        </h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.6vw,18px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'480px', lineHeight:1.7, marginBottom:'32px' }}>
          7+ years of branding, UI/UX, AI design, motion, and creative direction.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', padding:'8px 16px', borderRadius:'2px', cursor:'pointer', transition:'all .3s', background:active===cat?'var(--orange)':'transparent', color:active===cat?'var(--ink)':'var(--muted)', border:active===cat?'1px solid var(--orange)':'1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div style={{ borderTop:'1px solid var(--border)', marginBottom:'40px' }} />

      <section style={{ padding:'0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'10px' }}>
          {filtered.map((project, i) => (
            <Link key={project.id} href={`/work/${project.id}`} className="project-card"
              style={{ background:project.color||'#1a1a1a', border:'1px solid var(--border)', borderRadius:'6px', minHeight:i%5===0?'clamp(320px,40vw,480px)':'clamp(240px,30vw,340px)', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>

              {/* Cover image */}
              {project.coverImage && (
                <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    style={{ objectFit:'cover', objectPosition:'center', opacity:0.35 }}
                    onError={() => {}}
                  />
                  <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ${project.color||'#1a1a1a'} 70%)` }}/>
                </div>
              )}

              <div style={{ position:'relative', zIndex:1, padding:'clamp(20px,2.5vw,28px)', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                    {project.category.slice(0,2).map(cat => (
                      <span key={cat} style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1.5px', color:'var(--orange)', background:'rgba(255,77,0,0.1)', border:'1px solid rgba(255,77,0,0.25)', padding:'3px 8px', borderRadius:'2px' }}>{cat.toUpperCase()}</span>
                    ))}
                  </div>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'18px', color:'var(--dim)' }}>↗</span>
                </div>
                <div>
                  <h2 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(22px,3.5vw,36px)', letterSpacing:'-1px', color:'var(--bone)', lineHeight:.95 }}>{project.title}</h2>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontStyle:'italic', color:'var(--muted)', marginTop:'8px', lineHeight:1.5 }}>{project.description}</p>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px', marginTop:'12px' }}>{project.year}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
