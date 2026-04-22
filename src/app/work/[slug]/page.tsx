$file = "src\app\work\[slug]\page.tsx"
$code = @"
import { projects } from '@/lib/projects'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find(pr => pr.id === params.slug)
  return { title: p ? p.title + ' - Case Study' : 'Work' }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.id === params.slug)
  if (!project) notFound()
  const others = projects.filter(p => p.id !== project.id).slice(0, 3)
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: 'clamp(16px,3vh,32px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
        <Link href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--dim)', textTransform: 'uppercase' }}>back to all work</Link>
      </div>
      <section style={{ position: 'relative', minHeight: 'clamp(460px,60vh,700px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: project.color || '#111' }}>
        {project.coverImage && <Image src={project.coverImage} alt={project.title} fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.55 }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0.95) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.category.map(cat => <span key={cat} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2.5px', color: 'var(--orange)', background: 'rgba(255,77,0,0.12)', border: '1px solid rgba(255,77,0,0.35)', padding: '5px 14px', borderRadius: '2px' }}>{cat.toUpperCase()}</span>)}
          </div>
          <h1 style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(48px,10vw,120px)', letterSpacing: '-4px', color: 'var(--bone)', lineHeight: 0.85, marginBottom: '20px' }}>{project.title}</h1>
          <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2.2vw,24px)', color: 'rgba(237,232,221,0.7)', maxWidth: '580px', lineHeight: 1.5 }}>{project.description}</p>
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'var(--orange)', border: '1px solid rgba(255,77,0,0.5)', padding: '12px 28px', borderRadius: '2px', marginTop: '32px', background: 'rgba(255,77,0,0.08)' }}>VIEW LIVE SITE</a>}
        </div>
      </section>
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(24px,4vh,48px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 'clamp(24px,4vw,48px)' }}>
          {[{label:'Client',value:project.client},{label:'Year',value:project.year},{label:'Role',value:project.role.join(', ')},{label:'Scope',value:project.tags.slice(0,3).join(' · ')}].map(({label,value}) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2.5px', color: 'var(--orange)', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--bone)', lineHeight: 1.6 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>
      {project.coverImage && (
        <section style={{ position: 'relative', height: 'clamp(280px,40vw,560px)', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
          <Image src={project.coverImage} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,var(--ink) 100%)' }} />
        </section>
      )}
      <section style={{ padding: 'clamp(60px,8vh,100px) clamp(20px,6vw,80px)', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <span style={{ display: 'block', width: '32px', height: '2px', background: 'var(--orange)', borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', textTransform: 'uppercase' }}>The Project</span>
        </div>
        {project.longDescription.split('\n\n').map((para, i) => <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.8vw,19px)', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.6rem' }}>{para}</p>)}
      </section>
      <section style={{ padding: '0 clamp(20px,6vw,80px) clamp(60px,8vh,100px)', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {project.tags.map(tag => <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px', color: 'var(--dim)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: '100px' }}>{tag}</span>)}
        </div>
      </section>
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ padding: 'clamp(48px,6vh,80px) clamp(20px,6vw,80px)', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            <span style={{ display: 'block', width: '32px', height: '2px', background: 'var(--orange)', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)', textTransform: 'uppercase' }}>More Work</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '12px' }}>
            {others.map(other => (
              <Link key={other.id} href={'/work/' + other.id} className="project-card" style={{ position: 'relative', background: other.color || '#1a1a1a', border: '1px solid var(--border)', borderRadius: '6px', minHeight: '200px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {other.coverImage && <><Image src={other.coverImage} alt={other.title} fill sizes="33vw" style={{ objectFit: 'cover', opacity: 0.45 }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 20%,rgba(0,0,0,0.85) 100%)' }} /></>}
                <div style={{ position: 'relative', zIndex: 1, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontFamily: 'Clash Display,Arial Black,sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,24px)', letterSpacing: '-1px', color: 'var(--bone)', lineHeight: 1 }}>{other.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginTop: '6px' }}>{other.category.join(' · ')}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--orange)' }}>↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}