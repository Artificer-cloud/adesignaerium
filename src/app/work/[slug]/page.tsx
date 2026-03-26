import { projects } from '@/lib/projects'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.id === params.slug)
  if (!project) notFound()

  const others = projects.filter(p => p.id !== project.id).slice(0, 3)

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Back */}
      <div className="px-6 md:px-12 lg:px-20 pt-10 max-w-7xl mx-auto">
        <Link
          href="/work"
          className="font-mono inline-flex items-center gap-2 transition-colors duration-200"
          style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--dim)', textTransform: 'uppercase' }}
        >
          ← Back to Work
        </Link>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden mt-8"
        style={{
          background: project.color || '#1a1a1a',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Doodle bg */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.08 }}
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M0,100 Q300,50 600,150 Q900,250 1200,100" fill="none" stroke="#f5f0e8" strokeWidth="1.5" strokeDasharray="8 6"/>
          <circle cx="1050" cy="120" r="100" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="6 4"/>
          <path d="M100,400 Q300,350 500,420 Q700,490 900,400 Q1100,310 1200,400" fill="none" stroke="#ff4d00" strokeWidth="1" strokeDasharray="4 8"/>
        </svg>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.category.map(cat => (
              <span
                key={cat}
                className="font-mono"
                style={{
                  fontSize: '10px', letterSpacing: '2px',
                  color: 'var(--orange)',
                  background: 'rgba(255,77,0,0.1)',
                  border: '1px solid rgba(255,77,0,0.3)',
                  padding: '4px 12px', borderRadius: '2px',
                }}
              >
                {cat.toUpperCase()}
              </span>
            ))}
          </div>

          <h1
            className="font-display tracking-tighter leading-none"
            style={{ fontSize: 'clamp(52px, 9vw, 110px)', fontWeight: 900, color: 'var(--bone)' }}
          >
            {project.title}
          </h1>

          <p
            className="font-body mt-4"
            style={{ fontSize: '20px', fontStyle: 'italic', color: 'var(--muted)', maxWidth: '560px' }}
          >
            {project.description}
          </p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono mt-8 inline-block transition-all duration-200"
              style={{
                fontSize: '12px', letterSpacing: '2px',
                color: 'var(--orange)',
                border: '1.5px solid var(--orange)',
                padding: '10px 24px', borderRadius: '2px',
              }}
            >
              View Live Site ↗
            </a>
          )}
        </div>
      </section>

      {/* Meta info */}
      <section
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <div className="px-6 md:px-12 lg:px-20 py-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
            { label: 'Role', value: project.role.join(', ') },
            { label: 'Tags', value: project.tags.join(' · ') },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono" style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '6px' }}>
                {label.toUpperCase()}
              </div>
              <div className="font-body" style={{ fontSize: '14px', color: 'var(--bone)', lineHeight: 1.5 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Long description */}
      <section className="px-6 md:px-12 lg:px-20 py-20 max-w-4xl mx-auto">
        <span
          className="font-mono block mb-6"
          style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--orange)' }}
        >
          ✦ THE PROJECT
        </span>
        <div
          className="font-body"
          style={{
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontStyle: 'italic',
          }}
        >
          {project.longDescription.split('\n\n').map((para, i) => (
            <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
          ))}
        </div>
      </section>

      {/* Placeholder for images — prompt to add */}
      <section
        className="px-6 md:px-12 lg:px-20 pb-20 max-w-7xl mx-auto"
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[1, 2].map(n => (
            <div
              key={n}
              className="flex flex-col items-center justify-center"
              style={{
                background: 'var(--surface)',
                border: '1px dashed var(--border)',
                borderRadius: '4px',
                minHeight: '300px',
                padding: '40px',
              }}
            >
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--dim)' }}>
                ADD PROJECT IMAGE {n}
              </span>
              <span className="font-mono mt-2" style={{ fontSize: '9px', color: 'var(--dim)', letterSpacing: '2px' }}>
                Replace with {`<Image>`} component
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* More Projects */}
      <section
        style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <div className="px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto">
          <span
            className="font-mono block mb-8"
            style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--orange)' }}
          >
            ✦ MORE WORK
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {others.map(other => (
              <Link
                key={other.id}
                href={`/work/${other.id}`}
                className="project-card block group"
                style={{
                  background: other.color || '#1a1a1a',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '24px',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  className="font-mono transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 inline-block"
                  style={{ fontSize: '16px', color: 'var(--dim)' }}
                >
                  ↗
                </span>
                <div>
                  <div
                    className="font-display tracking-tighter"
                    style={{ fontSize: '24px', fontWeight: 900, color: 'var(--bone)' }}
                  >
                    {other.title}
                  </div>
                  <div
                    className="font-mono mt-1"
                    style={{ fontSize: '10px', color: 'var(--dim)', letterSpacing: '1px' }}
                  >
                    {other.category.join(' · ')}
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
