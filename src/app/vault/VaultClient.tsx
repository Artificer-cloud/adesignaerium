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

// Snap to nearest standard ratio
function getAspectRatio(w: number, h: number): string {
  const r = h / w
  if (r < 0.6)  return '16/9'   // wide landscape
  if (r < 0.85) return '4/3'    // standard landscape
  if (r < 1.15) return '1/1'    // square
  if (r < 1.5)  return '3/4'    // portrait
  return '9/16'                  // tall portrait (stories/reels)
}

function GalleryCard({ item, index, onOpen }: { item: GalleryImage; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)
  const ratio = getAspectRatio(item.width, item.height)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

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
        aspectRatio: ratio,
        borderRadius: '4px',
        opacity:     vis ? 1 : 0,
        transform:   vis ? 'translateY(0)' : 'translateY(28px)',
        transition:  `opacity .7s cubic-bezier(.23,1,.32,1) ${(index % 6) * 0.06}s, transform .7s cubic-bezier(.23,1,.32,1) ${(index % 6) * 0.06}s`,
      }}
    >
      {/* Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
        style={{
          objectFit:  'cover',
          objectPosition: 'center',
          transition: 'transform .7s cubic-bezier(.23,1,.32,1)',
          transform:  hov ? 'scale(1.07)' : 'scale(1)',
        }}
        onError={() => {}}
      />

      {/* Gradient overlay on hover */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.05) 100%)',
        opacity:    hov ? 1 : 0,
        transition: 'opacity .5s cubic-bezier(.23,1,.32,1)',
      }}/>

      {/* Info slides up on hover */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        padding:    'clamp(14px,2vw,22px)',
        transform:  hov ? 'translateY(0)' : 'translateY(12px)',
        opacity:    hov ? 1 : 0,
        transition: 'all .4s cubic-bezier(.23,1,.32,1)',
      }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'5px', textTransform:'uppercase' }}>
          {item.category}
        </span>
        <p style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600, fontSize:'clamp(13px,1.6vw,18px)', color:'var(--bone)', letterSpacing:'-0.3px', lineHeight:1.1, margin:0 }}>
          {item.alt}
        </p>
        <div style={{ width:'20px', height:'2px', background:'var(--orange)', marginTop:'8px', borderRadius:'2px' }}/>
      </div>

      {/* Category dot — idle state */}
      <div style={{
        position:   'absolute',
        top:        '12px',
        left:       '12px',
        display:    'flex',
        alignItems: 'center',
        gap:        '5px',
        opacity:    hov ? 0 : 1,
        transition: 'opacity .3s',
      }}>
        <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--orange)', display:'block' }}/>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'7px', letterSpacing:'2px', color:'rgba(255,255,255,0.65)', textTransform:'uppercase' }}>{item.category}</span>
      </div>

      {/* Ratio badge */}
      <div style={{
        position:   'absolute',
        top:        '12px',
        right:      '12px',
        fontFamily: 'var(--font-mono)',
        fontSize:   '8px',
        letterSpacing: '1px',
        color:      'rgba(255,255,255,0.4)',
        background: 'rgba(8,8,8,0.5)',
        padding:    '2px 6px',
        borderRadius: '2px',
        opacity:    hov ? 0 : 0.7,
        transition: 'opacity .3s',
      }}>
        {ratio}
      </div>

      {/* Orange arrow on hover */}
      <div style={{
        position:       'absolute',
        top:            '12px',
        right:          '12px',
        width:          '30px',
        height:         '30px',
        borderRadius:   '50%',
        background:     'var(--orange)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        opacity:        hov ? 1 : 0,
        transform:      hov ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-45deg)',
        transition:     'all .4s cubic-bezier(.23,1,.32,1)',
      }}>
        <span style={{ color:'var(--ink)', fontSize:'13px', lineHeight:1 }}>↗</span>
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
            <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(13px,1.4vw,16px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'300px', lineHeight:1.7, marginBottom:'6px' }}>
              Raw visuals, photography, AI art, and everything in between.
            </p>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>
              {filtered.length} images
            </span>
          </div>
        </div>

        {/* Category filters */}
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

      {/* Masonry-style grid using CSS columns */}
      <section style={{ padding:'0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1600px', margin:'0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--dim)', letterSpacing:'2px' }}>ADD WEBP IMAGES TO /public/images/gallery/</p>
          </div>
        ) : (
          <>
            {/* Desktop: 4 columns CSS masonry */}
            <div className="vault-grid">
              {filtered.map((item, i) => (
                <GalleryCard key={item.id} item={item} index={i} onOpen={() => setLightbox(item)} />
              ))}
            </div>
          </>
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
            <Image src={lightbox.src} alt={lightbox.alt} width={lightbox.width} height={lightbox.height}
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

      <style>{`
        .vault-grid {
          columns: 4;
          column-gap: clamp(6px,0.8vw,10px);
        }
        .vault-grid > div {
          break-inside: avoid;
          margin-bottom: clamp(6px,0.8vw,10px);
          display: block;
        }
        @media (max-width: 1024px) { .vault-grid { columns: 3; } }
        @media (max-width: 640px)  { .vault-grid { columns: 2; } }
      `}</style>
    </main>
  )
}
