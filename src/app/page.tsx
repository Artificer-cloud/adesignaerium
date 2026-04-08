'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

const FONT_CYCLE = [
  { font:'Georgia,serif',                          weight:'400', style:'normal', color:'var(--bone)'   },
  { font:'Impact,Arial Black,sans-serif',          weight:'900', style:'normal', color:'var(--muted)'  },
  { font:'Courier New,monospace',                  weight:'700', style:'normal', color:'var(--orange)' },
  { font:'Times New Roman,serif',                  weight:'700', style:'italic', color:'var(--bone)'   },
  { font:'Arial Narrow,Arial,sans-serif',          weight:'700', style:'normal', color:'var(--muted)'  },
  { font:'Palatino Linotype,serif',                weight:'700', style:'italic', color:'var(--orange)' },
  { font:'Trebuchet MS,sans-serif',                weight:'700', style:'normal', color:'var(--bone)'   },
  { font:'Cormorant Garamond,Georgia,serif',       weight:'700', style:'italic', color:'var(--orange)' },
  { font:'Impact,Arial Black,sans-serif',          weight:'900', style:'normal', color:'var(--muted)'  },
  { font:'Clash Display,Arial Black,sans-serif',   weight:'700', style:'normal', color:'var(--bone)'   },
]
const SPEEDS = [65,60,55,60,55,65,55,60,65,0]

function useFontCycle(trigger: boolean) {
  const [idx,  setIdx]  = useState(0)
  const [done, setDone] = useState(false)
  const [vis,  setVis]  = useState(false)
  useEffect(() => {
    if (!trigger) return
    const t = setTimeout(() => {
      setVis(true)
      let i = 0
      const step = () => {
        setIdx(i)
        if (i < FONT_CYCLE.length - 1) { i++; setTimeout(step, SPEEDS[i] ?? 65) }
        else setDone(true)
      }
      step()
    }, 350)
    return () => clearTimeout(t)
  }, [trigger])
  return { fs: FONT_CYCLE[idx], done, vis }
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function Magnetic({ children, href }: { children: React.ReactNode; href?: string }) {
  const r = useRef<HTMLDivElement>(null)
  const mv = (e: React.MouseEvent) => {
    const rect = r.current!.getBoundingClientRect()
    r.current!.style.transform = `translate(${(e.clientX-rect.left-rect.width/2)*.28}px,${(e.clientY-rect.top-rect.height/2)*.28}px)`
  }
  const lv = () => { if (r.current) r.current.style.transform = 'translate(0,0)' }
  const inner = <div ref={r} onMouseMove={mv} onMouseLeave={lv} style={{transition:'transform .4s cubic-bezier(.23,1,.32,1)',display:'inline-block'}}>{children}</div>
  if (href) return <Link href={href}>{inner}</Link>
  return inner
}

function SectionArt({ v = 0 }: { v?: number }) {
  const arts = [
    <svg key={0} className="section-art" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" style={{opacity:.04}} aria-hidden>
      <circle cx="1220" cy="150" r="110" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="8 6"/>
      <circle cx="1220" cy="150" r="65" fill="none" stroke="#ff4d00" strokeWidth=".5" strokeDasharray="3 7"/>
      <path d="M0,700 Q350,620 700,700 Q1050,780 1400,700" fill="none" stroke="#ede8dd" strokeWidth="1" strokeDasharray="5 10"/>
      <path d="M60,60 L90,90 L78,112 L50,98 Z M90,90 L140,40" stroke="#ff4d00" strokeWidth="1.5" fill="none"/>
      {[0,1,2,3].map(i=><rect key={i} x={60+i*32} y={160+i*22} width="22" height="22" stroke="#ede8dd" strokeWidth=".8" fill="none" strokeDasharray="3 3"/>)}
      <path d="M120,680 C250,600 450,660 580,600 C710,540 820,600 940,560" stroke="#ff4d00" strokeWidth="1" fill="none" strokeDasharray="6 4"/>
    </svg>,
    <svg key={1} className="section-art" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style={{opacity:.04}} aria-hidden>
      {Array.from({length:10}).map((_,i)=><line key={`v${i}`} x1={140*i} y1={0} x2={140*i} y2={600} stroke="#ede8dd" strokeWidth=".5"/>)}
      {Array.from({length:6}).map((_,i)=><line key={`h${i}`} x1={0} y1={100*i} x2={1400} y2={100*i} stroke="#ede8dd" strokeWidth=".5"/>)}
      <rect x="60" y="60" width="300" height="180" rx="4" stroke="#ff4d00" strokeWidth="1" fill="none" strokeDasharray="6 4"/>
    </svg>,
    <svg key={2} className="section-art" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" style={{opacity:.03}} aria-hidden>
      <text x="700" y="420" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="500" fontWeight="900" stroke="#ff4d00" strokeWidth="1" fill="none">A</text>
      {Array.from({length:6}).map((_,i)=><line key={i} x1={0} y1={80+i*80} x2={1400} y2={80+i*80} stroke="#ede8dd" strokeWidth=".4" strokeDasharray="4 8"/>)}
    </svg>,
    <svg key={3} className="section-art" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" style={{opacity:.04}} aria-hidden>
      {Array.from({length:14}).map((_,i)=><line key={i} x1={-80+i*110} y1={0} x2={i*110-600} y2={600} stroke={i%2===0?'#ff4d00':'#ede8dd'} strokeWidth=".6"/>)}
      {[[220,250],[700,160],[1180,300]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x-22} y1={y} x2={x+22} y2={y} stroke="#ff4d00" strokeWidth="1"/>
          <line x1={x} y1={y-22} x2={x} y2={y+22} stroke="#ff4d00" strokeWidth="1"/>
        </g>
      ))}
    </svg>,
  ]
  return arts[v % arts.length]
}

