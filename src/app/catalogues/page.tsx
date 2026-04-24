'use client'
import Image from 'next/image'
import { useState } from 'react'

type Catalogue = {
  id: string
  title: string
  subtitle: string
  year: string
  thumbnail: string
  flipbookUrl: string
  tag: string
}

const catalogues: Catalogue[] = [
  {
    id: 'promo-catalogue-2026',
    title: 'Promotional Gifts',
    subtitle: 'Catalogue 2026',
    year: '2026',
    thumbnail: '/images/catalogues/promo-catalogue-2026.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/vwqf/',
    tag: 'Featured',
  },
  {
    id: 'ramadan-2026',
    title: 'Ramadan Kareem',
    subtitle: 'Gifts 2026',
    year: '2026',
    thumbnail: '/images/catalogues/ramadan-2026.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/vyzf/',
    tag: 'Seasonal',
  },
  {
    id: 'eco-friendly',
    title: 'Eco-Friendly',
    subtitle: 'Collection',
    year: '2026',
    thumbnail: '/images/catalogues/eco-friendly.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/ywuc/',
    tag: 'Sustainability',
  },
  {
    id: 'technology',
    title: 'Technology',
    subtitle: 'Collection',
    year: '2026',
    thumbnail: '/images/catalogues/technology.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/sddz/',
    tag: 'Tech',
  },
  {
    id: 'award-collection',
    title: 'Award',
    subtitle: 'Collection',
    year: '2026',
    thumbnail: '/images/catalogues/award-collection.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/wpzb/',
    tag: 'Awards',
  },
  {
    id: 'promo-other-gifts',
    title: 'Promotional',
    subtitle: '& Other Gifts',
    year: '2026',
    thumbnail: '/images/catalogues/promo-other-gifts.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/hxjr/',
    tag: 'Promo',
  },
  {
    id: 'office-supplies',
    title: 'Office',
    subtitle: 'Supplies',
    year: '2026',
    thumbnail: '/images/catalogues/office-supplies.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/dyyl/',
    tag: 'Office',
  },
  {
    id: 'bags-collection',
    title: 'Bags',
    subtitle: 'Collection',
    year: '2026',
    thumbnail: '/images/catalogues/bags-collection.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/cgko/',
    tag: 'Bags',
  },
  {
    id: 'drinkware',
    title: 'Drinkware',
    subtitle: 'Collection',
    year: '2026',
    thumbnail: '/images/catalogues/drinkware.webp',
    flipbookUrl: 'https://online.pubhtml5.com/rewgl/zbzk/',
    tag: 'Drinkware',
  },
]

function FlipbookModal({ catalogue, onClose }: { catalogue: Catalogue; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(8,8,8,0.97)',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn .3s cubic-bezier(.23,1,.32,1)',
      }}
    >
      {/* Top bar */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 24px', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(8,8,8,0.98)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', color: 'var(--orange)', background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.3)', padding: '3px 10px', borderRadius: '2px' }}>
            DIGITAL PUBLICATION
          </span>
          <span style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.5px', color: 'var(--bone)' }}>
            {catalogue.title} — {catalogue.subtitle}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a
            href={catalogue.flipbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', border: '1px solid rgba(255,77,0,0.4)', padding: '8px 16px', borderRadius: '2px', textDecoration: 'none' }}
          >
            OPEN FULL ↗
          </a>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px', padding: '8px 16px', borderRadius: '2px', cursor: 'pointer' }}
          >
            CLOSE ✕
          </button>
        </div>
      </div>

      {/* Iframe embed */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0a0a0a' }}
      >
        <iframe
          src={catalogue.flipbookUrl}
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '4px', maxWidth: '1200px' }}
          seamless
          scrolling="no"
          frameBorder="0"
          allowTransparency={true}
          allowFullScreen={true}
          title={catalogue.title}
        />
      </div>
    </div>
  )
}

