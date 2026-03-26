'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/',       label: 'Home'    },
  { href: '/work',   label: 'Work'    },
  { href: '/vault',  label: 'Vault'   },
  { href: '/about',  label: 'About'   },
  { href: '/contact',label: 'Contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:50,
        padding:'clamp(14px,2vh,20px) clamp(16px,4vw,40px)',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        background:    scrolled ? 'rgba(8,8,8,0.9)'   : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
        transition: 'all .5s cubic-bezier(.23,1,.32,1)',
      }}>
        {/* Logo */}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <span style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'20px',color:'var(--bone)',letterSpacing:'-1px',lineHeight:1}}>
            A<span style={{color:'var(--orange)'}}>.</span>
          </span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'3px',color:'var(--muted)'}}>DESIGNAERIUM</span>
        </Link>

        {/* Desktop nav */}
        <div style={{display:'flex',alignItems:'center',gap:'clamp(20px,2.5vw,32px)'}} className="desktop-nav">
          {links.map(({href,label}) => (
            <Link key={href} href={href}
              className={`nav-link hover-line ${pathname===href?'active':''}`}
              style={{textDecoration:'none'}}>
              {label}
            </Link>
          ))}
          <a href="mailto:abhijeethpiyush4@gmail.com" style={{
            fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'2px',color:'var(--orange)',
            border:'1px solid rgba(255,77,0,0.4)',padding:'8px 18px',borderRadius:'2px',
            transition:'all .3s',textDecoration:'none',textTransform:'uppercase',
          }}
          onMouseEnter={e=>{const t=e.currentTarget as HTMLElement;t.style.background='var(--orange)';t.style.color='var(--ink)'}}
          onMouseLeave={e=>{const t=e.currentTarget as HTMLElement;t.style.background='transparent';t.style.color='var(--orange)'}}>
            Hire Me →
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
          style={{background:'transparent',border:'none',cursor:'pointer',padding:'4px',display:'none'}}
          className="mobile-menu-btn">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:'block',height:'1.5px',marginBottom:'5px',
              background: i===1?'var(--orange)':'var(--bone)',
              width: i===1?'16px':'22px',
              transition:'all .4s cubic-bezier(.23,1,.32,1)',
              transform: open&&i===0?'rotate(45deg) translate(4px,5px)': open&&i===2?'rotate(-45deg) translate(4px,-5px)':'none',
              opacity: open&&i===1?0:1,
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:'fixed',inset:0,zIndex:40,background:'var(--ink)',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        opacity:open?1:0,pointerEvents:open?'auto':'none',
        transform:open?'translateY(0)':'translateY(-20px)',
        transition:'all .5s cubic-bezier(.23,1,.32,1)',
      }}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'28px'}}>
          {links.map(({href,label},i) => (
            <Link key={href} href={href} style={{
              fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,
              fontSize:'clamp(36px,10vw,64px)',letterSpacing:'-2px',
              color: pathname===href?'var(--orange)':'var(--bone)',
              opacity:open?1:0,
              transform:open?'translateY(0)':'translateY(20px)',
              transition:`all .5s cubic-bezier(.23,1,.32,1) ${i*.07}s`,
              textDecoration:'none',lineHeight:1,
            }}>
              {label}
            </Link>
          ))}
          <a href="mailto:abhijeethpiyush4@gmail.com" style={{
            fontFamily:'var(--font-mono)',fontSize:'12px',letterSpacing:'3px',color:'var(--orange)',
            marginTop:'8px',opacity:open?1:0,transition:'opacity .5s .38s',textDecoration:'none',
          }}>HIRE ME →</a>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
