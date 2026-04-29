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

  if (!mounted) return <div style={{ width: '44px', height: '90px' }} />

  const isDark  = theme === 'dark'
  const pull    = stretch * 36
  const cordLen = 28 + pull

  const bulbFill = glow ? '#fffbe6' : (isDark ? '#ffe066' : '#c0b090')
  const rayColor = glow ? '#ffcc00' : (isDark ? '#ffcc00' : '#8a7a55')

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
      <svg width="44" height="130" viewBox="0 0 44 130" style={{ overflow: 'visible' }}>
        {/* Ceiling mount */}
        <rect x="14" y="0" width="16" height="3" rx="1.5" fill="var(--border)" />
        <rect x="20" y="3" width="4" height="4" rx="1" fill="var(--dim)" />

        {/* Swinging lamp group */}
        <g style={{
          transformOrigin: '22px 0px',
          animation: pulling ? 'none' : 'lampSwing 3s cubic-bezier(.45,.05,.55,.95) infinite',
          transform: snap ? 'rotate(0deg)' : undefined,
          transition: snap ? 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        }}>
          {/* Cord */}
          <line x1="22" y1="6" x2="22" y2={6 + cordLen}
            stroke={isDark ? '#ff4d00' : '#777'}
            strokeWidth="1.5" strokeDasharray="3,3" strokeLinecap="round"
            style={{ transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}
          />
          {/* Pull ring */}
          <circle cx="22" cy={6 + cordLen + 5} r="4.5"
            fill="none" stroke="#ff4d00" strokeWidth="1.8"
            style={{
              transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
              animation: pulling ? 'none' : 'ringPulse 3s ease-in-out infinite',
            }}
          />

          {/* Lamp shade + bulb group */}
          <g style={{
            transform: `translateY(${6 + cordLen + 10}px)`,
            transition: snap ? 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          }}>
            {/* Shade */}
            <path d="M8,0 L2,24 L42,24 L36,0 Z" fill="#ff4d00" opacity="0.93" />
            <path d="M8,0 L36,0" stroke="#cc3d00" strokeWidth="1" />
            <path d="M2,24 L42,24" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            {glow && <path d="M8,0 L2,24 L42,24 L36,0 Z" fill="rgba(255,249,200,0.15)" />}

            {/* Glow halo behind bulb */}
            <circle cx="22" cy="35" r={glow ? 18 : (isDark ? 13 : 9)}
              fill={glow ? 'rgba(255,249,200,0.3)' : (isDark ? 'rgba(255,224,102,0.1)' : 'transparent')}
              style={{ transition: 'all 0.5s ease' }}
            />

            {/* BULB — sun icon (dark mode) */}
            {isDark && (
              <g>
                {[0,45,90,135,180,225,270,315].map((angle) => {
                  const rad = (angle * Math.PI) / 180
                  return <line key={angle}
                    x1={22 + Math.cos(rad) * 11} y1={35 + Math.sin(rad) * 11}
                    x2={22 + Math.cos(rad) * 14.5} y2={35 + Math.sin(rad) * 14.5}
                    stroke={rayColor} strokeWidth="1.5" strokeLinecap="round"
                    style={{ transition: 'stroke 0.4s ease' }}
                  />
                })}
                <circle cx="22" cy="35" r="8" fill={bulbFill}
                  style={{ transition: 'fill 0.4s ease', filter: glow ? 'drop-shadow(0 0 5px #ffe066)' : 'none' }}
                />
              </g>
            )}

            {/* BULB — moon icon (light mode) */}
            {!isDark && (
              <g>
                <circle cx="22" cy="35" r="8" fill={bulbFill} style={{ transition: 'fill 0.4s ease' }} />
                <circle cx="25.5" cy="32" r="6.5" fill="var(--surface)" style={{ transition: 'fill 0.4s ease' }} />
                <circle cx="33" cy="28" r="0.9" fill="#8a8070" opacity="0.6" />
                <circle cx="30" cy="23" r="0.6" fill="#8a8070" opacity="0.4" />
              </g>
            )}
          </g>
        </g>

        {/* Bounce arrow */}
        <g style={{ animation: 'arrowBounce 1.6s ease-in-out infinite' }}>
          <line x1="22" y1="102" x2="22" y2="111" stroke="#ff4d00" strokeWidth="1.4" strokeLinecap="round" />
          <polyline points="17,107 22,113 27,107" fill="none" stroke="#ff4d00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <text x="22" y="127" textAnchor="middle" fill="#ff4d00" fontSize="7" fontFamily="monospace" letterSpacing="1.5">DRAG</text>
      </svg>

      <style>{`
        @keyframes lampSwing {
          0%,100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg);  }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(5px); }
        }
      `}</style>
    </div>
  )
}
