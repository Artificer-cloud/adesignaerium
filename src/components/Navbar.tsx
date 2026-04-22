'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href:'/',        label:'Home'    },
  { href:'/work',    label:'Work'    },
  { href:'/vault',   label:'Vault'   },
  { href:'/about',   label:'About'   },
  { href:'/contact', label:'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'0 clamp(16px,4vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between', height:'72px', background:scrolled?'var(--nav-bg)':'transparent', backdropFilter:scrolled?'blur(20px)':'none', borderBottom:scrolled?'1px solid var(--border)':'1px solid transparent', transition:'all .5s cubic-bezier(.23,1,.32,1)' }}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <span style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'22px',color:'var(--bone)',letterSpacing:'-1px',lineHeight:1}}>
            A<span style={{color:'var(--orange)'}}>.</span>
          </span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'3px',color:'var(--muted)'}}>DESIGNAERIUM</span>
        </Link>

        <div className="desktop-nav">
          {LINKS.map(({href,label}) => (
            <Link key={href} href={href} className={`nav-link hover-line${pathname===href?' active':''}`}>{label}</Link>
          ))}
          <div style={{display:'flex',alignItems:'flex-start',paddingTop:'6px'}}><ThemeToggle /></div>
          <a href="mailto:abhijeethpiyush4@gmail.com" className="hire-btn">Hire Me →</a>
        </div>

        <div className="mobile-nav">
          <div style={{display:'flex',alignItems:'flex-start',paddingTop:'6px'}}><ThemeToggle /></div>
          <button onClick={()=>setOpen(o=>!o)} aria-label="Toggle menu" style={{background:'transparent',border:'none',cursor:'pointer',padding:'4px',display:'flex',flexDirection:'column',gap:'5px'}}>
            {[0,1,2].map(i=>(
              <span key={i} style={{ display:'block', height:'1.5px', width:i===1?'16px':'22px', background:i===1?'var(--orange)':'var(--bone)', transition:'all .4s cubic-bezier(.23,1,.32,1)', transform:open&&i===0?'rotate(45deg) translate(4px,5px)':open&&i===2?'rotate(-45deg) translate(4px,-5px)':'none', opacity:open&&i===1?0:1 }}/>
            ))}
          </button>
        </div>
      </nav>

      <div style={{ position:'fixed', inset:0, zIndex:40, background:'var(--ink)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:open?1:0, pointerEvents:open?'auto':'none', transform:open?'translateY(0)':'translateY(-20px)', transition:'all .5s cubic-bezier(.23,1,.32,1)' }}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'28px'}}>
          {LINKS.map(({href,label},i)=>(
            <Link key={href} href={href} style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(36px,10vw,64px)', letterSpacing:'-2px', color:pathname===href?'var(--orange)':'var(--bone)', opacity:open?1:0, transform:open?'translateY(0)':'translateY(20px)', transition:`all .5s cubic-bezier(.23,1,.32,1) ${i*.07}s`, lineHeight:1 }}>{label}</Link>
          ))}
          <a href="mailto:abhijeethpiyush4@gmail.com" style={{fontFamily:'var(--font-mono)',fontSize:'12px',letterSpacing:'3px',color:'var(--orange)',marginTop:'8px',opacity:open?1:0,transition:'opacity .5s .38s'}}>HIRE ME →</a>
        </div>
      </div>

      <style>{`
        .desktop-nav { display:flex; align-items:center; gap:clamp(20px,2.5vw,32px); }
        .mobile-nav  { display:none; align-items:center; gap:12px; }
        .hire-btn { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; color:var(--orange); border:1px solid rgba(255,77,0,0.4); padding:8px 18px; border-radius:2px; transition:all .3s; text-transform:uppercase; white-space:nowrap; }
        .hire-btn:hover { background:var(--orange); color:var(--ink); }
        @media (max-width:768px) { .desktop-nav{display:none!important} .mobile-nav{display:flex!important} }
      `}</style>
    </>
  )
}
