'use client'
import { useEffect, useState, useRef } from 'react'

export default function ThemeToggle() {
  const [theme,   setTheme]   = useState<'dark'|'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [pulling, setPulling] = useState(false)
  const [stretch, setStretch] = useState(0)
  const [snap,    setSnap]    = useState(false)
  const [glow,    setGlow]    = useState(false)
  const isDragging = useRef(false)
  const startY     = useRef(0)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as 'dark'|'light'|null
    const t = saved || 'dark'
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    setPulling(true)
    setSnap(false)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const delta = Math.max(0, e.clientY - startY.current)
    setStretch(Math.min(1, delta / 80))
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    setPulling(false)
    if (stretch > 0.35) {
      setSnap(true)
      setGlow(true)
      const next = theme === 'dark' ? 'light' : 'dark'
      setTimeout(() => {
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('theme', next)
      }, 120)
      setTimeout(() => { setSnap(false); setStretch(0) }, 400)
      setTimeout(() => setGlow(false), 700)
    } else {
      setSnap(true)
      setTimeout(() => { setSnap(false); setStretch(0) }, 350)
    }
  }

  if (!mounted) return <div style={{ width: '44px', height: '80px' }} />

  const isDark  = theme === 'dark'
  const pull    = stretch * 36
  const cordLen = 32 + pull

  return (
    <div
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title="Drag down to switch theme"
      style={{
        position: 'relative',
        width: '44px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: pulling ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        flexShrink: 0,
        paddingTop: '4px',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <svg
        width="44"
        height="120"
        viewBox="0 0 44 120"
        style={{ overflow: 'visible' }}
      >
        {/* Ceiling dot */}
        <rect x="16" y="0" width="12" height="3" rx="1.5" fill="var(--border)" />

        {/* Swinging lamp group */}
        <g
          style={{
            transformOrigin: '22px 0px',
            animation: pulling ? 'none' : 'lampSwing 2.6s cubic-bezier(.45,.05,.55,.95) infinite',
            transform: snap ? 'rotate(0deg)' : undefined,
            transition: snap ? 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          }}
        >
          {/* Cord — stretches when dragging */}
          <line
            x1="22" y1="3"
            x2="22" y2={3 + cordLen}
            stroke={isDark ? '#ff4d00' : '#888'}
            strokeWidth="1.5"
            strokeDasharray="4,3"
            strokeLinecap="round"
            style={{ transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}
          />

          {/* Pull ring */}
          <circle
            cx="22" cy={3 + cordLen + 5}
            r="5"
            fill="none"
            stroke="#ff4d00"
            strokeWidth="2"
            style={{
              transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
              animation: pulling ? 'none' : 'ringPulse 2.6s ease-in-out infinite',
            }}
          />

          {/* Lamp shade */}
          <g style={{
            transform: `translateY(${3 + cordLen + 10}px)`,
            transition: snap ? 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          }}>
            <path d="M6,0 L0,28 L44,28 L38,0 Z" fill="#ff4d00" opacity="0.92" />
            <path d="M6,0 L38,0" stroke="#cc3d00" strokeWidth="1.2" />
            {/* Bulb */}
            <circle cx="22" cy="34" r="8"
              fill={glow ? '#fff9e6' : (isDark ? '#ffe066' : '#555')}
              style={{ transition: 'fill 0.4s ease' }}
            />
            {/* Glow halo */}
            <circle cx="22" cy="34" r="16"
              fill={glow ? 'rgba(255,249,200,0.4)' : (isDark ? 'rgba(255,224,102,0.15)' : 'transparent')}
              style={{ transition: 'all 0.4s ease' }}
            />
          </g>
        </g>

        {/* Bounce arrow hint — below lamp, always visible */}
        <g style={{ animation: 'arrowBounce 1.6s ease-in-out infinite' }}>
          <path
            d="M22,98 L22,108 M17,104 L22,110 L27,104"
            stroke="#ff4d00"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* DRAG DOWN text */}
        <text x="22" y="118" textAnchor="middle" fill="#ff4d00"
          fontSize="7" fontFamily="monospace" letterSpacing="1.5">
          DRAG DOWN
        </text>
      </svg>

      {/* "to switch theme" below svg */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '7px',
        letterSpacing: '1px',
        color: 'var(--dim)',
        whiteSpace: 'nowrap',
        marginTop: '2px',
      }}>
        to switch theme
      </span>

      <style>{`
        @keyframes lampSwing {
          0%,100% { transform: rotate(-8deg); }
          50%      { transform: rotate(8deg);  }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 1;   r: 5; }
          50%      { opacity: 0.5; r: 6; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(5px); }
        }
      `}</style>
    </div>
  )
}