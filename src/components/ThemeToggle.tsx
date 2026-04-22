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
    isDragging.current = true; startY.current = e.clientY
    setPulling(true); setSnap(false)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    setStretch(Math.min(1, Math.max(0, e.clientY - startY.current) / 80))
  }
  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false; setPulling(false)
    if (stretch > 0.35) {
      setSnap(true); setGlow(true)
      const next = theme === 'dark' ? 'light' : 'dark'
      setTimeout(() => { setTheme(next); document.documentElement.setAttribute('data-theme',next); localStorage.setItem('theme',next) }, 120)
      setTimeout(() => { setSnap(false); setStretch(0) }, 400)
      setTimeout(() => setGlow(false), 700)
    } else {
      setSnap(true)
      setTimeout(() => { setSnap(false); setStretch(0) }, 350)
    }
  }

  if (!mounted) return <div style={{width:'28px',height:'60px'}}/>

  const isDark    = theme === 'dark'
  const lineLen   = 24 + stretch * 32
  const bumpY     = stretch * 8
  const cordColor = isDark ? '#ff4d00' : '#333'
  const bulbFill  = isDark ? (glow ? '#fff9e6' : '#ede8dd') : (glow ? '#ff4d00' : '#0a0a0a')

  return (
    <div
      aria-label={`Switch to ${isDark?'light':'dark'} mode`}
      style={{ position:'relative', width:'28px', height:'60px', display:'flex', flexDirection:'column', alignItems:'center', cursor:pulling?'grabbing':'grab', userSelect:'none', touchAction:'none', flexShrink:0 }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
    >
      <svg width="28" height="60" viewBox="0 0 28 60" style={{ overflow:'visible', transition:snap?'all 0.35s cubic-bezier(0.34,1.56,0.64,1)':'none' }}>
        {glow && <circle cx="14" cy={8+lineLen} r="18" fill={isDark?'rgba(255,249,200,0.5)':'rgba(255,77,0,0.35)'} style={{animation:'glowPulse 0.6s ease-out forwards'}}/>}
        <path d={`M 14 0 Q ${14+bumpY*1.5} ${lineLen*0.5} 14 ${lineLen}`} stroke={cordColor} strokeWidth={pulling?'2.5':'2'} strokeLinecap="round" fill="none" style={{transition:snap?'all 0.4s cubic-bezier(0.34,1.56,0.64,1)':'stroke-width 0.2s'}}/>
        <g style={{transition:snap?'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)':'none', transform:`translateY(${lineLen}px)`}}>
          <circle cx="14" cy="8" r="13" fill="none" stroke={cordColor} strokeWidth="1" style={{animation:'cordBlink 2s ease-in-out infinite'}}/>
          <circle cx="14" cy="8" r="17" fill="none" stroke={cordColor} strokeWidth="0.5" opacity="0.3" style={{animation:'cordBlink 2s ease-in-out infinite 0.5s'}}/>
          <circle cx="14" cy="8" r={pulling?9:8} fill={bulbFill} stroke={cordColor} strokeWidth="2" style={{transition:'r 0.15s, fill 0.4s ease'}}/>
          {isDark ? (
            <>
              <circle cx="14" cy="8" r="3" fill={cordColor}/>
              {[0,45,90,135,180,225,270,315].map((deg,i) => {
                const rad=(deg*Math.PI)/180
                return <line key={i} x1={14+Math.cos(rad)*5} y1={8+Math.sin(rad)*5} x2={14+Math.cos(rad)*6.5} y2={8+Math.sin(rad)*6.5} stroke={cordColor} strokeWidth="1.2" strokeLinecap="round"/>
              })}
            </>
          ) : (
            <path d="M 15.5 4.5 A 4 4 0 1 1 12 11 A 2.8 2.8 0 0 0 15.5 4.5 Z" fill={isDark?'#ede8dd':'#f6eee3'} stroke="none"/>
          )}
        </g>
      </svg>
    </div>
  )
}
