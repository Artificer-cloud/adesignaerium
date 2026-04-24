'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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

const TOOLS = ['Midjourney','Sora','Higgsfield','OpenAI / ChatGPT','Gemini','Nano Banana Pro','Adobe Firefly']

const TIMELINE = [
  {
    year: '2023–Present',
    role: 'Graphic Designer / Creative Director',
    place: 'Krossover Gifts Trading LLC — Dubai, UAE',
    pts: [
      'Full creative direction for 100+ B2B corporate gifting clients',
      'E-commerce UI/UX: kross-over.net & shanghaigifts.net',
      'Built Ecora, Maison Valér & Sipple brand universes from scratch',
      'Reels, product videos, lifestyle imagery, print catalogues',
      '100% on-time delivery across 50+ concurrent projects',
    ],
  },
  {
    year: '2020–2022',
    role: 'Graphic Design Artist',
    place: 'Creative Dreams Design — Kerala, India',
    pts: [
      'Branding, UI/UX & digital illustration for 30+ clients',
      'Industries: tech, retail, hospitality',
      'End-to-end Adobe Creative Suite execution',
    ],
  },
  {
    year: '2019–2020',
    role: 'Graphic Design Faculty',
    place: 'KELTRON Advanced Studies — Trivandrum, Kerala',
    pts: [
      'Trained 100+ designers — 90% placement rate in design roles',
      'Developed curriculum: UI/UX, branding, Adobe Suite',
      'Led live client projects and industry workshops',
    ],
  },
  { year: '2017–2018', role: 'Diploma: Animation & Visual Effects', place: 'IMAGE Creative Education | NSDC — Kerala', pts: [] },
  { year: '2014–2017', role: 'BA Hindi Literature & Journalism', place: 'Mahatma Gandhi University — Kerala', pts: [] },
]

