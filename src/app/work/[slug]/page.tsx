import { projects } from '@/lib/projects'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find(pr => pr.id === params.slug)
  return { title: p ? `${p.title} — Case Study` : 'Work' }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.id === params.slug)
  if (!project) notFound()

  const others = projects.filter(p => p.id !== project.id).slice(0, 3)

  return (
    <main style={{ paddingTop: '80px' }}>

      {/* Back link */}
      <div style={{ padding: 'clamp(20px,4vh,40px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
        <Link href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'var(--dim)', textTransform: 'uppercase' }}>
          ← Back to Work
        </Link>
      </div>

      {/* Hero — full cover image */}
      <section style={{ position: 'relative', minHeight: 'clamp(400px,55vh,620px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: project.color || '#1a1a1a' }}>
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }}
          />
        )}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.92) 100%)' }} />

        {/* Doodle SVG */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .06, pointerEvents: 'none' }} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          <circle cx="1050" cy="120" r="100" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="6 4" />
          <path d="M0,100 Q300,50 600,120 Q900,190 1200,100" fill="none" stroke="#ede8dd" strokeWidth="1" strokeDasharray="8 6" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.category.map(cat => (
              <span key={cat} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', background: 'rgba(255,77,0,0.12)', border: '1px solid rgba(255,77,0,0.35)', padding: '4px 12px', borderRadius: '2px' }}>
                {cat.toUpperCase()}
              </span>
            ))}
          </div>
          <h1 style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(44px,9vw,110px)', letterSpacing: '-4px', color: 'var(--bone)', lineHeight: .88, marginBottom: '16px' }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2vw,22px)', color: 'rgba(237,232,221,0.75)', maxWidth: '560px', lineHeight: 1.5 }}>
            {project.description}
          </p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'var(--orange)', border: '1px solid rgba(255,77,0,0.4)', padding: '10px 24px', borderRadius: '2px', display: 'inline-block', marginTop: '24px', transition: 'all .3s' }}>
              View Live Site ↗
            </a>
          )}
        </div>
      </section>

      {/* Meta strip */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(24px,4vh,40px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 'clamp(20px,3vw,40px)' }}>
          {[
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
            { label: 'Role', value: project.role.join(', ') },
            { label: 'Tags', value: project.tags.join(' · ') },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '6px' }}>{label.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--bone)', lineHeight: 1.5 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cover image — full width showcase */}
      {project.coverImage && (
        <section style={{ position: 'relative', height: 'clamp(300px,45vw,600px)', overflow: 'hidden' }}>
          <Image
            src={project.coverImage}
            alt={`${project.title} showcase`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </section>
      )}

      {/* Description */}
      <section style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '24px' }}>✦ THE PROJECT</span>
        {project.longDescription.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.7vw,18px)', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {para}
          </p>
        ))}
      </section>

      {/* More work */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', display: 'block', marginBottom: '32px' }}>✦ MORE WORK</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '10px' }}>
            {others.map(other => (
              <Link key={other.id} href={`/work/${other.id}`} className="project-card"
                style={{ background: other.color || '#1a1a1a', border: '1px solid var(--border)', borderRadius: '6px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                {other.coverImage && (
                  <>
                    <Image src={other.coverImage} alt={other.title} fill style={{ objectFit: 'cover', opacity: 0.4 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />
                  </>
                )}
                <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px,2vw,20px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--dim)' }}>↗</span>
                  <div>
                    <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: '-1px', color: 'var(--bone)' }}>{other.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '1px', marginTop: '4px' }}>{other.category.join(' · ')}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
