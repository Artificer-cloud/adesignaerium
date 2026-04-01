'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name'); const email = data.get('email'); const message = data.get('message')
    window.location.href = `mailto:abhijeethpiyush4@gmail.com?subject=${encodeURIComponent(`Portfolio Enquiry from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    setSent(true)
  }

  const inputStyle: React.CSSProperties = { width:'100%', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'2px', color:'var(--bone)', fontSize:'14px', padding:'14px 16px', outline:'none', fontFamily:'var(--font-body)', transition:'border-color .3s' }

  return (
    <main style={{ paddingTop:'80px' }}>
      <section style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px) clamp(24px,4vh,48px)', maxWidth:'1400px', margin:'0 auto' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>✦ LET&apos;S MAKE STUFF</span>
        <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'clamp(44px,9vw,120px)', letterSpacing:'-4px', color:'var(--bone)', lineHeight:.88, marginBottom:'16px' }}>
          CONTACT<br/><span style={{ fontFamily:'Cormorant Garamond,Georgia,serif', fontStyle:'italic', fontWeight:600, color:'var(--orange)' }}>Me.</span>
        </h1>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(14px,1.6vw,18px)', fontStyle:'italic', color:'var(--muted)', maxWidth:'480px', lineHeight:1.7 }}>
          Open to brand projects, UI/UX, AI visual production, freelance, and full-time roles. Dubai-based. Globally wired.
        </p>
      </section>

      <section style={{ borderTop:'1px solid var(--border)', maxWidth:'1400px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr clamp(280px,38%,520px)', maxWidth:'1400px', margin:'0 auto' }}>
          {/* Form */}
          <div style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', borderRight:'1px solid var(--border)' }}>
            {sent ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', minHeight:'300px', justifyContent:'center' }}>
                <span style={{ fontSize:'48px', marginBottom:'16px' }}>✦</span>
                <h2 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'48px', color:'var(--orange)', letterSpacing:'-2px' }}>Message sent!</h2>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', fontStyle:'italic', color:'var(--muted)', marginTop:'12px' }}>Opening your email client...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
                {[{name:'name',label:'YOUR NAME',type:'text',placeholder:'e.g. Sarah Al Maktoum'},{name:'email',label:'EMAIL ADDRESS',type:'email',placeholder:'hello@yourbrand.com'}].map(f => (
                  <div key={f.name}>
                    <label style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--orange)', display:'block', marginBottom:'8px' }}>{f.label}</label>
                    <input name={f.name} required type={f.type} placeholder={f.placeholder} style={inputStyle}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor='var(--orange)'}
                      onBlur={e  => (e.target as HTMLInputElement).style.borderColor='var(--border)'} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--orange)', display:'block', marginBottom:'8px' }}>YOUR MESSAGE</label>
                  <textarea name="message" required rows={6} placeholder="Tell me about your project..." style={{ ...inputStyle, resize:'none', lineHeight:1.7 }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor='var(--orange)'}
                    onBlur={e  => (e.target as HTMLTextAreaElement).style.borderColor='var(--border)'} />
                </div>
                <button type="submit" style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:600, fontSize:'13px', letterSpacing:'2px', textTransform:'uppercase', background:'var(--orange)', color:'var(--ink)', padding:'16px', borderRadius:'2px', border:'none', cursor:'pointer', transition:'opacity .3s' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{ padding:'clamp(40px,6vh,80px) clamp(20px,6vw,80px)', background:'var(--surface)', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'40px' }}>
            <div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'24px' }}>DIRECT CONTACT</span>
              <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                {[{l:'Email',v:'abhijeethpiyush4@gmail.com',h:'mailto:abhijeethpiyush4@gmail.com'},{l:'Phone',v:'+971 52 677 6884',h:'tel:+971526776884'},{l:'WhatsApp',v:'+971 52 677 6884',h:'https://wa.me/971526776884'},{l:'Location',v:'Dubai, UAE',h:''}].map(({l,v,h}) => (
                  <div key={l}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--dim)', marginBottom:'4px' }}>{l.toUpperCase()}</div>
                    {h ? <a href={h} target={h.startsWith('http')?'_blank':undefined} rel={h.startsWith('http')?'noopener noreferrer':undefined} style={{ fontFamily:'var(--font-body)', fontSize:'16px', color:'var(--bone)' }}>{v} ↗</a>
                       : <span style={{ fontFamily:'var(--font-body)', fontSize:'16px', color:'var(--bone)' }}>{v}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'3px', color:'var(--orange)', display:'block', marginBottom:'16px' }}>FIND ME ONLINE</span>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                {[{l:'Behance',h:'https://behance.net/abhijeeth-subhash'},{l:'Dribbble',h:'https://dribbble.com/Artificer_666'},{l:'LinkedIn',h:'https://linkedin.com/in/abhijeethsubhash'},{l:'@wonderartmedia',h:'https://instagram.com/wonderartmedia'}].map(({l,h}) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'1px', color:'var(--muted)', border:'1px solid var(--border)', padding:'10px 14px', borderRadius:'2px', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'border-color .3s' }}>
                    {l}<span style={{ color:'var(--orange)' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ background:'rgba(255,77,0,0.06)', border:'1px solid rgba(255,77,0,0.2)', borderRadius:'4px', padding:'20px 24px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                <span style={{ width:'7px', height:'7px', background:'#22c55e', borderRadius:'50%', animation:'blink 2s ease-in-out infinite', flexShrink:0 }} />
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'2px', color:'var(--orange)' }}>AVAILABLE NOW</span>
              </div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', fontStyle:'italic', color:'var(--muted)', lineHeight:1.6 }}>
                Open to freelance projects and full-time creative roles. Typical response: within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
