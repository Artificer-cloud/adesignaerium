'use client'
import { useEffect, useRef, useState } from 'react'

export default function FloatingPencil() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 80, y: 320 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    // Place it on right side initially
    pos.current = { x: window.innerWidth - 100, y: 260 }
    forceUpdate(n => n + 1)

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      pos.current = {
        x: clientX - offset.current.x,
        y: clientY - offset.current.y,
      }
      if (ref.current) {
        ref.current.style.left = pos.current.x + 'px'
        ref.current.style.top  = pos.current.y + 'px'
      }
    }
    const onUp = () => { dragging.current = false }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const rect = ref.current!.getBoundingClientRect()
    offset.current = { x: clientX - rect.left, y: clientY - rect.top }
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="floating-pencil"
      onMouseDown={onDown}
      onTouchStart={onDown}
      title="Drag me anywhere!"
      style={{
        left: pos.current.x,
        top:  pos.current.y,
        width: '52px',
        height: '52px',
      }}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Eraser top */}
        <rect x="16" y="2" width="20" height="8" rx="3" fill="#f4a0a0" stroke="#c97070" strokeWidth="1"/>
        {/* Metal band */}
        <rect x="15" y="9" width="22" height="4" rx="1" fill="#b0b8c1" stroke="#8a9099" strokeWidth="0.5"/>
        {/* Pencil body - yellow */}
        <rect x="15" y="12" width="22" height="28" rx="1" fill="#FFD54F" stroke="#E6B800" strokeWidth="0.8"/>
        {/* Wood grain lines on body */}
        <line x1="20" y1="14" x2="20" y2="38" stroke="#E6B800" strokeWidth="0.5" opacity="0.5"/>
        <line x1="26" y1="14" x2="26" y2="38" stroke="#E6B800" strokeWidth="0.5" opacity="0.5"/>
        <line x1="32" y1="14" x2="32" y2="38" stroke="#E6B800" strokeWidth="0.5" opacity="0.5"/>
        {/* Orange stripe accent */}
        <rect x="15" y="24" width="22" height="5" fill="#ff4d00" opacity="0.7"/>
        {/* Wood cone tip */}
        <path d="M15 40 L26 50 L37 40 Z" fill="#C8A96E" stroke="#a08040" strokeWidth="0.8"/>
        {/* Graphite tip */}
        <path d="M21 46 L26 50 L31 46 Z" fill="#555" stroke="#333" strokeWidth="0.5"/>
        {/* Shine on body */}
        <rect x="17" y="13" width="3" height="26" rx="1.5" fill="white" opacity="0.15"/>
      </svg>
    </div>
  )
}