function FontCycleName({ mounted }: { mounted: boolean }) {
  const { fs, done, vis } = useFontCycle(mounted)
  return (
    <div style={{opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(36px)',transition:'opacity .5s .2s, transform .5s .2s'}}>
      <span style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:500,fontSize:'clamp(18px,2.5vw,28px)',color:'var(--muted)',display:'block',marginBottom:'4px',letterSpacing:'1px',opacity:vis?1:0,transition:'opacity .4s ease'}}>
        Hi, I&apos;m
      </span>
      <h1 style={{lineHeight:.86,margin:0,position:'relative'}}>
        <span style={{
          display:'block',
          fontFamily:fs.font,
          fontWeight:fs.weight,
          fontStyle:fs.style,
          fontSize:'clamp(54px,11vw,150px)',
          letterSpacing:done?'-4px':'-2px',
          color:fs.color,
          opacity:vis?1:0,
          filter:done?'blur(0px)':'blur(0.5px)',
          transition:done
            ?'letter-spacing .5s cubic-bezier(.23,1,.32,1), color .2s, filter .3s'
            :'font-family .08s, color .08s, filter .1s',
        }}>
          Abhi.
        </span>
        <span style={{
          position:'absolute',bottom:'-4px',left:0,
          height:'3px',borderRadius:'2px',
          background:'var(--orange)',
          width:done?'clamp(54px,11vw,150px)':'0px',
          display:'block',
          transition:done?'width .6s cubic-bezier(.23,1,.32,1) .1s':'none',
        }}/>
      </h1>
    </div>
  )
}

