'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

type GalleryImage = {
  id:       string
  src:      string
  alt:      string
  category: string
  width:    number
  height:   number
}

function GalleryCard({ item, index, onOpen }: { item: GalleryImage; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Alternating sizes for editorial feel
  const isFeatured = index % 7 === 0

  return (
    <div
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:    'relative',
        overflow:    'hidden',
        cursor:      'pointer',
        background:  'var(--surface)',
        aspectRatio: isFeatured ? '4/3' : '1/1',
        gridColumn:  isFeatured ? 'span 2' : 'span 1',
        opacity:     vis ? 1 : 0,
        transform:   vis ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition:  `opacity .8s cubic-bezier(.23,1,.32,1) ${(index % 6) * 0.07}s, transform .8s cubic-bezier(.23,1,.32,1) ${(index % 6) * 0.07}s`,
      }}
    >
      {/* Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
        style={{
          objectFit:  'cover',
          transition: 'transform .8s cubic-bezier(.23,1,.32,1)',
          transform:  hov ? 'scale(1.08)' : 'scale(1)',
        }}
        onError={() => {}}
      />

      {/* Dark overlay — slides up on hover */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, transparent 100%)',
        opacity:    hov ? 1 : 0,
        transition: 'opacity .5s cubic-bezier(.23,1,.32,1)',
      }}/>

      {/* Content that appears on hover */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        padding:    'clamp(16px,2vw,28px)',
        transform:  hov ? 'translateY(0)' : 'translateY(16px)',
        opacity:    hov ? 1 : 0,
        transition: 'all .4s cubic-bezier(.23,1,.32,1)',
      }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'6px', textTransform:'uppercase' }}>
          {item.category}
        </span>
        <p style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600, fontSize:'clamp(16px,2vw,22px)', color:'var(--bone)', letterSpacing:'-0.5px', lineHeight:1.1 }}>
          {item.alt}
        </p>
        <div style={{ width:'24px', height:'2px', background:'var(--orange)', marginTop:'10px', borderRadius:'2px' }}/>
      </div>

      {/* Top-left category dot — always visible */}
      <div style={{
        position:   'absolute',
        top:        '14px',
        left:       '14px',
        display:    'flex',
        alignItems: 'center',
        gap:        '6px',
        opacity:    hov ? 0 : 1,
        transition: 'opacity .3s',
      }}>
        <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--orange)', display:'block', flexShrink:0 }}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'2px', color:'rgba(255,255,255,0.7)', textTransform:'uppercase' }}>
          {item.category}
        </span>
      </div>

      {/* Arrow icon on hover top-right */}
      <div style={{
        position:   'absolute',
        top:        '14px',
        right:      '14px',
        width:      '32px',
        height:     '32px',
        borderRadius: '50%',
        background: 'rgba(255,77,0,0.9)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:    hov ? 1 : 0,
        transform:  hov ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-45deg)',
        transition: 'all .4s cubic-bezier(.23,1,.32,1)',
      }}>
        <span style={{ color:'var(--ink)', fontSize:'14px', lineHeight:1 }}>↗</span>
      </div>
    </div>
  )
}

export default function VaultClient({ images }: { images: GalleryImage[] }) {
  const [active,   setActive]   = useState('All')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const catMap: Record<string, boolean> = {}
  images.forEach(img => { catMap[img.category] = true })
  const allCats = ['All', ...Object.keys(catMap).sort()]

  const filtered = active === 'All' ? images : images.filter(i => i.category === active)

  useEffect(() => {
    if (!lightbox) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') {
        const idx = filtered.findIndex(i => i.id === lightbox.id)
        setLightbox(filtered[(idx + 1) % filtered.length])
      } else if (e.key === 'ArrowLeft') {
        const idx = filtered.findIndex(i => i.id === lightbox.id)
        setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, filtered])

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh' }}>

      {/* Header */}
      <section style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth:'1600px', margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ THE VAULT</span>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px', marginBottom:'32px' }}>
          <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(44px,10vw,120px)', letterSpacing:'-4px', color:'var(--bone)', lineHeight:.88, margin:0 }}>
            VISUAL<br/>
            <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)' }}>Archives.</span>
          </h1>
          <div style={{ textAlign:'right' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,16px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'320px', lineHeight:1.7, marginBottom:'8px' }}>
              Raw visuals, photography, hand-painted work, AI art.
            </p>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>
              {filtered.length} {active === 'All' ? 'images' : active.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {allCats.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
              textTransform:'uppercase', padding:'8px 20px', borderRadius:'100px',
              cursor:'pointer', transition:'all .3s cubic-bezier(.23,1,.32,1)',
              background: active===cat ? 'var(--orange)' : 'transparent',
              color:      active===cat ? 'var(--ink)'    : 'var(--muted)',
              border:     active===cat ? '1px solid var(--orange)' : '1px solid var(--border)',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Grid */}
      <section style={{ padding:'0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1600px', margin:'0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--dim)', letterSpacing:'2px' }}>ADD WEBP IMAGES TO /public/images/gallery/</p>
          </div>
        ) : (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 'clamp(6px,0.8vw,10px)',
            alignItems:          'start',
          }}>
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onOpen={() => setLightbox(item)} />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed', inset:0, zIndex:9990, background:'rgba(8,8,8,0.97)', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(20px,4vw,60px)' }}>
          <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'24px', right:'24px', background:'transparent', border:'none', color:'var(--bone)', fontSize:'24px', cursor:'pointer', opacity:.6 }}>✕</button>
          <button onClick={e => { e.stopPropagation(); const idx=filtered.findIndex(i=>i.id===lightbox.id); setLightbox(filtered[(idx-1+filtered.length)%filtered.length]) }}
            style={{ position:'absolute', left:'clamp(12px,3vw,40px)', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--bone)', fontSize:'18px', cursor:'pointer', width:'44px', height:'44px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
          <button onClick={e => { e.stopPropagation(); const idx=filtered.findIndex(i=>i.id===lightbox.id); setLightbox(filtered[(idx+1)%filtered.length]) }}
            style={{ position:'absolute', right:'clamp(12px,3vw,40px)', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--bone)', fontSize:'18px', cursor:'pointer', width:'44px', height:'44px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:'min(90vw,1000px)', maxHeight:'90vh', borderRadius:'4px', overflow:'hidden' }}>
            <Image src={lightbox.src} alt={lightbox.alt} width={1080} height={1080}
              style={{ width:'100%', height:'auto', maxHeight:'85vh', objectFit:'contain', display:'block' }}
              onError={() => {}}
            />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 24px', background:'linear-gradient(transparent,rgba(8,8,8,0.95))' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--orange)', textTransform:'uppercase' }}>{lightbox.category}</span>
              <p style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600, fontSize:'clamp(16px,2vw,22px)', color:'var(--bone)', marginTop:'4px', letterSpacing:'-0.5px' }}>{lightbox.alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
