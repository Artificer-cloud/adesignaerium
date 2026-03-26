'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main style={{paddingTop:'80px'}}>
      {/* Hero split */}
      <section style={{borderBottom:'1px solid var(--border)'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'clamp(280px,55%,760px) 1fr',
          maxWidth:'1400px',margin:'0 auto',
        }}>
          {/* Text col */}
          <div style={{padding:'clamp(48px,7vh,80px) clamp(20px,6vw,80px)',borderRight:'1px solid var(--border)'}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'16px'}}>✦ THE PERSON</span>
            <h1 style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(44px,8vw,100px)',letterSpacing:'-4px',color:'var(--bone)',lineHeight:.88,marginBottom:'40px'}}>
              ABOUT<br/>
              <span style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:600,color:'var(--orange)'}}>Me.</span>
            </h1>
            <p style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:500,fontSize:'clamp(18px,2.2vw,26px)',color:'var(--bone)',lineHeight:1.6,marginBottom:'24px'}}>
              I&apos;m Abhijeeth — a Senior Creative Designer who turns concepts into visual worlds.
              Born in Kerala, India. Currently based in <span style={{color:'var(--orange)'}}>Dubai, UAE.</span>
            </p>
            <p style={{fontFamily:'var(--font-body)',fontSize:'clamp(14px,1.5vw,17px)',color:'var(--muted)',lineHeight:1.8,marginBottom:'20px'}}>
              With 7+ years across branding, UI/UX, AI-driven visual production, motion design, and product photography
              — I&apos;ve built brand ecosystems for 100+ B2B clients, taught design to 100+ students, and helped companies go from idea to launch.
            </p>
            <p style={{fontFamily:'var(--font-body)',fontSize:'clamp(14px,1.5vw,17px)',color:'var(--muted)',lineHeight:1.8,marginBottom:'36px'}}>
              My work lives at the intersection of raw creative energy and strategic brand thinking.
              I use AI tools — Midjourney, Sora, Higgsfield, OpenAI — not as shortcuts, but as accelerators for ideas that already have soul.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {[
                {l:'+971 52 677 6884',      h:'tel:+971526776884'},
                {l:'abhijeethpiyush4@gmail.com', h:'mailto:abhijeethpiyush4@gmail.com'},
                {l:'LinkedIn',  h:'https://linkedin.com/in/abhijeethsubhash'},
                {l:'Behance',   h:'https://behance.net/abhijeeth-subhash'},
                {l:'Dribbble',  h:'https://dribbble.com/Artificer_666'},
                {l:'@wonderartmedia', h:'https://instagram.com/wonderartmedia'},
              ].map(({l,h}) => (
                <a key={l} href={h}
                  target={h.startsWith('http')?'_blank':undefined}
                  rel={h.startsWith('http')?'noopener noreferrer':undefined}
                  style={{
                    fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'1px',
                    color:'var(--muted)',border:'1px solid var(--border)',
                    padding:'7px 14px',borderRadius:'2px',
                    transition:'all .3s',textDecoration:'none',display:'inline-block',
                  }}
                >
                  {l} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Photo col */}
          <div style={{position:'relative',background:'var(--surface)',minHeight:'clamp(400px,55vh,640px)',overflow:'hidden'}}>
            <Image
              src="/images/about-photo.webp"
              alt="Abhijeeth Subhash — Senior Creative Designer Dubai"
              fill
              style={{objectFit:'cover',objectPosition:'center top'}}
              onError={() => {}}
            />
            {/* Placeholder text (hidden once image loads) */}
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'6px',pointerEvents:'none',zIndex:1}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'2px',color:'rgba(255,255,255,0.2)',textAlign:'center',lineHeight:1.8}}>
                ADD YOUR PHOTO<br/>
                <span style={{fontSize:'9px',opacity:.7}}>about-photo.webp</span><br/>
                <span style={{fontSize:'9px',opacity:.7}}>800 × 1000 px</span>
              </span>
            </div>
            {/* Bottom fade */}
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:'30%',background:'linear-gradient(transparent,var(--surface))',pointerEvents:'none',zIndex:2}}/>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto'}}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'48px'}}>
          ✦ THE JOURNEY
        </span>
        <div style={{position:'relative'}}>
          {/* Vertical line */}
          <div style={{position:'absolute',left:'7px',top:0,bottom:0,width:'1px',background:'var(--border)'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:'clamp(36px,5vh,56px)',paddingLeft:'40px'}}>
            {[
              {
                year:'2023–Present',
                role:'Graphic Designer / Creative Director',
                place:'Krossover Gifts Trading LLC — Dubai, UAE',
                pts:[
                  'Full creative direction for 100+ B2B corporate gifting clients',
                  'E-commerce UI/UX: kross-over.net & shanghaigifts.net',
                  'Built Ecora, Maison Valér & Sipple brand universes from scratch',
                  'Reels, product videos, lifestyle imagery, print catalogues',
                  '100% on-time delivery across 50+ concurrent projects',
                ],
              },
              {
                year:'2020–2022',
                role:'Graphic Design Artist',
                place:'Creative Dreams Design — Kerala, India',
                pts:[
                  'Branding, UI/UX & digital illustration for 30+ clients',
                  'Industries: tech, retail, hospitality',
                  'End-to-end Adobe Creative Suite execution',
                ],
              },
              {
                year:'2019–2020',
                role:'Graphic Design Faculty',
                place:'KELTRON Advanced Studies — Trivandrum, Kerala',
                pts:[
                  'Trained 100+ designers — 90% placement rate in design roles',
                  'Developed curriculum: UI/UX, branding, Adobe Suite',
                  'Led live client projects and industry workshops',
                ],
              },
              { year:'2017–2018', role:'Diploma: Animation & Visual Effects', place:'IMAGE Creative Education | NSDC — Kerala', pts:[] },
              { year:'2014–2017', role:'BA Hindi Literature & Journalism',     place:'Mahatma Gandhi University — Kerala', pts:[] },
            ].map(({year,role,place,pts}) => (
              <div key={year} style={{position:'relative'}}>
                <div style={{position:'absolute',left:'-35px',top:'6px',width:'14px',height:'14px',borderRadius:'50%',background:'var(--ink)',border:'2px solid var(--orange)'}}/>
                <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'2px',color:'var(--orange)',marginBottom:'4px'}}>{year}</div>
                <h3 style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:600,fontSize:'clamp(18px,2.5vw,26px)',color:'var(--bone)',letterSpacing:'-.5px'}}>{role}</h3>
                <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'var(--dim)',letterSpacing:'1px',marginTop:'4px',marginBottom:'14px'}}>{place}</div>
                {pts.length > 0 && (
                  <ul style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                    {pts.map(pt => (
                      <li key={pt} style={{display:'flex',gap:'10px',fontFamily:'var(--font-body)',fontSize:'clamp(13px,1.4vw,15px)',color:'var(--muted)',lineHeight:1.6,listStyle:'none'}}>
                        <span style={{color:'var(--orange)',flexShrink:0,marginTop:'2px'}}>✦</span>{pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Philosophy */}
      <section style={{background:'var(--surface)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{padding:'clamp(60px,8vh,80px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'3px',color:'var(--orange)',display:'block',marginBottom:'24px'}}>✦ AI PHILOSOPHY</span>
          <blockquote style={{
            fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:500,
            fontSize:'clamp(20px,3vw,34px)',color:'var(--bone)',lineHeight:1.5,
            maxWidth:'760px',borderLeft:'3px solid var(--orange)',
            paddingLeft:'clamp(16px,2.5vw,28px)',marginBottom:'28px',
          }}>
            &ldquo;AI tools are accelerators, not replacements. I use Midjourney, Sora, Higgsfield, and OpenAI
            to collapse the gap between idea and execution — so the creative energy stays human, but the output scales.&rdquo;
          </blockquote>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {['Midjourney','Sora','Higgsfield','OpenAI / ChatGPT','Gemini','Nano Banana Pro','Adobe Firefly'].map(tool => (
              <span key={tool} style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'1px',color:'var(--bone)',background:'rgba(255,77,0,0.07)',border:'1px solid rgba(255,77,0,0.18)',padding:'6px 14px',borderRadius:'2px'}}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'clamp(60px,8vh,100px) clamp(20px,6vw,80px)',maxWidth:'1400px',margin:'0 auto',textAlign:'center'}}>
        <h2 style={{fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:700,fontSize:'clamp(36px,7vw,80px)',letterSpacing:'-3px',color:'var(--bone)',lineHeight:.9,marginBottom:'40px'}}>
          LET&apos;S BUILD<br/>
          <span style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontStyle:'italic',fontWeight:600,color:'var(--orange)'}}>Something.</span>
        </h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
          <a href="mailto:abhijeethpiyush4@gmail.com" style={{
            fontFamily:'Clash Display,Arial Black,sans-serif',fontWeight:600,
            fontSize:'12px',letterSpacing:'2px',textTransform:'uppercase',
            background:'var(--orange)',color:'var(--ink)',
            padding:'14px 40px',borderRadius:'2px',textDecoration:'none',display:'inline-block',
          }}>
            Email Me →
          </a>
          <Link href="/work" style={{
            fontFamily:'var(--font-mono)',fontSize:'11px',letterSpacing:'2px',textTransform:'uppercase',
            border:'1px solid var(--border)',color:'var(--bone)',
            padding:'14px 40px',borderRadius:'2px',display:'inline-block',textDecoration:'none',
          }}>
            View Work
          </Link>
        </div>
      </section>
    </main>
  )
}