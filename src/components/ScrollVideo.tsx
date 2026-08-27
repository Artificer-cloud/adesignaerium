'use client'
import { useEffect, useRef, useState } from 'react'

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const rafRef     = useRef<number>(0)
  const [ready,    setReady]    = useState(false)
  const [progress, setProgress] = useState(0)
  const [isIOS,    setIsIOS]    = useState(false)

  // Detect iOS — video scrubbing doesn't work on iOS Safari
  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)
  }, [])

  // Load video metadata
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => setReady(true)
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  // Scroll → scrub
  useEffect(() => {
    if (!ready || isIOS) return
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect()
        const scrolled = -rect.top
        const total    = rect.height - window.innerHeight
        const pct      = Math.max(0, Math.min(1, scrolled / total))
        setProgress(pct)
        if (video.duration) {
          video.currentTime = pct * video.duration
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ready, isIOS])

  return (
    <section
      ref={sectionRef}
      style={{
        // 500vh = 5x scroll distance through the video
        height: '500vh',
        position: 'relative',
      }}
    >
      {/* Sticky video container — stays fullscreen while scrolling */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#080808',
      }}>
        {/* The video element */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          // iOS fallback — autoplay since scrubbing won't work
          autoPlay={isIOS}
          loop={isIOS}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: ready ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4"  type="video/mp4"  />
        </video>

        {/* Gradient overlays — top and bottom fade */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 20%, transparent 80%, rgba(8,8,8,0.9) 100%)',
        }}/>

        {/* Loading state */}
        {!ready && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#080808',
          }}>
            <div style={{
              width: '40px', height: '1px',
              background: 'rgba(255,77,0,0.4)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: '#ff4d00',
                animation: 'loadPulse 1.5s ease-in-out infinite',
              }}/>
            </div>
          </div>
        )}

        {/* Scroll progress indicator — thin orange line at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px',
          width: `${progress * 100}%`,
          background: '#ff4d00',
          transition: 'width 0.05s linear',
          zIndex: 2,
        }}/>

        {/* Overlay text — fades out as you scroll */}
        <div style={{
          position: 'absolute', bottom: 'clamp(40px,6vh,80px)',
          left: 'clamp(20px,6vw,80px)', right: 'clamp(20px,6vw,80px)',
          zIndex: 2,
          opacity: Math.max(0, 1 - progress * 3),
          transform: `translateY(${progress * 40}px)`,
          transition: 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '4px', color: 'rgba(255,255,255,0.4)',
            display: 'block', marginBottom: '12px',
          }}>
            SCROLL TO EXPLORE
          </span>
          <div style={{
            width: '1px', height: '48px',
            background: 'linear-gradient(to bottom, rgba(255,77,0,0.8), transparent)',
            marginLeft: '2px',
          }}/>
        </div>

        {/* Centre brand mark — fades in at mid-scroll */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          opacity: Math.max(0, Math.min(1, (progress - 0.3) * 4)),
          transform: `scale(${0.9 + progress * 0.1})`,
          transition: 'none',
          pointerEvents: 'none',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Clash Display,Arial Black,sans-serif',
              fontWeight: 700, fontSize: 'clamp(48px,10vw,120px)',
              letterSpacing: '-4px', color: '#ffffff',
              lineHeight: 0.88, textShadow: '0 0 80px rgba(255,77,0,0.3)',
            }}>
              A<span style={{ color: '#ff4d00' }}>.</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '6px', color: 'rgba(255,255,255,0.35)',
              marginTop: '16px',
            }}>DESIGNAERIUM</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loadPulse {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(100%); }
        }
      `}</style>
    </section>
  )
}
