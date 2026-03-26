'use client'
import Link from 'next/link'
import { useState } from 'react'
import { projects, categories } from '@/lib/projects'

export default function WorkPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category.includes(active))

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-12 max-w-7xl mx-auto">
        <span
          className="font-mono block mb-4"
          style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--orange)' }}
        >
          ✦ THE STUDIO WALL
        </span>
        <h1
          className="font-display tracking-tighter leading-none"
          style={{ fontSize: 'clamp(52px, 9vw, 120px)', fontWeight: 900, color: 'var(--bone)' }}
        >
          ALL WORK
        </h1>
        <p
          className="font-body mt-4"
          style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--muted)', maxWidth: '480px' }}
        >
          7+ years of branding, UI/UX, AI design, motion, and creative direction —
          every project a new obsession.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mt-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-mono transition-all duration-200"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderRadius: '2px',
                border: active === cat ? '1.5px solid var(--orange)' : '1px solid var(--border)',
                background: active === cat ? 'var(--orange)' : 'transparent',
                color: active === cat ? 'var(--ink)' : 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

      {/* Project Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="project-card group block relative overflow-hidden"
              style={{
                background: project.color || '#1a1a1a',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                minHeight: i % 5 === 0 ? '480px' : '340px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Doodle bg */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.07 }}
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  d={`M${20 + i * 15},${30 + i * 10} Q${150 + i * 5},${10 + i * 8} ${280 + i * 3},${80 + i * 5}`}
                  fill="none" stroke="#f5f0e8" strokeWidth="1" strokeDasharray="6 4"
                />
                <circle
                  cx={320 + (i % 3) * 20}
                  cy={60 + (i % 4) * 15}
                  r={35 + i * 3}
                  fill="none" stroke="#ff4d00" strokeWidth="0.8" strokeDasharray="4 4"
                />
              </svg>

              {/* Top: tags + arrow */}
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.category.slice(0, 2).map(cat => (
                    <span
                      key={cat}
                      className="font-mono"
                      style={{
                        fontSize: '9px',
                        letterSpacing: '1.5px',
                        color: 'var(--orange)',
                        background: 'rgba(255,77,0,0.08)',
                        border: '1px solid rgba(255,77,0,0.25)',
                        padding: '3px 8px',
                        borderRadius: '2px',
                      }}
                    >
                      {cat.toUpperCase()}
                    </span>
                  ))}
                </div>
                <span
                  className="font-mono transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ fontSize: '18px', color: 'var(--dim)' }}
                >
                  ↗
                </span>
              </div>

              {/* Bottom: title + meta */}
              <div>
                <h2
                  className="font-display tracking-tighter leading-tight"
                  style={{
                    fontSize: 'clamp(22px, 3.5vw, 36px)',
                    fontWeight: 900,
                    color: 'var(--bone)',
                  }}
                >
                  {project.title}
                </h2>
                <p
                  className="font-body mt-2"
                  style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.5 }}
                >
                  {project.description}
                </p>
                <div
                  className="font-mono mt-4"
                  style={{ fontSize: '10px', color: 'var(--dim)', letterSpacing: '1px' }}
                >
                  {project.year} · {project.client}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