function CatalogueCard({ cat, index, onPreview }: { cat: Catalogue; index: number; onPreview: () => void }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        background: '#0d0d0d',
        isolation: 'isolate',
        // FIX: normal state border changed from var(--border) to transparent — removes white line
        border: `1px solid ${hover ? 'rgba(255,77,0,0.4)' : 'transparent'}`,
        transition: 'all .4s cubic-bezier(.23,1,.32,1)',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hover ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
        opacity: 0,
        animation: `fadeUp .7s cubic-bezier(.23,1,.32,1) ${0.05 + index * 0.08}s forwards`,
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#0d0d0d', margin: 0, padding: 0 }}>
        <Image
          src={cat.thumbnail}
          alt={cat.title}
          fill
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            transition: 'transform .6s cubic-bezier(.23,1,.32,1)',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/* Overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(8,8,8,0.95) 100%)',
          opacity: hover ? 1 : 0.4,
          transition: 'opacity .4s',
        }} />

        {/* Tag */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '2px',
          color: 'var(--orange)', background: 'rgba(8,8,8,0.85)',
          border: '1px solid rgba(255,77,0,0.3)',
          padding: '4px 10px', borderRadius: '2px',
          backdropFilter: 'blur(4px)',
        }}>
          {cat.tag.toUpperCase()}
        </div>

        {/* Year badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '1px',
          color: 'rgba(255,255,255,0.5)', background: 'rgba(8,8,8,0.7)',
          padding: '4px 10px', borderRadius: '2px',
        }}>
          {cat.year}
        </div>

        {/* Preview button — appears on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all .35s cubic-bezier(.23,1,.32,1)',
        }}>
          <button
            onClick={onPreview}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px',
              color: 'var(--ink)', background: 'var(--orange)',
              border: 'none', padding: '14px 28px', borderRadius: '2px',
              cursor: 'pointer', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 8px 32px rgba(255,77,0,0.4)',
              transition: 'transform .2s',
            }}
          >
            <span style={{ fontSize: '16px' }}>▶</span> PREVIEW
          </button>
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{
          fontFamily: 'Clash Display,Arial Black,sans-serif',
          fontWeight: 700, fontSize: 'clamp(18px,2vw,22px)',
          letterSpacing: '-0.5px', color: 'var(--bone)', lineHeight: 1,
          marginBottom: '4px',
        }}>
          {cat.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-script)',
          fontStyle: 'italic', fontSize: '14px',
          color: 'var(--muted)', marginBottom: '14px',
        }}>
          {cat.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onPreview}
            style={{
              flex: 1,
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px',
              color: 'var(--orange)', background: 'rgba(255,77,0,0.08)',
              border: '1px solid rgba(255,77,0,0.3)',
              padding: '10px', borderRadius: '2px', cursor: 'pointer',
              textTransform: 'uppercase', transition: 'all .2s',
            }}
          >
            ▶ Preview
          </button>
          <a
            href={cat.flipbookUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px',
              color: 'var(--dim)', background: 'transparent',
              border: '1px solid var(--border)',
              padding: '10px', borderRadius: '2px', cursor: 'pointer',
              textTransform: 'uppercase', transition: 'all .2s',
              textAlign: 'center', textDecoration: 'none', display: 'block',
            }}
          >
            ↗ Full View
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CataloguesPage() {
  const [active, setActive] = useState<Catalogue | null>(null)

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>

      {/* Hero Header */}
      <section style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,48px)', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        {/* Background doodle */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .04, pointerEvents: 'none' }} viewBox="0 0 1400 400" preserveAspectRatio="xMidYMid slice">
          <circle cx="1200" cy="80" r="120" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="8 6" />
          <path d="M0,300 Q350,240 700,300 Q1050,360 1400,300" fill="none" stroke="#ede8dd" strokeWidth="1" strokeDasharray="5 10" />
          <rect x="60" y="60" width="40" height="40" fill="none" stroke="#ff4d00" strokeWidth=".8" strokeDasharray="3 4" transform="rotate(15 80 80)" />
        </svg>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '16px' }}>
          ✦ DIGITAL PUBLICATIONS
        </span>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <h1 style={{
            fontFamily: 'Clash Display,Arial Black,sans-serif',
            fontWeight: 700, fontSize: 'clamp(48px,10vw,120px)',
            letterSpacing: '-4px', color: 'var(--bone)', lineHeight: .88, margin: 0,
          }}>
            THE<br />
            <span style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--orange)' }}>
              Catalogue.
            </span>
          </h1>
          <div style={{ maxWidth: '340px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.5vw,16px)', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '12px' }}>
              Digital publications, product catalogues and seasonal gifting collections — designed and produced for corporate clients across the UAE.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--orange)', lineHeight: 1 }}>9</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '1px' }}>PUBLICATIONS</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--orange)', lineHeight: 1 }}>2026</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '1px' }}>COLLECTION</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 clamp(20px,6vw,80px) 48px' }} />

      {/* Grid */}
      <section style={{ padding: '0 clamp(20px,6vw,80px) clamp(80px,10vh,120px)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px),1fr))',
          gap: '16px',
        }}>
          {catalogues.map((cat, i) => (
            <CatalogueCard
              key={cat.id}
              cat={cat}
              index={i}
              onPreview={() => setActive(cat)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {active && (
        <FlipbookModal
          catalogue={active}
          onClose={() => setActive(null)}
        />
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  )
}