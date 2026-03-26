'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')
    const subject = `Portfolio Enquiry from ${name}`
    const body = `From: ${name} (${email})\n\n${message}`
    window.location.href = `mailto:abhijeethpiyush4@gmail.com?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body as string)}`
    setSent(true)
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-16 max-w-7xl mx-auto">
        <span
          className="font-mono block mb-4"
          style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--orange)' }}
        >
          ✦ LET&apos;S MAKE STUFF
        </span>
        <h1
          className="font-display tracking-tighter leading-none"
          style={{ fontSize: 'clamp(52px, 9vw, 120px)', fontWeight: 900, color: 'var(--bone)' }}
        >
          CONTACT<br />
          <span style={{ color: 'var(--orange)' }}>ME.</span>
        </h1>
        <p
          className="font-body mt-6"
          style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}
        >
          Open to brand projects, UI/UX work, AI visual production, freelance commissions,
          and full-time roles. Dubai-based. Globally wired.
        </p>
      </section>

      {/* Content */}
      <section
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Form */}
          <div
            className="px-6 md:px-12 py-16"
            style={{ borderRight: '1px solid var(--border)' }}
          >
            {sent ? (
              <div
                className="flex flex-col items-start justify-center"
                style={{ minHeight: '300px' }}
              >
                <span style={{ fontSize: '48px', marginBottom: '16px' }}>✦</span>
                <h2
                  className="font-display tracking-tighter"
                  style={{ fontSize: '48px', fontWeight: 900, color: 'var(--orange)' }}
                >
                  Message sent!
                </h2>
                <p
                  className="font-body mt-4"
                  style={{ fontSize: '16px', fontStyle: 'italic', color: 'var(--muted)' }}
                >
                  Opening your email client... I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    className="font-mono block mb-2"
                    style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)' }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="e.g. Sarah Al Maktoum"
                    className="w-full font-mono"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      color: 'var(--bone)',
                      fontSize: '14px',
                      padding: '14px 16px',
                      outline: 'none',
                      letterSpacing: '0.5px',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label
                    className="font-mono block mb-2"
                    style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)' }}
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="hello@yourbrand.com"
                    className="w-full font-mono"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      color: 'var(--bone)',
                      fontSize: '14px',
                      padding: '14px 16px',
                      outline: 'none',
                      letterSpacing: '0.5px',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label
                    className="font-mono block mb-2"
                    style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)' }}
                  >
                    YOUR MESSAGE
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, brand, or idea..."
                    className="w-full font-mono resize-none"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      color: 'var(--bone)',
                      fontSize: '14px',
                      padding: '14px 16px',
                      outline: 'none',
                      letterSpacing: '0.5px',
                      lineHeight: 1.7,
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <button
                  type="submit"
                  className="font-display font-black w-full py-5 transition-all duration-200 hover:opacity-90 active:scale-98"
                  style={{
                    background: 'var(--orange)',
                    color: 'var(--ink)',
                    fontSize: '15px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div
            className="px-6 md:px-12 py-16 flex flex-col justify-between"
            style={{ background: 'var(--surface)' }}
          >
            {/* Direct contacts */}
            <div>
              <span
                className="font-mono block mb-8"
                style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)' }}
              >
                DIRECT CONTACT
              </span>
              <div className="flex flex-col gap-6">
                {[
                  { label: 'Email', value: 'abhijeethpiyush4@gmail.com', href: 'mailto:abhijeethpiyush4@gmail.com' },
                  { label: 'Phone', value: '+971 52 677 6884', href: 'tel:+971526776884' },
                  { label: 'WhatsApp', value: '+971 52 677 6884', href: 'https://wa.me/971526776884' },
                  { label: 'Location', value: 'Dubai, UAE', href: null },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <div
                      className="font-mono mb-1"
                      style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--dim)' }}
                    >
                      {label.toUpperCase()}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-body transition-colors duration-200"
                        style={{ fontSize: '16px', color: 'var(--bone)', textDecoration: 'none' }}
                      >
                        {value} ↗
                      </a>
                    ) : (
                      <span className="font-body" style={{ fontSize: '16px', color: 'var(--bone)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="mt-12">
              <span
                className="font-mono block mb-6"
                style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--orange)' }}
              >
                FIND ME ONLINE
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Behance', href: 'https://behance.net/abhijeeth-subhash' },
                  { label: 'Dribbble', href: 'https://dribbble.com/Artificer_666' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/abhijeethsubhash' },
                  { label: '@wonderartmedia', href: 'https://instagram.com/wonderartmedia' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono transition-all duration-200 flex items-center justify-between"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '1px',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      padding: '10px 14px',
                      borderRadius: '2px',
                    }}
                  >
                    {label}
                    <span style={{ color: 'var(--orange)' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div
              className="mt-10 p-5"
              style={{
                background: 'rgba(255,77,0,0.06)',
                border: '1px solid rgba(255,77,0,0.2)',
                borderRadius: '4px',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{
                  width: '7px', height: '7px',
                  background: '#22c55e',
                  borderRadius: '50%',
                  flexShrink: 0,
                  animation: 'blink 2s ease-in-out infinite',
                }} />
                <span
                  className="font-mono"
                  style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--orange)' }}
                >
                  AVAILABLE NOW
                </span>
              </div>
              <p
                className="font-body"
                style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.6 }}
              >
                Open to freelance projects, brand collaborations, and full-time creative
                roles. Typical response time: within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
