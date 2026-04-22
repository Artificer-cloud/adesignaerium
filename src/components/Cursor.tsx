'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf: number
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = mx+'px'; dotRef.current.style.top = my+'px' }
    }
    const loop = () => {
      rx += (mx-rx)*.1; ry += (my-ry)*.1
      if (ringRef.current) { ringRef.current.style.left = rx+'px'; ringRef.current.style.top = ry+'px' }
      raf = requestAnimationFrame(loop)
    }
    const onEnter = () => { dotRef.current?.classList.add('hovered'); ringRef.current?.classList.add('hovered') }
    const onLeave = () => { dotRef.current?.classList.remove('hovered'); ringRef.current?.classList.remove('hovered') }
    const onDown  = () => { dotRef.current?.classList.add('clicked'); ringRef.current?.classList.add('clicked') }
    const onUp    = () => { dotRef.current?.classList.remove('clicked'); ringRef.current?.classList.remove('clicked') }
    const attach  = () => { document.querySelectorAll('a,button,[data-cursor]').forEach(el => { el.addEventListener('mouseenter',onEnter); el.addEventListener('mouseleave',onLeave) }) }
    window.addEventListener('mousemove',onMove)
    window.addEventListener('mousedown',onDown)
    window.addEventListener('mouseup',onUp)
    raf = requestAnimationFrame(loop)
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body,{childList:true,subtree:true})
    return () => { window.removeEventListener('mousemove',onMove); window.removeEventListener('mousedown',onDown); window.removeEventListener('mouseup',onUp); cancelAnimationFrame(raf); obs.disconnect() }
  },[])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