const SKILLS_LIST = [
  { category: 'Design', items: ['Brand Identity', 'UI/UX Design', 'Packaging', 'Editorial', 'Typography', 'Illustration'] },
  { category: 'Tools',  items: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Figma', 'Premiere Pro'] },
  { category: 'AI',     items: ['Midjourney', 'Sora', 'Higgsfield', 'OpenAI', 'Gemini', 'Adobe Firefly'] },
  { category: 'Web',    items: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Git', 'Framer'] },
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  useScrollReveal()
  useEffect(() => { setMounted(true) }, [])

  return (
    <main style={{ paddingTop: '80px', background: 'var(--ink)', minHeight: '100vh' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px,8vh,100px) clamp(20px,6vw,80px) 0', maxWidth: '1400px', margin: '0 auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '16px', opacity: mounted ? 1 : 0, transition: 'opacity .6s .1s' }}>
          ✦ THE PERSON
        </span>
        <h1 style={{
          fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700,
          fontSize: 'clamp(52px,10vw,130px)', letterSpacing: '-4px',
          color: 'var(--bone)', lineHeight: .86,
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all .9s cubic-bezier(.23,1,.32,1) .2s',
        }}>
          ABOUT<br />
          <span style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--orange)' }}>
            Abhijeeth.
          </span>
        </h1>
      </section>

      {/* ── SPLIT — Photo + Bio ─────────────────────────────────── */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(260px,38%,500px) 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

          {/* Photo */}
          <div className="reveal-left" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden', background: 'var(--surface)' }}>
              <Image
                src="/images/about-portrait.webp"
                alt="Abhijeeth Subhash — Senior Creative Designer Dubai"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                onError={() => {}}
              />
              {/* Placeholder */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', pointerEvents: 'none', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.15)', textAlign: 'center', lineHeight: 2 }}>
                  YOUR PHOTO HERE<br />
                  <span style={{ fontSize: '9px' }}>about-photo.webp · 800×1000px</span>
                </span>
              </div>
              {/* Bottom fade */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(transparent,var(--surface))', pointerEvents: 'none', zIndex: 2 }} />
            </div>
            {/* Orange accent line */}
            <div style={{ width: '48px', height: '3px', background: 'var(--orange)', marginTop: '20px', borderRadius: '2px' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', marginTop: '12px' }}>
              DUBAI, UAE · 2026
            </p>
          </div>

          {/* Bio */}
          <div className="reveal-right">
            <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(20px,2.5vw,32px)', color: 'var(--bone)', lineHeight: 1.5, marginBottom: '28px' }}>
              I turn concepts into visual worlds. Born in Kerala, India. Currently building brands in{' '}
              <span style={{ color: 'var(--orange)' }}>Dubai, UAE.</span>
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.5vw,17px)', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '20px' }}>
              With 7+ years across branding, UI/UX, AI-driven visual production, motion design, and product photography — I&apos;ve built brand ecosystems for 100+ B2B clients, taught design to 100+ students, and helped companies go from idea to launch.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.5vw,17px)', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '36px' }}>
              My work lives at the intersection of raw creative energy and strategic brand thinking. I&apos;m equally at home sketching a brand identity on paper and deploying a Next.js website to Vercel.
            </p>

            {/* Contact links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
              {[
                { l: '+971 52 677 6884',           h: 'tel:+971526776884' },
                { l: 'abhijeethpiyush4@gmail.com', h: 'mailto:abhijeethpiyush4@gmail.com' },
                { l: 'LinkedIn',                   h: 'https://linkedin.com/in/abhijeethsubhash' },
                { l: 'Behance',                    h: 'https://behance.net/abhijeeth-subhash' },
                { l: 'Dribbble',                   h: 'https://dribbble.com/Artificer_666' },
                { l: '@wonderartmedia',             h: 'https://instagram.com/wonderartmedia' },
              ].map(({ l, h }) => (
                <a key={l} href={h}
                  target={h.startsWith('http') ? '_blank' : undefined}
                  rel={h.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover-line"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '7px 14px', borderRadius: '2px', transition: 'all .3s', display: 'inline-block' }}
                >
                  {l} ↗
                </a>
              ))}
            </div>

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              {[{ n: '7+', l: 'Years Experience' }, { n: '100+', l: 'Brands Served' }, { n: '100%', l: 'On-time Delivery' }].map(({ n, l }) => (
                <div key={l} style={{ background: 'var(--surface)', padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,42px)', color: 'var(--orange)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '1px', marginTop: '6px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS GRID ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(48px,7vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
          <span className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '40px' }}>
            ✦ SKILLS & EXPERTISE
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '1px', background: 'var(--border)' }}>
            {SKILLS_LIST.map(({ category, items }) => (
              <div key={category} className="reveal" style={{ background: 'var(--surface)', padding: 'clamp(20px,2.5vw,32px)' }}>
                <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px,7vh,100px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
        <span className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '48px' }}>
          ✦ THE JOURNEY
        </span>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '1px', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,5vh,56px)', paddingLeft: '40px' }}>
            {TIMELINE.map(({ year, role, place, pts }, i) => (
              <div key={year} className="reveal" style={{ position: 'relative', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ position: 'absolute', left: '-35px', top: '6px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--ink)', border: '2px solid var(--orange)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '4px' }}>{year}</div>
                <h3 style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 600, fontSize: 'clamp(18px,2.5vw,26px)', color: 'var(--bone)', letterSpacing: '-.5px' }}>{role}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '1px', marginTop: '4px', marginBottom: pts.length ? '14px' : 0 }}>{place}</div>
                {pts.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pts.map(pt => (
                      <li key={pt} style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.4vw,15px)', color: 'var(--muted)', lineHeight: 1.6, listStyle: 'none' }}>
                        <span style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }}>✦</span>{pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PHILOSOPHY ───────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(48px,7vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
          <span className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '24px' }}>
            ✦ AI PHILOSOPHY
          </span>
          <blockquote className="reveal" style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(20px,3vw,36px)', color: 'var(--bone)', lineHeight: 1.5, maxWidth: '800px', borderLeft: '3px solid var(--orange)', paddingLeft: 'clamp(16px,2.5vw,28px)', marginBottom: '32px' }}>
            &ldquo;AI tools are accelerators, not replacements. I use Midjourney, Sora, Higgsfield, and OpenAI to collapse the gap between idea and execution — so the creative energy stays human, but the output scales.&rdquo;
          </blockquote>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px', color: 'var(--bone)', background: 'rgba(255,77,0,0.07)', border: '1px solid rgba(255,77,0,0.18)', padding: '6px 14px', borderRadius: '2px' }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="reveal" style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(36px,7vw,80px)', letterSpacing: '-3px', color: 'var(--bone)', lineHeight: .9, marginBottom: '16px' }}>
          LET&apos;S BUILD
        </h2>
        <h2 className="reveal" style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(36px,7vw,80px)', letterSpacing: '-2px', color: 'var(--orange)', lineHeight: .9, marginBottom: '40px' }}>
          Something great.
        </h2>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <a href="mailto:abhijeethpiyush4@gmail.com" style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--orange)', color: 'var(--ink)', padding: '14px 40px', borderRadius: '2px', textDecoration: 'none', display: 'inline-block', transition: 'opacity .3s' }}>
            Email Me →
          </a>
          <Link href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid var(--border)', color: 'var(--bone)', padding: '14px 40px', borderRadius: '2px', display: 'inline-block', textDecoration: 'none', transition: 'all .3s' }}>
            View Work
          </Link>
          <a href="https://wa.me/971526776884" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid var(--border)', color: 'var(--bone)', padding: '14px 40px', borderRadius: '2px', display: 'inline-block', textDecoration: 'none', transition: 'all .3s' }}>
            WhatsApp ↗
          </a>
        </div>
      </section>

    </main>
  )
}
