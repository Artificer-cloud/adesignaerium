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

  // Icon sits at this center inside the swinging group
  const cx = 22
  const cy = 42

  // Colours
  const O  = '#ff4d00'                          // orange
  const Od = isDark ? O : 'rgba(255,77,0,0.5)' // orange dimmed in light mode

  // Cog: 10 teeth, inner radius 10, outer 13.5, body fill orange
  const COG_TEETH    = 10
  const COG_INNER    = 10
  const COG_OUTER    = 13.5
  const TOOTH_HALF   = (Math.PI / COG_TEETH) * 0.42  // tooth arc half-width

  const cogPath = Array.from({ length: COG_TEETH }, (_, i) => {
    const a0 = (i / COG_TEETH) * Math.PI * 2 - Math.PI / 2
    const a1 = a0 + TOOTH_HALF
    const a2 = a0 + (Math.PI / COG_TEETH) - TOOTH_HALF
    const a3 = a0 + (Math.PI / COG_TEETH)
    const p = (r: number, a: number) => `${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`
    return `L${p(COG_INNER, a0)} L${p(COG_OUTER, a1)} L${p(COG_OUTER, a2)} L${p(COG_INNER, a3)}`
  }).join(' ')
  const cogD = `M${(cx + COG_INNER).toFixed(2)},${cy.toFixed(2)} ${cogPath} Z`

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
      <svg width="44" height="136" viewBox="0 0 44 136" style={{ overflow: 'visible' }}>

        {/* ── Ceiling mount ── */}
        <rect x="13" y="0" width="18" height="3" rx="1.5" fill="var(--border)" />
        <rect x="20" y="3" width="4"  height="4" rx="1"   fill="var(--dim)"    />

        {/* ── Swinging group ── */}
        <g style={{
          transformOrigin: '22px 0px',
          animation: pulling ? 'none' : 'lampSwing 3s cubic-bezier(.45,.05,.55,.95) infinite',
          transform: snap ? 'rotate(0deg)' : undefined,
          transition: snap ? 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        }}>

          {/* Cord */}
          <line x1="22" y1="6" x2="22" y2={6 + cordLen}
            stroke={isDark ? O : '#666'}
            strokeWidth="1.5" strokeDasharray="3,3" strokeLinecap="round"
            style={{ transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}
          />

          {/* Pull ring */}
          <circle cx="22" cy={6 + cordLen + 5} r="4.5"
            fill="none" stroke={O} strokeWidth="1.8"
            style={{
              transition: snap ? 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
              animation: pulling ? 'none' : 'ringPulse 3s ease-in-out infinite',
            }}
          />

          {/* ── Icon group — translates down with cord ── */}
          <g style={{
            transform: `translateY(${6 + cordLen + 10}px)`,
            transition: snap ? 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          }}>

            {/* ① Vertical stem connecting cord to icon */}
            <line x1={cx} y1="0" x2={cx} y2="28"
              stroke={Od} strokeWidth="1.8" strokeLinecap="round"
              style={{ transition: 'stroke 0.4s ease' }}
            />

            {/* ② Three concentric halo rings */}
            <circle cx={cx} cy={cy} r="20"
              fill="none"
              stroke={isDark ? 'rgba(255,77,0,0.18)' : 'rgba(255,77,0,0.08)'}
              strokeWidth="1"
              style={{ transition: 'all 0.5s ease' }}
            />
            <circle cx={cx} cy={cy} r="16.5"
              fill="none"
              stroke={isDark ? 'rgba(255,77,0,0.28)' : 'rgba(255,77,0,0.12)'}
              strokeWidth="1"
              style={{ transition: 'all 0.5s ease' }}
            />
            <circle cx={cx} cy={cy} r="13.5"
              fill="none"
              stroke={isDark ? 'rgba(255,77,0,0.42)' : 'rgba(255,77,0,0.2)'}
              strokeWidth="1.2"
              style={{ transition: 'all 0.5s ease' }}
            />

            {/* ③ Glow halo burst on toggle */}
            {glow && (
              <circle cx={cx} cy={cy} r="22"
                fill="rgba(255,100,0,0.18)"
                style={{ transition: 'all 0.5s ease' }}
              />
            )}

            {/* ④ Cog/gear shape — solid orange, teeth on outside */}
            <path d={cogD}
              fill={Od}
              style={{ transition: 'fill 0.4s ease' }}
            />

            {/* ⑤ Inner circle cutout (dark hole inside cog) */}
            <circle cx={cx} cy={cy} r="7.5"
              fill={isDark ? '#0a0808' : '#f0ede8'}
              style={{ transition: 'fill 0.4s ease' }}
            />

            {/* ⑥ SUN — shown in dark mode */}
            {isDark && (
              <g>
                {/* 8 rays */}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = (i / 8) * Math.PI * 2 - Math.PI / 2
                  return (
                    <line key={i}
                      x1={cx + Math.cos(a) * 3.5} y1={cy + Math.sin(a) * 3.5}
                      x2={cx + Math.cos(a) * 6.2} y2={cy + Math.sin(a) * 6.2}
                      stroke={glow ? '#ffe066' : O}
                      strokeWidth="1.3" strokeLinecap="round"
                      style={{ transition: 'stroke 0.4s ease' }}
                    />
                  )
                })}
                {/* Sun core */}
                <circle cx={cx} cy={cy} r="2.8"
                  fill={glow ? '#ffe066' : O}
                  style={{ transition: 'fill 0.4s ease', filter: glow ? 'drop-shadow(0 0 3px #ffe066)' : 'none' }}
                />
              </g>
            )}

            {/* ⑦ MOON — shown in light mode */}
            {!isDark && (
              <g>
                {/* Moon body */}
                <circle cx={cx - 0.8} cy={cy} r="4.2"
                  fill="rgba(255,77,0,0.5)"
                  style={{ transition: 'fill 0.4s ease' }}
                />
                {/* Crescent cutout */}
                <circle cx={cx + 1.8} cy={cy - 1.2} r="3.2"
                  fill={isDark ? '#0a0808' : '#f0ede8'}
                  style={{ transition: 'fill 0.4s ease' }}
                />
              </g>
            )}

          </g>
        </g>

        {/* ── Bounce arrow ── */}
        <g style={{ animation: 'arrowBounce 1.6s ease-in-out infinite' }}>
          <line x1="22" y1="108" x2="22" y2="117" stroke={O} strokeWidth="1.4" strokeLinecap="round" />
          <polyline points="17,113 22,119 27,113" fill="none" stroke={O} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <text x="22" y="132" textAnchor="middle" fill={O} fontSize="7" fontFamily="monospace" letterSpacing="1.5">DRAG</text>

      </svg>

      <style>{`
        @keyframes lampSwing {
          0%,100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg);  }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 1;   }
          50%      { opacity: 0.3; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(5px); }
        }
      `}</style>
    </div>
  )
}