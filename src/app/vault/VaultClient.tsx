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

const COLS = 3

function GalleryCard({ item, onOpen, delay }: { item: GalleryImage; onOpen: () => void; delay: number }) {
  const ref           = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)
  const ratio         = item.height / item.width

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .1 })
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
        position: 'relative',
        paddingBottom: `${ratio * 100}%`,
        borderRadius: 'clamp(4px,.5vw,8px)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity .7s cubic-bezier(.23,1,.32,1) ${delay}s, transform .7s cubic-bezier(.23,1,.32,1) ${delay}s`,
      }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,28vw"
        style={{ objectFit: 'cover', transition: 'transform .6s cubic-bezier(.23,1,.32,1)', transform: hov ? 'scale(1.06)' : 'scale(1)' }}
        onError={() => {}}
      />
      {/* Hover overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', opacity: hov ? 1 : 0, transition: 'opacity .4s cubic-bezier(.23,1,.32,1)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', color: 'var(--orange)', background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.3)', padding: '4px 10px', borderRadius: '2px' }}>{item.category.toUpperCase()}</span>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontStyle: 'italic', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>{item.alt}</p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', color: 'var(--bone)', lineHeight: 1 }}>⊕</span>
      </div>
      {/* Category pill */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '1.5px', color: 'var(--orange)', background: 'rgba(8,8,8,0.7)', padding: '3px 8px', borderRadius: '100px', opacity: hov ? 0 : .8, transition: 'opacity .3s' }}>
        {item.category}
      </div>
      {/* Dimensions badge */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)', background: 'rgba(8,8,8,0.6)', padding: '2px 6px', borderRadius: '3px', opacity: hov ? 0 : .7, transition: 'opacity .3s' }}>
        {item.width}×{item.height}
      </div>
    </div>
  )
}

export default function VaultClient({ images }: { images: GalleryImage[] }) {
  const allCats   = ['All', ...Array.from(new Set<string>(images.map(i => i.category))).sort()]
  const [active,   setActive]   = useState('All')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const filtered = active === 'All' ? images : images.filter(i => i.category === active)
  const columns: GalleryImage[][] = Array.from({ length: COLS }, () => [])
  filtered.forEach((img, i) => columns[i % COLS].push(img))

  useEffect(() => {
    if (!lightbox) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') {
        const idx = filtered.findIndex(i => i.id === lightbox.id)
        setLightbox(filtered[(idx + 1) % filtered.length])
      }
      if (e.key === 'ArrowLeft') {
        const idx = filtered.findIndex(i => i.id === lightbox.id)
        setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, filtered])

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth: '1400px', margin: '0 auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '16px' }}>✦ THE VAULT</span>
        <h1 style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(44px,10vw,120px)', letterSpacing: '-4px', color: 'var(--bone)', lineHeight: .88, marginBottom: '16px' }}>
          VISUAL<br/>
          <span style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--orange)' }}>Archives.</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.6vw,18px)', fontStyle: 'italic', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '24px' }}>
          Raw visuals, sketchbook pages, photography, hand-painted work, AI art, and everything in between.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '1px' }}>
            {filtered.length} {active === 'All' ? 'images' : active.toLowerCase()}
          </span>
        </div>
        {/* Category filters — auto-generated from actual files */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allCats.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', transition: 'all .3s', background: active === cat ? 'var(--orange)' : 'transparent', color: active === cat ? 'var(--ink)' : 'var(--muted)', border: active === cat ? '1px solid var(--orange)' : '1px solid var(--border)' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth: '1400px', margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--dim)', letterSpacing: '2px' }}>
              ADD YOUR IMAGES TO /public/images/gallery/
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontStyle: 'italic', color: 'var(--dim)', marginTop: '12px' }}>
              Name them: social-01.webp, photo-01.webp, illus-01.webp etc.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS},1fr)`, gap: 'clamp(8px,1vw,12px)', alignItems: 'start' }}>
            {columns.map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1vw,12px)' }}>
                {col.map((item, idx) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onOpen={() => setLightbox(item)}
                    delay={idx * .08 + ci * .04}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(8,8,8,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px,4vw,60px)', animation: 'fadeIn .3s ease' }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--bone)', fontSize: '24px', cursor: 'pointer', opacity: .6, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>✕</button>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); const idx = filtered.findIndex(i => i.id === lightbox.id); setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]) }}
            style={{ position: 'absolute', left: 'clamp(12px,3vw,40px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--bone)', fontSize: '18px', cursor: 'pointer', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); const idx = filtered.findIndex(i => i.id === lightbox.id); setLightbox(filtered[(idx + 1) % filtered.length]) }}
            style={{ position: 'absolute', right: 'clamp(12px,3vw,40px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--bone)', fontSize: '18px', cursor: 'pointer', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>

          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 'min(90vw,900px)', maxHeight: '85vh', borderRadius: '8px', overflow: 'hidden' }}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={lightbox.width}
              height={lightbox.height}
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
              onError={() => {}}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(transparent,rgba(8,8,8,0.9))' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', color: 'var(--orange)' }}>{lightbox.category.toUpperCase()}</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px', fontStyle: 'italic' }}>{lightbox.alt}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--dim)' }}>{lightbox.width}×{lightbox.height}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
