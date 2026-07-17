'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type VideoCategory = 'All' | 'AI Generated' | 'Product' | 'Social Content' | 'Brand Film'

type YTVideo = {
  id:          string
  title:       string
  description: string
  thumbnail:   string
  publishedAt: string
  category:    string
  duration:    string
  views:       string
}

const CATEGORIES: VideoCategory[] = ['All','AI Generated','Product','Social Content','Brand Film']

const CAT_COLORS: Record<string, string> = {
  'All':           'var(--orange)',
  'AI Generated':  '#7c3aed',
  'Product':       '#ff4d00',
  'Social Content':'#0ea5e9',
  'Brand Film':    '#d97706',
}

function VideoCard({ v, onPlay }: { v: YTVideo; onPlay: (v: YTVideo) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onPlay(v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:'relative', aspectRatio:'16/9',
        borderRadius:'4px', overflow:'hidden', cursor:'pointer',
        background:'#0a0a0a',
        border:`1px solid ${hovered ? 'rgba(255,77,0,0.45)' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition:'border-color .25s, transform .3s cubic-bezier(.23,1,.32,1)',
      }}
    >
      {/* Thumbnail */}
      <img
        src={v.thumbnail}
        alt={v.title}
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover',
          opacity: hovered ? 0.55 : 0.42,
          transition:'opacity .35s ease',
        }}
      />

      {/* Gradient */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.02) 0%,rgba(0,0,0,0.8) 100%)' }}/>

      {/* Play button */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:`translate(-50%,-50%) scale(${hovered ? 1.1 : 1})`,
        width:'48px', height:'48px',
        background: hovered ? 'var(--orange)' : 'rgba(255,255,255,0.1)',
        border:`2px solid ${hovered ? 'var(--orange)' : 'rgba(255,255,255,0.28)'}`,
        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all .25s ease',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2.5L11.5 7L4 11.5V2.5Z" fill={hovered ? 'var(--ink)' : 'white'}/>
        </svg>
      </div>

      {/* Duration badge */}
      {v.duration && (
        <div style={{
          position:'absolute', top:'12px', right:'12px',
          fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px',
          color:'rgba(255,255,255,0.9)', background:'rgba(0,0,0,0.7)',
          padding:'3px 8px', borderRadius:'2px',
        }}>{v.duration}</div>
      )}

      {/* Category badge */}
      <div style={{
        position:'absolute', top:'12px', left:'12px',
        fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px',
        color:'white', background: CAT_COLORS[v.category] || 'var(--orange)',
        padding:'3px 10px', borderRadius:'2px', textTransform:'uppercase',
      }}>{v.category}</div>

      {/* Bottom info */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, padding:'16px',
        transform: hovered ? 'translateY(0)' : 'translateY(3px)',
        transition:'transform .25s ease',
      }}>
        <div style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600,
          fontSize:'clamp(13px,1.5vw,16px)', letterSpacing:'-0.5px',
          color:'var(--bone)', lineHeight:1.2, marginBottom:'4px',
        }}>{v.title}</div>
        {v.description && (
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:'9px',
            color:'rgba(255,255,255,0.3)', letterSpacing:'0.5px',
            overflow:'hidden', display:'-webkit-box',
            WebkitLineClamp:1, WebkitBoxOrient:'vertical',
          }}>{v.description}</div>
        )}
      </div>
    </div>
  )
}

function VideoModal({ video, onClose }: { video: YTVideo; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.96)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'clamp(16px,4vw,48px)', cursor:'zoom-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:'980px', cursor:'default' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
          <div style={{ flex:1, paddingRight:'16px' }}>
            <div style={{
              fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
              fontSize:'clamp(16px,2.5vw,26px)', letterSpacing:'-1px',
              color:'var(--bone)', lineHeight:1.15, marginBottom:'6px',
            }}>{video.title}</div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap' }}>
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px',
                color:'white', background: CAT_COLORS[video.category] || 'var(--orange)',
                padding:'3px 10px', borderRadius:'2px', textTransform:'uppercase',
              }}>{video.category}</span>
              {video.duration && (
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>{video.duration}</span>
              )}
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px' }}>
                {new Date(video.publishedAt).toLocaleDateString('en-GB', { month:'short', year:'numeric' })}
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
        <div style={{ position:'relative', aspectRatio:'16/9', background:'#000', borderRadius:'4px', overflow:'hidden', border:'1px solid var(--border)' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            title={video.title}
          />
        </div>

        {/* Description */}
        {video.description && (
          <p style={{
            marginTop:'16px',
            fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic',
            color:'var(--muted)', lineHeight:1.65,
          }}>{video.description}</p>
        )}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{
      aspectRatio:'16/9', borderRadius:'4px',
      background:'var(--surface)', border:'1px solid var(--border)',
      animation:'pulse 1.5s ease-in-out infinite',
    }}/>
  )
}

export default function ReelPage() {
  const [videos,      setVideos]      = useState<YTVideo[]>([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(false)
  const [cat,         setCat]         = useState<VideoCategory>('All')
  const [activeVideo, setActiveVideo] = useState<YTVideo | null>(null)
  const [channelInfo, setChannelInfo] = useState<{ title:string; thumb:string } | null>(null)

  useEffect(() => {
    fetch('/api/youtube')
      .then(r => r.json())
      .then(data => {
        if (data.videos?.length) {
          setVideos(data.videos)
          if (data.channelTitle) setChannelInfo({ title: data.channelTitle, thumb: data.channelThumb })
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filtered = cat === 'All' ? videos : videos.filter(v => v.category === cat)

  const catCount = (c: VideoCategory) => c === 'All' ? videos.length : videos.filter(v => v.category === c).length

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh', background:'var(--ink)' }}>

      {/* ── Hero ── */}
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
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.6vw,18px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'480px', lineHeight:1.7 }}>
            Product videos, AI-generated campaigns, social content and brand films. Click any card to watch.
          </p>
          {channelInfo && (
            <a href={`https://youtube.com/@adesignaerium`} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
              color:'var(--dim)', border:'1px solid var(--border)',
              padding:'8px 16px', borderRadius:'2px', whiteSpace:'nowrap',
            }}>
              {channelInfo.thumb && <img src={channelInfo.thumb} alt="" style={{ width:'18px', height:'18px', borderRadius:'50%' }}/>}
              Subscribe on YouTube ↗
            </a>
          )}
        </div>
      </section>

      {/* ── Sticky category filters ── */}
      <div style={{
        borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
        position:'sticky', top:'72px', zIndex:10,
        background:'rgba(8,8,8,0.93)', backdropFilter:'blur(20px)',
      }}>
        <div style={{ padding:'0 clamp(20px,6vw,80px)', maxWidth:'1400px', margin:'0 auto', display:'flex', overflowX:'auto' }}>
          {CATEGORIES.map(c => {
            const active = cat === c
            const count  = catCount(c)
            return (
              <button key={c} onClick={() => setCat(c)} style={{
                fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
                textTransform:'uppercase', padding:'16px 18px',
                background:'none', border:'none',
                borderBottom:`2px solid ${active ? CAT_COLORS[c] : 'transparent'}`,
                color: active ? CAT_COLORS[c] : 'var(--dim)',
                cursor:'pointer', whiteSpace:'nowrap',
                transition:'all .2s ease',
                display:'flex', alignItems:'center', gap:'7px',
              }}>
                {c}
                {!loading && (
                  <span style={{
                    background: active ? CAT_COLORS[c] : 'var(--border)',
                    color:      active ? 'var(--ink)' : 'var(--dim)',
                    fontSize:'8px', padding:'1px 5px', borderRadius:'100px',
                    transition:'all .2s ease',
                  }}>{count}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Video grid ── */}
      <section style={{ padding:'clamp(36px,5vh,56px) clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'clamp(10px,1.8vw,18px)' }}>
            {Array.from({ length:6 }).map((_,i) => <SkeletonCard key={i}/>)}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div style={{ textAlign:'center', padding:'100px 0' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px', opacity:.2 }}>📹</div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', color:'var(--dim)', marginBottom:'8px' }}>
              NO VIDEOS YET
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic', color:'var(--muted)' }}>
              Upload your first video to YouTube and it will appear here automatically.
            </p>
            <a href="https://youtube.com/@adesignaerium" target="_blank" rel="noopener noreferrer" style={{
              display:'inline-block', marginTop:'24px',
              fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
              color:'var(--orange)', border:'1px solid rgba(255,77,0,0.3)',
              padding:'10px 20px', borderRadius:'2px',
            }}>Visit Channel ↗</a>
          </div>
        )}

        {/* Videos */}
        {!loading && !error && (
          filtered.length === 0
            ? <div style={{ textAlign:'center', padding:'80px 0', color:'var(--dim)', fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px' }}>
                NO VIDEOS IN THIS CATEGORY YET.
              </div>
            : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'clamp(10px,1.8vw,18px)' }}>
                {filtered.map(v => <VideoCard key={v.id} v={v} onPlay={setActiveVideo}/>)}
              </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'clamp(48px,6vh,80px) clamp(20px,6vw,80px)', textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', marginBottom:'20px' }}>✦ WANT SOMETHING LIKE THIS?</p>
        <h2 style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
          fontSize:'clamp(28px,5vw,64px)', letterSpacing:'-2px',
          color:'var(--bone)', lineHeight:.9, marginBottom:'32px',
        }}>
          LET&apos;S MAKE YOUR<br/>
          <span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', color:'var(--orange)' }}>Next Video.</span>
        </h2>
        <Link href="/contact" style={{
          display:'inline-block', background:'var(--orange)', color:'var(--ink)',
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600,
          fontSize:'12px', letterSpacing:'2px', textTransform:'uppercase',
          padding:'14px 36px', borderRadius:'2px',
        }}>Start a Project →</Link>
      </section>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)}/>}

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:0.4; }
          50%      { opacity:0.8; }
        }
      `}</style>
    </main>
  )
}