const TICKER   = ['BRANDING','UI/UX DESIGN','AI VISUAL','PACKAGING','MOTION','PHOTOGRAPHY','E-COMMERCE','EDITORIAL','PROMPT ENGINEERING','ART DIRECTION']
const TAGLINES = ["If it looks average, I didn't make it.","Not trends. Timeless impact.","Every pixel has a purpose.","Where ideas become visual worlds."]
const FEATURED = [
  {id:'sipple',       title:'SIPPLE',       cat:'Branding · UI/UX · Web',  bg:'#060d18'},
  {id:'maison-valer', title:'MAISON VALÉR', cat:'Luxury · Editorial',       bg:'#100d04'},
  {id:'ecora',        title:'ECORA',        cat:'Sustainable · Web Design', bg:'#040f07'},
]
const STATS  = [{n:'7+',l:'Years'},{n:'100+',l:'Brands'},{n:'50+',l:'Projects'},{n:'100%',l:'Delivery'}]
const SKILLS = [
  {n:'Adobe Suite', s:'Ps · Ai · Id · Ae · Lr · Pr'},
  {n:'AI Tools',    s:'Midjourney · Sora · Higgsfield · OpenAI'},
  {n:'UI / UX',     s:'Figma · Wireframe · Prototype'},
  {n:'Motion',      s:'After Effects · Premiere · AI Video'},
  {n:'Branding',    s:'Identity · Packaging · Editorial'},
  {n:'Web Dev',     s:'Next.js · React · Vercel · Tailwind'},
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [tagIdx,  setTagIdx]  = useState(0)
  const [tagVis,  setTagVis]  = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  useScrollReveal()
  useEffect(()=>{ setMounted(true) },[])

  useEffect(()=>{
    const iv = setInterval(()=>{
      setTagVis(false)
      setTimeout(()=>{ setTagIdx(i=>(i+1)%TAGLINES.length); setTagVis(true) },400)
    },3400)
    return ()=>clearInterval(iv)
  },[])

  const handleHeroMouse = useCallback((e: React.MouseEvent)=>{
    const x=(e.clientX/window.innerWidth-.5)*16
    const y=(e.clientY/window.innerHeight-.5)*16
    heroRef.current?.querySelectorAll<SVGElement>('.pl').forEach((el,i)=>{
      el.style.transform=`translate(${x*(i+1)*.3}px,${y*(i+1)*.3}px)`
    })
  },[])

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} onMouseMove={handleHeroMouse}
        style={{minHeight:'100svh',background:'var(--ink)',position:'relative',overflow:'hidden',display:'flex',alignItems:'center'}}>
        <SectionArt v={0}/>

        <svg className="pl" aria-hidden style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.06,pointerEvents:'none',transition:'transform .08s ease-out'}} viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <circle cx="1260" cy="140" r="100" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="7 5"/>
          <circle cx="1260" cy="140" r="58" fill="none" stroke="#ff4d00" strokeWidth=".5" strokeDasharray="3 7"/>
        </svg>
        <svg className="pl" aria-hidden style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.04,pointerEvents:'none',transition:'transform .12s ease-out'}} viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <path d="M0,750 Q350,680 700,750 Q1050,820 1400,750" fill="none" stroke="#ede8dd" strokeWidth="1" strokeDasharray="5 10"/>
          <rect x="920" y="40" width="56" height="56" fill="none" stroke="#ede8dd" strokeWidth=".8" strokeDasharray="4 4" transform="rotate(18 948 68)"/>
        </svg>

        {/* Spinning badge */}
        <div className="animate-spin-slow" aria-hidden style={{position:'absolute',top:'clamp(72px,10vh,92px)',right:'clamp(16px,4vw,56px)',width:'80px',height:'80px',opacity:.2}}>
          <svg viewBox="0 0 100 100">
            <path id="circ" d="M50,6 a44,44 0 1,1 -0.01,0" fill="none"/>
            <text style={{fontFamily:'var(--font-mono)',fontSize:'10.5px',fill:'var(--orange)',letterSpacing:'1.5px'}}>
              <textPath href="#circ">SENIOR CREATIVE · DUBAI · 2026 ·</textPath>
            </text>
          </svg>
        </div>

        {/* Two-column layout */}
        <div style={{display:'grid',gridTemplateColumns:'1fr clamp(200px,32vw,460px)',gap:'clamp(24px,4vw,60px)',padding:'clamp(90px,12vh,130px) clamp(20px,6vw,80px) clamp(60px,8vh,100px)',maxWidth:'1400px',margin:'0 auto',width:'100%',alignItems:'center'}}>

          {/* LEFT */}
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'100px',padding:'6px 16px',marginBottom:'32px',fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'2px',color:'var(--muted)',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(16px)',transition:'all .7s cubic-bezier(.23,1,.32,1) .1s'}}>
              <span style={{width:'7px',height:'7px',background:'#22c55e',borderRadius:'50%',flexShrink:0,animation:'blink 2s ease-in-out infinite'}}/>
              AVAILABLE · DUBAI, UAE
            </div>

            <FontCycleName mounted={mounted}/>

            <div style={{height:'clamp(28px,3.5vw,44px)',overflow:'hidden',marginTop:'20px',opacity:mounted?1:0,transition:'opacity .9s .55s'}}>
              <p style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontSize:'clamp(16px,2vw,26px)',fontWeight:500,color:'var(--orange)',lineHeight:1.3,opacity:tagVis?1:0,transform:tagVis?'translateY(0)':'translateY(-12px)',transition:'all .4s cubic-bezier(.23,1,.32,1)'}}>
                {TAGLINES[tagIdx]}
              </p>
            </div>

            <p style={{fontFamily:'var(--font-body)',fontSize:'clamp(14px,1.6vw,18px)',color:'var(--muted)',lineHeight:1.7,marginTop:'20px',maxWidth:'520px',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(24px)',transition:'all .9s cubic-bezier(.23,1,.32,1) .65s'}}>
              Senior Creative Designer · 7+ years turning brands into visual worlds. Based in{' '}
              <span style={{color:'var(--bone)'}}>Dubai, UAE</span>.
            </p>

            <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginTop:'36px',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(24px)',transition:'all .9s cubic-bezier(.23,1,.32,1) .78s'}}>
              <Magnetic href="/work">
                <span style={{display:'block',background:'var(--orange)',color:'var(--ink)',fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:600,fontSize:'12px',letterSpacing:'2px',textTransform:'uppercase',padding:'clamp(12px,1.5vh,16px) clamp(24px,3vw,40px)',borderRadius:'2px'}}>View Work ↗</span>
              </Magnetic>
              <Magnetic href="/contact">
                <span style={{display:'block',border:'1px solid rgba(255,255,255,0.12)',color:'var(--bone)',fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',textTransform:'uppercase',padding:'clamp(12px,1.5vh,16px) clamp(24px,3vw,40px)',borderRadius:'2px'}}>Let&apos;s Talk</span>
              </Magnetic>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:'clamp(40px,6vh,72px)',borderTop:'1px solid var(--border)',paddingTop:'24px',maxWidth:'480px',opacity:mounted?1:0,transition:'opacity .9s 1.1s'}}>
              {STATS.map(({n,l})=>(
                <div key={l}>
                  <div style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(22px,3.5vw,44px)',color:'var(--orange)',lineHeight:1}}>{n}</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',color:'var(--dim)',letterSpacing:'1px',marginTop:'4px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Hero portrait, completely frameless */}
          <div style={{position:'relative',width:'100%',aspectRatio:'3/4',opacity:mounted?1:0,transform:mounted?'translateY(0)':'translateY(40px)',transition:'all 1.1s cubic-bezier(.23,1,.32,1) .6s'}}>
            <svg aria-hidden className="animate-spin-slow" style={{position:'absolute',inset:'-8%',width:'116%',height:'116%',opacity:.1,pointerEvents:'none',zIndex:0}} viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="8 8"/>
            </svg>
            <Image
              src="/images/hero-portrait.png"
              alt="Abhijeeth Subhash — Senior Creative Designer Dubai"
              fill
              priority
              style={{objectFit:'cover',objectPosition:'center top',zIndex:1}}
              onError={()=>{}}
            />
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:'45%',background:'linear-gradient(to bottom, transparent, var(--ink))',zIndex:2,pointerEvents:'none'}}/>
            <div className="animate-float" style={{position:'absolute',bottom:'14%',left:'-8%',zIndex:3,background:'rgba(255,77,0,0.12)',border:'1px solid rgba(255,77,0,0.3)',borderRadius:'100px',padding:'6px 16px',fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'2px',color:'var(--orange)'}}>
              CREATIVE DIRECTOR
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden style={{position:'absolute',bottom:'20px',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',opacity:mounted?.35:0,transition:'opacity 1s 1.6s'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'8px',letterSpacing:'3px',color:'var(--dim)'}}>SCROLL</span>
          <div className="animate-float" style={{width:'1px',height:'38px',background:'linear-gradient(to bottom,var(--orange),transparent)'}}/>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <div aria-hidden style={{background:'var(--orange)',overflow:'hidden',height:'34px',display:'flex',alignItems:'center'}}>
        <div className="animate-ticker" style={{display:'flex',whiteSpace:'nowrap'}}>
          {[...TICKER,...TICKER].map((item,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',fontWeight:700,letterSpacing:'3px',color:'var(--ink)',padding:'0 22px'}}>{item}</span>
              <span style={{color:'var(--ink)',fontSize:'10px'}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      <section style={{padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto',position:'relative'}}>
        <SectionArt v={1}/>
        <div className="reveal" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'48px',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'12px'}}>✦ SELECTED WORK</span>
            <h2 style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(32px,7vw,88px)',letterSpacing:'-3px',color:'var(--bone)',lineHeight:.88}}>
              THE<br/>
              <span style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:600,color:'var(--orange)'}}>Studio Wall</span>
            </h2>
          </div>
          <Link href="/work" className="hover-line" style={{fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',color:'var(--muted)',textTransform:'uppercase'}}>All Work →</Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))',gap:'10px'}}>
          {FEATURED.map((p,i)=>(
            <Link key={p.id} href={`/work/${p.id}`} className="project-card"
              style={{background:p.bg,border:'1px solid var(--border)',borderRadius:'6px',minHeight:i===0?'clamp(320px,40vw,460px)':'clamp(240px,30vw,360px)',padding:'clamp(20px,2.5vw,28px)',display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative',overflow:'hidden',opacity:0,animation:`fadeUp .8s cubic-bezier(.23,1,.32,1) ${.1+i*.12}s forwards`}}>
              <svg aria-hidden style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.06,pointerEvents:'none'}} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <circle cx="340" cy="40" r="70" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="5 5"/>
              </svg>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'9px',letterSpacing:'2px',color:'var(--orange)',background:'rgba(255,77,0,0.08)',border:'1px solid rgba(255,77,0,0.2)',padding:'4px 10px',borderRadius:'2px'}}>{p.cat}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'18px',color:'var(--dim)'}}>↗</span>
              </div>
              <h3 style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(24px,4vw,52px)',letterSpacing:'-2px',color:'var(--bone)',lineHeight:.9}}>{p.title}</h3>
            </Link>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'32px'}}>
          <Link href="/work" className="hover-line" style={{fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',color:'var(--muted)',textTransform:'uppercase'}}>View All Projects →</Link>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section style={{background:'var(--surface)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',position:'relative',overflow:'hidden'}}>
        <SectionArt v={2}/>
        <div style={{padding:'clamp(60px,8vh,80px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto',position:'relative',zIndex:1}}>
          <span className="reveal" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'36px'}}>✦ TOOLS &amp; SKILLS</span>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,200px),1fr))',border:'1px solid var(--border)'}}>
            {SKILLS.map(({n,s},i)=>(
              <div key={n} className="reveal skill-cell" style={{padding:'clamp(20px,2.5vw,28px)',borderRight:'1px solid var(--border)',borderBottom:'1px solid var(--border)',transitionDelay:`${i*.06}s`,cursor:'default'}}>
                <div style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:600,fontSize:'clamp(16px,1.8vw,20px)',color:'var(--bone)',letterSpacing:'-.5px'}}>{n}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--dim)',letterSpacing:'1px',marginTop:'8px',lineHeight:1.6}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{padding:'clamp(80px,10vh,120px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto',position:'relative',overflow:'hidden'}}>
        <SectionArt v={3}/>
        <span className="reveal" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'20px'}}>✦ GET IN TOUCH</span>
        <h2 className="reveal" style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(40px,9vw,130px)',letterSpacing:'-4px',lineHeight:.88,color:'var(--bone)'}}>
          LET&apos;S MAKE<br/>
          <span style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:600,color:'var(--orange)',letterSpacing:'-3px'}}>Something</span><br/>
          LOUD.
        </h2>
        <div className="reveal" style={{marginTop:'48px',display:'flex',gap:'14px',flexWrap:'wrap',alignItems:'center'}}>
          <Magnetic href="/contact">
            <span style={{display:'block',background:'var(--orange)',color:'var(--ink)',fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:600,fontSize:'12px',letterSpacing:'2px',textTransform:'uppercase',padding:'clamp(12px,1.5vh,16px) clamp(28px,4vw,44px)',borderRadius:'2px'}}>Email Me →</span>
          </Magnetic>
          <a href="https://wa.me/971526776884" target="_blank" rel="noopener noreferrer" className="hover-line" style={{fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',color:'var(--muted)',textTransform:'uppercase'}}>
            WhatsApp +971 52 677 6884
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{borderTop:'1px solid var(--border)',padding:'24px clamp(20px,6vw,80px)'}}>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'16px',maxWidth:'1400px',margin:'0 auto'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--dim)',letterSpacing:'2px'}}>© 2025 ABHIJEETH SUBHASH · ADESIGNAERIUM.COM</span>
          <div style={{display:'flex',gap:'clamp(12px,2vw,24px)',flexWrap:'wrap'}}>
            {[{l:'Behance',h:'https://behance.net/abhijeeth-subhash'},{l:'Dribbble',h:'https://dribbble.com/Artificer_666'},{l:'Instagram',h:'https://instagram.com/wonderartmedia'},{l:'LinkedIn',h:'https://linkedin.com/in/abhijeethsubhash'}].map(({l,h})=>(
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="hover-line" style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--dim)',letterSpacing:'1px'}}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`.skill-cell{transition:background .3s}.skill-cell:hover{background:rgba(255,77,0,0.04)}`}</style>
    </main>
  )
}