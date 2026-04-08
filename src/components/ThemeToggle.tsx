'use client'
import { useEffect, useState, useRef } from 'react'

export default function ThemeToggle() {
  const [theme,   setTheme]   = useState<'dark'|'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [pulling, setPulling] = useState(false)
  const [stretch, setStretch] = useState(0)   // 0–1 how far pulled
  const [snap,    setSnap]    = useState(false)
  const [glow,    setGlow]    = useState(false)
  const isDragging = useRef(false)
  const startY     = useRef(0)
  const btnRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as 'dark'|'light'|null
    const t = saved || 'dark'
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }, [])

  /* ── pointer drag logic ── */
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
    const s = Math.min(1, delta / 80) // fully pulled at 80px
    setStretch(s)
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    setPulling(false)

    if (stretch > 0.35) {
      // Trigger toggle
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
      // Snap back without toggle
      setSnap(true)
      setTimeout(() => { setSnap(false); setStretch(0) }, 350)
    }
  }

  if (!mounted) return <div style={{width:'32px',height:'64px'}}/>

  const isDark    = theme === 'dark'
  const lineLen   = 28 + stretch * 36   // base 28px, pulls to 64px
  const bumpY     = stretch * 8          // slight wobble on cord
  const handleY   = lineLen
  const cordColor = isDark ? '#ff4d00' : '#333'
  const bulbColor = isDark
    ? (glow ? '#fff9e6' : '#ede8dd')
    : (glow ? '#ff4d00' : '#0a0a0a')
  const glowColor = isDark ? 'rgba(255,249,200,0.6)' : 'rgba(255,77,0,0.4)'

  return (
    <div
      ref={btnRef}
      title={`Switch to ${isDark?'light':'dark'} mode`}
      aria-label={`Switch to ${isDark?'light':'dark'} mode`}
      style={{
        position: 'relative',
        width: '32px',
        height: '72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: pulling ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        flexShrink: 0,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <svg
        width="32"
        height="72"
        viewBox="0 0 32 72"
        style={{
          overflow: 'visible',
          transition: snap ? 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        }}
      >
        {/* Glow when toggled */}
        {glow && (
          <circle
            cx="16"
            cy={8 + handleY}
            r="18"
            fill={glowColor}
            style={{ animation: 'glowPulse 0.6s ease-out forwards' }}
          />
        )}

        {/* Cord / line — stretches with bezier curve for organic feel */}
        <path
          d={`M 16 0 Q ${16 + bumpY * 1.5} ${lineLen * 0.5} 16 ${lineLen}`}
          stroke={cordColor}
          strokeWidth={pulling ? '2.5' : '2'}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: snap
              ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)'
              : 'stroke-width 0.2s',
          }}
        />

        {/* Handle — the pull ring */}
        <g
          style={{
            transition: snap
              ? 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)'
              : 'none',
            transform: `translateY(${handleY}px)`,
          }}
        >
          {/* Outer ring */}
          <circle
            cx="16"
            cy="8"
            r={pulling ? 9 : 8}
            fill={bulbColor}
            stroke={cordColor}
            strokeWidth="2"
            style={{ transition: 'r 0.15s, fill 0.4s ease' }}
          />

          {/* Inner detail — sun rays when dark (click for light), moon when light */}
          {isDark ? (
            /* Sun symbol inside — shows "switch to light" */
            <>
              <circle cx="16" cy="8" r="3.5" fill={cordColor} />
              {[0,45,90,135,180,225,270,315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180
                const x1 = 16 + Math.cos(rad) * 5.5
                const y1 = 8  + Math.sin(rad) * 5.5
                const x2 = 16 + Math.cos(rad) * 7
                const y2 = 8  + Math.sin(rad) * 7
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={cordColor} strokeWidth="1.2" strokeLinecap="round"/>
              })}
            </>
          ) : (
            /* Moon symbol inside — shows "switch to dark" */
            <path
              d="M 17.5 4.5 A 4 4 0 1 1 14 11 A 2.8 2.8 0 0 0 17.5 4.5 Z"
              fill={isDark ? '#ede8dd' : '#f6eee3'}
              stroke="none"
            />
          )}
        </g>

        {/* Pull indicator dots when hovering — shows direction */}
        {!pulling && (
          <>
            <circle cx="16" cy={lineLen + 22} r="1.5" fill={cordColor} opacity="0.3"/>
            <circle cx="16" cy={lineLen + 28} r="1"   fill={cordColor} opacity="0.2"/>
            <circle cx="16" cy={lineLen + 33} r="0.8" fill={cordColor} opacity="0.1"/>
          </>
        )}
      </svg>

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '7px',
        letterSpacing: '1px',
        color: 'var(--dim)',
        marginTop: '4px',
        textTransform: 'uppercase',
        opacity: pulling ? 0 : 0.6,
        transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
      }}>
        {isDark ? 'PULL' : 'PULL'}
      </span>

      <style>{`
        @keyframes glowPulse {
          0%   { opacity: 0.8; r: 12; }
          50%  { opacity: 0.5; r: 22; }
          100% { opacity: 0;   r: 28; }
        }
      `}</style>
    </div>
  )
}
