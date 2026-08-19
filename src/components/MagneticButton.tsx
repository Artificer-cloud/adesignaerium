'use client'
import { useRef, useState, ReactNode, CSSProperties } from 'react'
import Link from 'next/link'

interface Props {
  children:   ReactNode
  href?:      string
  onClick?:   () => void
  style?:     CSSProperties
  className?: string
  strength?:  number
  external?:  boolean
  type?:      'button' | 'submit'
}

export default function MagneticButton({
  children, href, onClick, style, className, strength = 0.32, external, type = 'button',
}: Props) {
  const ref                   = useRef<HTMLElement>(null)
  const [pos,   setPos]       = useState({ x: 0, y: 0 })
  const [hover, setHover]     = useState(false)

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - r.left - r.width  / 2) * strength,
      y: (e.clientY - r.top  - r.height / 2) * strength,
    })
  }
  const leave = () => { setPos({ x:0, y:0 }); setHover(false) }
  const enter = () => setHover(true)

  const magnetStyle: CSSProperties = {
    ...style,
    transform:  `translate(${pos.x}px, ${pos.y}px)`,
    transition: hover
      ? 'transform 0.12s linear'
      : 'transform 0.65s cubic-bezier(0.23,1,0.32,1)',
    willChange: 'transform',
    display:    'inline-block',
  }

  const events = { onMouseMove:move, onMouseEnter:enter, onMouseLeave:leave }

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href} target="_blank" rel="noopener noreferrer"
          className={className} style={magnetStyle} {...events}>
          {children}
        </a>
      )
    }
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href} className={className} style={magnetStyle} {...events}>
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type} className={className} style={magnetStyle}
      onClick={onClick} {...events}>
      {children}
    </button>
  )
}
