'use client'
import Image from 'next/image'
import { useState } from 'react'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
  span?: 'full' | 'half' | 'third'
}

interface CaseStudyGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function CaseStudyGallery({ images, title = 'Project Visuals' }: CaseStudyGalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  if (!images || images.length === 0) return null

  return (
    <>
      <section style={{ padding: 'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <span style={{ display: 'block', width: '32px', height: '2px', background: 'var(--orange)', borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', textTransform: 'uppercase' }}>{title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(8px,1.5vw,16px)' }}>
          {images.map((img, i) => {
            const cols = img.span === 'full' ? '1 / -1' : img.span === 'third' ? 'span 4' : 'span 6'
            return (
              <div
                key={i}
                onClick={() => setLightbox(img)}
                style={{
                  gridColumn: cols,
                  position: 'relative',
                  aspectRatio: img.span === 'full' ? '16/7' : img.span === 'third' ? '4/3' : '4/3',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                  cursor: 'zoom-in',
                  border: '1px solid var(--border)',
                }}
                className="gallery-item"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.span === 'full' ? '100vw' : img.span === 'third' ? '33vw' : '50vw'}
                  style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.25,0,0,1)' }}
                  className="gallery-img"
                />
                {img.caption && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '24px 20px 16px',
                    background: 'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 100%)',
                    fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px',
                    color: 'rgba(237,232,221,0.7)', textTransform: 'uppercase',
                  }}>
                    {img.caption}
                  </div>
                )}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '28px', height: '28px', background: 'rgba(0,0,0,0.5)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                }} className="gallery-zoom">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M7 1h4v4M1 5V1h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '32px', cursor: 'zoom-out',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '100%', height: '100%' }}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
          {lightbox.caption && (
            <div style={{
              position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px',
              color: 'var(--muted)', background: 'rgba(0,0,0,0.7)',
              padding: '8px 16px', borderRadius: '2px',
            }}>
              {lightbox.caption}
            </div>
          )}
          <button onClick={() => setLightbox(null)} style={{
            position: 'fixed', top: '24px', right: '24px',
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted)', cursor: 'pointer',
            width: '40px', height: '40px', borderRadius: '50%',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
      )}

      <style>{`
        .gallery-item:hover .gallery-img { transform: scale(1.04); }
        .gallery-item:hover .gallery-zoom { opacity: 1 !important; }
        @media(max-width:768px){
          .gallery-item { grid-column: 1 / -1 !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>
    </>
  )
}
