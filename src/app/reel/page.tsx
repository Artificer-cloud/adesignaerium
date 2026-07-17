'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type YTVideo = {
  id:          string
  title:       string
  description: string
  thumbnail:   string
  publishedAt: string
  duration:    string
  views:       string
  isShort:     boolean
}

// ── Single unified card — fills its grid cell completely ──────────────────────
function VideoCard({ v, onPlay }: { v: YTVideo; onPlay: (v: YTVideo) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onPlay(v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%', height: '100%',        // fill the grid cell
        borderRadius: '6px', overflow: 'hidden',
        cursor: 'pointer', background: '#0d0d0d',
        border: `1px solid ${hovered ? 'rgba(255,77,0,0.5)' : 'var(--border)'}`,
        transition: 'border-color .25s ease',
      }}
    >
      {/* Thumbnail */}
      <img
        src={`/api/thumb?id=${v.id}`}
        alt={v.title}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: v.isShort ? 'center top' : 'center center',
          opacity: hovered ? 0.65 : 0.5,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity .35s ease, transform .5s cubic-bezier(.23,1,.32,1)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)',
      }}/>

      {/* TOP badges */}
      <div style={{
        position: 'absolute', top: '10px', left: '10px', right: '10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        {v.isShort
          ? <span style={{ background:'#ff0000', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px', padding:'2px 7px', borderRadius:'2px', fontWeight:700 }}>SHORT</span>
          : <span style={{ background:'rgba(0,0,0,0.55)', color:'rgba(255,255,255,0.6)', fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1px', padding:'2px 7px', borderRadius:'2px', backdropFilter:'blur(4px)' }}>VIDEO</span>
        }
        {v.duration && (
          <span style={{ background:'rgba(0,0,0,0.65)', color:'rgba(255,255,255,0.85)', fontFamily:'var(--font-mono)', fontSize:'9px', padding:'2px 7px', borderRadius:'2px', backdropFilter:'blur(4px)' }}>
            {v.duration}
          </span>
        )}
      </div>

      {/* CENTER play button */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%,-50%) scale(${hovered ? 1.15 : 0.9})`,
        width: '46px', height: '46px',
        background: hovered ? 'var(--orange)' : 'rgba(255,255,255,0.08)',
        border: `2px solid ${hovered ? 'var(--orange)' : 'rgba(255,255,255,0.4)'}`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .3s cubic-bezier(.23,1,.32,1)',
        opacity: hovered ? 1 : 0.7,
        backdropFilter: 'blur(6px)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2L12 7L4 12V2Z" fill={hovered ? 'var(--ink)' : 'white'}/>
        </svg>
      </div>

      {/* BOTTOM title */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(10px,1.5vw,16px)',
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform .3s ease',
      }}>
        <div style={{
          fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700,
          fontSize: 'clamp(11px,1.2vw,14px)', color: '#fff', lineHeight: 1.25,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          textShadow: '0 1px 8px rgba(0,0,0,0.8)',
        }}>{v.title}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px', marginTop: '4px',
        }}>
          {new Date(v.publishedAt).toLocaleDateString('en-GB',{ day:'numeric', month:'short', year:'numeric' })}
        </div>
      </div>
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function VideoModal({ video, onClose }: { video: YTVideo; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(16px,4vw,48px)', cursor: 'zoom-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%',
        maxWidth: video.isShort ? 'min(90vw,500px)' : '960px',
        cursor: 'default',
      }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
          <div style={{ flex:1, paddingRight:'16px' }}>
            <div style={{
              fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
              fontSize:'clamp(15px,2.5vw,24px)', letterSpacing:'-1px',
              color:'var(--bone)', lineHeight:1.2, marginBottom:'6px',
            }}>{video.title}</div>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>
              {video.isShort && <span style={{ background:'#ff0000', color:'white', fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px', padding:'2px 7px', borderRadius:'2px' }}>SHORT</span>}
              {video.duration && <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>{video.duration}</span>}
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>
                {new Date(video.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background:'none', border:'1px solid var(--border)', color:'var(--muted)',
            cursor:'pointer', width:'36px', height:'36px', borderRadius:'50%',
            fontSize:'16px', flexShrink:0,
          }}>✕</button>
        </div>

        {/* Player */}
        <div style={{
          position: 'relative',
          aspectRatio: video.isShort ? '9/16' : '16/9',
          background: '#000', borderRadius: '8px', overflow: 'hidden',
          border: '1px solid var(--border)',
          maxHeight: video.isShort ? '80vh' : 'auto',
          margin: video.isShort ? '0 auto' : '0',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&vq=hd1080`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            title={video.title}
          />
        </div>

        <div style={{ marginTop:'10px', textAlign:'right' }}>
          <a href={`https://youtube.com/${video.isShort ? 'shorts/' : 'watch?v='}${video.id}`}
            target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--dim)' }}>
            Watch on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ isShort = false }: { isShort?: boolean }) {
  return (
    <div
      className={isShort ? 'grid-short' : 'grid-video'}
      style={{ borderRadius:'6px', background:'var(--surface)', border:'1px solid var(--border)', animation:'pulse 1.5s ease-in-out infinite' }}
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ReelPage() {
  const [videos,      setVideos]      = useState<YTVideo[]>([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string|null>(null)
  const [activeVideo, setActiveVideo] = useState<YTVideo|null>(null)
  const [channelInfo, setChannelInfo] = useState<{title:string;thumb:string}|null>(null)

  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.json())
      .then(data => {
        if (data.videos?.length) {
          setVideos(data.videos)
          if (data.channelTitle) setChannelInfo({ title:data.channelTitle, thumb:data.channelThumb })
        } else {
          setError(data.error || 'no_videos')
        }
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh', background:'var(--ink)' }}>

      {/* Hero */}
      <section style={{ padding:'clamp(48px,8vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,40px)', maxWidth:'1400px', margin:'0 auto', position:'relative', overflow:'hidden' }}>
        <svg aria-hidden style={{ position:'absolute', right:0, top:0, opacity:.04, pointerEvents:'none', width:'260px' }} viewBox="0 0 260 260">
          <circle cx="190" cy="70" r="130" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="6 6"/>
          <circle cx="190" cy="70" r="75"  fill="none" stroke="#ff4d00" strokeWidth=".5" strokeDasharray="3 8"/>
        </svg>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ VIDEO WORK</span>
        <h1 style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
          fontSize:'clamp(56px,12vw,140px)', letterSpacing:'-5px',
          color:'var(--bone)', lineHeight:0.86, marginBottom:'20px',
        }}>
          THE<br/>
          <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)', letterSpacing:'-3px' }}>Reel.</span>
        </h1>
        <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.6vw,18px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'480px', lineHeight:1.7, margin:0 }}>
            Product videos, AI-generated campaigns, social content and brand films. Click any card to watch.
          </p>
          {channelInfo && (
            <a href="https://youtube.com/@adesignaerium" target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
              color:'var(--dim)', border:'1px solid var(--border)', padding:'8px 16px', borderRadius:'2px', whiteSpace:'nowrap',
            }}>
              {channelInfo.thumb && <img src={channelInfo.thumb} alt="" style={{ width:'18px', height:'18px', borderRadius:'50%' }}/>}
              Subscribe ↗
            </a>
          )}
        </div>
      </section>

      {/* Collage grid */}
      <section style={{ padding:'0 clamp(12px,3vw,32px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>

        {loading && (
          <div className="reel-grid">
            <Skeleton isShort/><Skeleton/><Skeleton isShort/><Skeleton/><Skeleton isShort/><Skeleton/>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign:'center', padding:'100px 0' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px', opacity:.15 }}>📹</div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', color:'var(--dim)', marginBottom:'8px' }}>
              {error === 'no_videos' ? 'NO VIDEOS YET' : 'COULD NOT LOAD VIDEOS'}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic', color:'var(--muted)', marginBottom:'24px' }}>
              {error === 'no_videos' ? 'Upload to YouTube and it appears here automatically.' : 'Check API key in Vercel environment variables.'}
            </p>
            <a href="https://youtube.com/@adesignaerium" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--orange)', border:'1px solid rgba(255,77,0,0.3)', padding:'10px 20px', borderRadius:'2px', display:'inline-block' }}>
              Visit Channel ↗
            </a>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
              <span style={{ display:'block', width:'24px', height:'2px', background:'var(--orange)', borderRadius:'2px' }}/>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--orange)' }}>
                {videos.length} VIDEO{videos.length !== 1 ? 'S' : ''} · AUTO-SYNCED FROM YOUTUBE
              </span>
            </div>

            {/* ── THE COLLAGE GRID ── */}
            <div className="reel-grid">
              {videos.map((v, i) => (
                <div
                  key={v.id}
                  className={v.isShort ? 'grid-short' : 'grid-video'}
                >
                  <VideoCard v={v} onPlay={setActiveVideo}/>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'clamp(48px,6vh,80px) clamp(20px,6vw,80px)', textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', marginBottom:'20px' }}>✦ WANT SOMETHING LIKE THIS?</p>
        <h2 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,64px)', letterSpacing:'-2px', color:'var(--bone)', lineHeight:.9, marginBottom:'32px' }}>
          LET&apos;S MAKE YOUR<br/>
          <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', color:'var(--orange)' }}>Next Video.</span>
        </h2>
        <Link href="/contact" style={{ display:'inline-block', background:'var(--orange)', color:'var(--ink)', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600, fontSize:'12px', letterSpacing:'2px', textTransform:'uppercase', padding:'14px 36px', borderRadius:'2px' }}>
          Start a Project →
        </Link>
      </section>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)}/>}

      <style>{`
        /* ── Collage grid ── */
        .reel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          grid-auto-flow: row dense;
          gap: 10px;
        }

        /* Short (9:16): 1 col × 3 rows = ~280px × 560px ≈ 9:16 */
        .grid-short {
          grid-column: span 1;
          grid-row: span 3;
        }

        /* Regular (16:9): 2 cols × 2 rows = ~570px × 370px ≈ 16:10 (close enough) */
        .grid-video {
          grid-column: span 2;
          grid-row: span 2;
        }

        /* Tablet: 3 columns */
        @media (max-width: 900px) {
          .reel-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 160px;
            gap: 8px;
          }
          .grid-short  { grid-column: span 1; grid-row: span 3; }
          .grid-video  { grid-column: span 2; grid-row: span 2; }
        }

        /* Mobile: 2 columns */
        @media (max-width: 560px) {
          .reel-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 140px;
            gap: 6px;
          }
          .grid-short  { grid-column: span 1; grid-row: span 3; }
          .grid-video  { grid-column: span 2; grid-row: span 2; }
        }

        @keyframes pulse { 0%,100%{opacity:0.35} 50%{opacity:0.65} }
      `}</style>
    </main>
  )
}
