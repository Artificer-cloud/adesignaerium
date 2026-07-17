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

// ── Short card — portrait 9:16 ────────────────────────────────────────────────
function ShortCard({ v, onPlay, index = 0 }: { v: YTVideo; onPlay: (v: YTVideo) => void; index?: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onPlay(v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:'relative',
        width:'clamp(150px,20vw,210px)', aspectRatio:'9/16',
        flexShrink:0, borderRadius:'8px', overflow:'hidden', cursor:'pointer',
        background:'#111',
        border:`1px solid ${hovered ? 'rgba(255,77,0,0.6)' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'none',
        transition:'all .3s cubic-bezier(.23,1,.32,1)',
      }}
    >
      {/* Thumbnail — hqdefault always available from YouTube CDN */}
      <img
        src={`/api/thumb?id=${v.id}`}
        alt={v.title}
        style={{
          position:'absolute', top:0, left:0, right:0, bottom:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center top',
          opacity: hovered ? 0.75 : 0.65,
          transition:'opacity .3s ease, transform .4s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />

      {/* Bottom gradient for text legibility */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.97) 100%)' }}/>

      {/* Top: badges */}
      <div style={{ position:'absolute', top:'12px', left:'12px', right:'12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ background:'#ff0000', color:'white', fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'1.5px', padding:'3px 8px', borderRadius:'2px', fontWeight:700 }}>SHORT</div>
        {v.duration && <div style={{ background:'rgba(0,0,0,0.65)', color:'rgba(255,255,255,0.9)', fontFamily:'var(--font-mono)', fontSize:'9px', padding:'3px 7px', borderRadius:'2px' }}>{v.duration}</div>}
      </div>

      {/* Center: play */}
      <div style={{
        position:'absolute', top:'40%', left:'50%',
        transform:`translate(-50%,-50%) scale(${hovered ? 1.15 : 1})`,
        width:'46px', height:'46px',
        background: hovered ? 'var(--orange)' : 'rgba(0,0,0,0.45)',
        border:`2px solid ${hovered ? 'var(--orange)' : 'rgba(255,255,255,0.5)'}`,
        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all .25s ease', backdropFilter:'blur(6px)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2L12 7L4 12V2Z" fill={hovered ? 'var(--ink)' : 'white'}/>
        </svg>
      </div>

      {/* Bottom: title */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 12px' }}>
        <div style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
          fontSize:'12px', color:'#fff', lineHeight:1.3,
          overflow:'hidden', display:'-webkit-box',
          WebkitLineClamp:3, WebkitBoxOrient:'vertical',
        }}>{v.title}</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'8px', color:'rgba(255,255,255,0.35)', letterSpacing:'1px', marginTop:'5px' }}>
          {new Date(v.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
        </div>
      </div>
    </div>
  )
}


// ── Regular card — landscape 16:9 ─────────────────────────────────────────────
function VideoCard({ v, onPlay }: { v: YTVideo; onPlay: (v: YTVideo) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onPlay(v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#0a0a0a',
        border: `1px solid ${hovered ? 'rgba(255,77,0,0.45)' : 'var(--border)'}`,
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all .3s cubic-bezier(.23,1,.32,1)',
      }}
    >
      <img src={`/api/thumb?id=${v.id}`} alt={v.title} style={{
        position:'absolute', top:0, left:0, right:0, bottom:0, width:'100%', height:'100%',
        objectFit:'cover',
        opacity: hovered ? 0.55 : 0.42,
        transition:'opacity .35s ease',
      }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.02) 0%,rgba(0,0,0,0.82) 100%)' }}/>

      {/* Duration */}
      {v.duration && (
        <div style={{
          position:'absolute', top:'12px', right:'12px',
          background:'rgba(0,0,0,0.72)', color:'rgba(255,255,255,0.9)',
          fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'1px',
          padding:'3px 8px', borderRadius:'2px',
        }}>{v.duration}</div>
      )}

      {/* Play */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:`translate(-50%,-50%) scale(${hovered ? 1.1 : 1})`,
        width:'50px', height:'50px',
        background: hovered ? 'var(--orange)' : 'rgba(255,255,255,0.1)',
        border:`2px solid ${hovered ? 'var(--orange)' : 'rgba(255,255,255,0.28)'}`,
        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all .25s ease',
      }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M4.5 2.5L12.5 7.5L4.5 12.5V2.5Z" fill={hovered ? 'var(--ink)' : 'white'}/>
        </svg>
      </div>

      {/* Title at bottom */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, padding:'16px',
        transform: hovered ? 'translateY(0)' : 'translateY(3px)',
        transition:'transform .25s ease',
      }}>
        <div style={{
          fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600,
          fontSize:'clamp(13px,1.5vw,17px)', letterSpacing:'-0.5px',
          color:'var(--bone)', lineHeight:1.25,
          overflow:'hidden', display:'-webkit-box',
          WebkitLineClamp:2, WebkitBoxOrient:'vertical',
        }}>{v.title}</div>
        <div style={{
          fontFamily:'var(--font-mono)', fontSize:'9px',
          color:'rgba(255,255,255,0.3)', letterSpacing:'1px', marginTop:'5px',
        }}>
          {new Date(v.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
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
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.96)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'clamp(16px,4vw,48px)', cursor:'zoom-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width:'100%',
        maxWidth: video.isShort ? '400px' : '960px',
        cursor:'default',
      }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
          <div style={{ flex:1, paddingRight:'16px' }}>
            <div style={{
              fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700,
              fontSize:'clamp(16px,2.5vw,24px)', letterSpacing:'-1px',
              color:'var(--bone)', lineHeight:1.2, marginBottom:'6px',
            }}>{video.title}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--dim)', letterSpacing:'1px', display:'flex', gap:'12px' }}>
              {video.duration && <span>{video.duration}</span>}
              <span>{new Date(video.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span>
              {video.isShort && <span style={{ color:'#ff4444' }}>SHORT</span>}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:'none', border:'1px solid var(--border)', color:'var(--muted)',
            cursor:'pointer', width:'36px', height:'36px', borderRadius:'50%', fontSize:'16px', flexShrink:0,
          }}>✕</button>
        </div>

        {/* Player — portrait for Shorts, landscape for regular */}
        <div style={{
          position:'relative',
          aspectRatio: video.isShort ? '9/16' : '16/9',
          background:'#000', borderRadius:'8px', overflow:'hidden',
          border:'1px solid var(--border)',
          maxHeight: video.isShort ? '70vh' : 'auto',
          margin: video.isShort ? '0 auto' : '0',
          maxWidth: video.isShort ? '400px' : '100%',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            title={video.title}
          />
        </div>

        {/* Open on YouTube */}
        <div style={{ marginTop:'12px', textAlign:'right' }}>
          <a href={`https://youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--dim)' }}>
            Open on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ short=false }: { short?: boolean }) {
  return <div style={{
    aspectRatio: short ? '9/16' : '16/9',
    width: short ? '160px' : 'auto', flexShrink: short ? 0 : undefined,
    borderRadius: short ? '8px' : '4px',
    background:'var(--surface)', border:'1px solid var(--border)',
    animation:'pulse 1.5s ease-in-out infinite',
  }}/>
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

  const shorts  = videos.filter(v => v.isShort)
  const regular = videos.filter(v => !v.isShort)

  return (
    <main style={{ paddingTop:'80px', minHeight:'100vh', background:'var(--ink)' }}>

      {/* Hero */}
      <section style={{ padding:'clamp(48px,8vh,80px) clamp(20px,6vw,80px) clamp(32px,4vh,48px)', maxWidth:'1400px', margin:'0 auto', position:'relative', overflow:'hidden' }}>
        <svg aria-hidden style={{ position:'absolute', right:0, top:0, opacity:.04, pointerEvents:'none', width:'260px' }} viewBox="0 0 260 260">
          <circle cx="190" cy="70" r="130" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="6 6"/>
          <circle cx="190" cy="70" r="75"  fill="none" stroke="#ff4d00" strokeWidth=".5" strokeDasharray="3 8"/>
        </svg>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ VIDEO WORK</span>
        <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(56px,12vw,140px)', letterSpacing:'-5px', color:'var(--bone)', lineHeight:0.86, marginBottom:'20px' }}>
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

      {/* Content */}
      <section style={{ padding:'0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth:'1400px', margin:'0 auto' }}>

        {/* Loading */}
        {loading && (
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--dim)', marginBottom:'16px', paddingTop:'8px' }}>SHORTS</div>
            <div style={{ display:'flex', gap:'12px', overflowX:'auto', paddingBottom:'8px', marginBottom:'48px' }}>
              {Array.from({length:3}).map((_,i) => <Skeleton key={i} short/>)}
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--dim)', marginBottom:'16px' }}>VIDEOS</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'clamp(10px,1.8vw,18px)' }}>
              {Array.from({length:4}).map((_,i) => <Skeleton key={i}/>)}
            </div>
          </div>
        )}

        {/* Error / empty */}
        {!loading && error && (
          <div style={{ textAlign:'center', padding:'100px 0' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px', opacity:.15 }}>📹</div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', color:'var(--dim)', marginBottom:'8px' }}>
              {error === 'no_videos' ? 'NO VIDEOS YET' : 'COULD NOT LOAD VIDEOS'}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic', color:'var(--muted)', marginBottom:'24px' }}>
              {error === 'no_videos'
                ? 'Upload your first video to YouTube and it will appear here automatically.'
                : 'Check your API key in Vercel environment variables.'}
            </p>
            <a href="https://youtube.com/@adesignaerium" target="_blank" rel="noopener noreferrer" style={{
              display:'inline-block', fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px',
              color:'var(--orange)', border:'1px solid rgba(255,77,0,0.3)', padding:'10px 20px', borderRadius:'2px',
            }}>Visit Channel ↗</a>
          </div>
        )}

        {/* Videos loaded */}
        {!loading && !error && (
          <>
            {/* Shorts row */}
            {shorts.length > 0 && (
              <div style={{ marginBottom:'52px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
                  <span style={{ display:'block', width:'24px', height:'2px', background:'#ff0000', borderRadius:'2px' }}/>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'#ff4444' }}>SHORTS</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'var(--dim)', letterSpacing:'1px' }}>{shorts.length} video{shorts.length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ display:'flex', gap:'14px', overflowX:'auto', paddingBottom:'8px', scrollbarWidth:'none' }}>
                  {shorts.map((v,i) => <ShortCard key={v.id} v={v} onPlay={setActiveVideo} index={i}/>)}
                </div>
              </div>
            )}

            {/* Regular videos grid */}
            {regular.length > 0 && (
              <div>
                {shorts.length > 0 && (
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
                    <span style={{ display:'block', width:'24px', height:'2px', background:'var(--orange)', borderRadius:'2px' }}/>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'3px', color:'var(--orange)' }}>VIDEOS</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'var(--dim)', letterSpacing:'1px' }}>{regular.length} video{regular.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap:'clamp(10px,1.8vw,18px)' }}>
                  {regular.map(v => <VideoCard key={v.id} v={v} onPlay={setActiveVideo}/>)}
                </div>
              </div>
            )}

            {/* All shorts, no regular */}
            {shorts.length > 0 && regular.length === 0 && (
              <div style={{ marginTop:'8px', fontFamily:'var(--font-body)', fontSize:'14px', fontStyle:'italic', color:'var(--dim)', textAlign:'center' }}>
                More videos coming soon.
              </div>
            )}
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
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        ::-webkit-scrollbar { display:none; }
      `}</style>
    </main>
  )
}
