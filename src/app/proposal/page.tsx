'use client'
import { useState, useEffect } from 'react'

const SERVICES = [
  { label:'Brand Identity — Starter',         price:5500  },
  { label:'Brand Identity — Full System',      price:13500 },
  { label:'Brand Identity — Full World',       price:26000 },
  { label:'Landing Page (Design + Build)',     price:7000  },
  { label:'Brand Website (5–8 pages)',         price:18000 },
  { label:'E-Commerce Website',               price:32000 },
  { label:'App UI/UX Design',                 price:14000 },
  { label:'AI Product Reel (30–60s)',          price:4500  },
  { label:'AI Brand Film (60–90s)',            price:10000 },
  { label:'AI Campaign Set (3 videos)',        price:20000 },
  { label:'AI Image Campaign (10 images)',     price:3500  },
  { label:'AI Image Campaign (25–40 images)', price:9000  },
  { label:'Packaging — Single Item',          price:3500  },
  { label:'Packaging — Full Gifting Set',     price:9000  },
  { label:'Catalogue Design (24 pages)',       price:7500  },
  { label:'Social Reel (single)',              price:1800  },
  { label:'Monthly Social Retainer',          price:9000  },
  { label:'After Effects Animation',          price:3200  },
  { label:'Product Photography (half day)',   price:4500  },
  { label:'Lifestyle Shoot (full day)',        price:9000  },
  { label:'Monthly Creative Retainer',        price:10000 },
  { label:'Custom scope',                     price:0     },
]

const PAYMENT_TERMS = [
  '50% upfront, 50% on delivery',
  '40% upfront, 30% at midpoint, 30% on delivery',
  '60% upfront, 40% on delivery',
  '100% upfront',
  'Monthly in advance (retainer)',
]

function fmt(n: number) {
  return `AED ${n.toLocaleString('en-AE')}`
}

function pad(n: number) { return n.toString().padStart(2,'0') }

function getDate() {
  const d = new Date()
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`
}

function getExpiry() {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`
}

function getRef() {
  return `ADA-${new Date().getFullYear()}-${Math.floor(100+Math.random()*900)}`
}

export default function ProposalPage() {
  const [ref] = useState(getRef())

  // Hide navbar on this page
  useEffect(() => {
    document.body.classList.add('pdf-mode')
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.classList.remove('pdf-mode')
      document.body.style.overflow = ''
    }
  }, [])

  // Client details
  const [clientName,    setClientName]    = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [clientEmail,   setClientEmail]   = useState('')

  // Project
  const [projectTitle, setProjectTitle] = useState('')
  const [projectBrief, setProjectBrief] = useState('')

  // Line items
  const [items, setItems] = useState([
    { desc:'', qty:1, price:0 }
  ])

  // Timeline + terms
  const [timeline,     setTimeline]     = useState('')
  const [paymentTerms, setPaymentTerms] = useState(PAYMENT_TERMS[0])
  const [milestones,   setMilestones]   = useState('Week 1: Discovery & Brief\nWeek 2: Concept Presentation\nWeek 3: Revisions & Refinement\nWeek 4: Final Delivery')
  const [excludes,     setExcludes]     = useState('Stock photography & licensed fonts\nPrinting / production costs\nMore than 2 rounds of revisions\nContent writing / copywriting\nArabic translation\nFuture updates after 30 days')
  const [notes,        setNotes]        = useState('')

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const vat      = Math.round(subtotal * 0.05)
  const total    = subtotal + vat

  const addItem = () => setItems(i => [...i, { desc:'', qty:1, price:0 }])
  const removeItem = (idx: number) => setItems(i => i.filter((_,j) => j !== idx))
  const updateItem = (idx: number, field: string, val: string | number) =>
    setItems(i => i.map((item, j) => j === idx ? { ...item, [field]: val } : item))

  const applyService = (idx: number, svc: typeof SERVICES[0]) => {
    setItems(i => i.map((item, j) => j === idx ? { ...item, desc: svc.label, price: svc.price } : item))
  }

  const save = () => window.print()

  // Input style shorthand
  const inp: React.CSSProperties = {
    width:'100%', background:'#0d0d0d', border:'1px solid #1e1e1e',
    borderRadius:'4px', padding:'8px 10px', color:'#ede8dd',
    fontSize:'12px', fontFamily:'monospace', outline:'none',
    boxSizing:'border-box',
  }
  const lbl: React.CSSProperties = {
    fontSize:'9px', letterSpacing:'2px', color:'#4a4a4a',
    fontFamily:'monospace', display:'block', marginBottom:'5px',
  }

  return (
    <>
      <div className="proposal-wrapper">

        {/* ── LEFT: Controls ── */}
        <div className="proposal-controls no-print">
          <div style={{ padding:'20px 16px', borderBottom:'1px solid #1e1e1e' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'16px', color:'#ede8dd' }}>
                A<span style={{ color:'#ff4d00' }}>.</span> Proposal Generator
              </div>
              <button onClick={save} style={{
                background:'#ff4d00', border:'none', color:'#080808',
                fontFamily:'monospace', fontSize:'10px', letterSpacing:'2px',
                padding:'8px 16px', borderRadius:'2px', cursor:'pointer', fontWeight:700,
              }}>Save PDF</button>
            </div>
          </div>

          <div style={{ padding:'16px', overflowY:'auto', height:'calc(100vh - 60px)', scrollbarWidth:'thin' }}>

            {/* Client */}
            <div style={{ marginBottom:'20px' }}>
              <p style={{ ...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'10px' }}>CLIENT</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div><span style={lbl}>Full Name</span><input style={inp} placeholder="Sarah Al Maktoum" value={clientName} onChange={e=>setClientName(e.target.value)}/></div>
                <div><span style={lbl}>Company</span><input style={inp} placeholder="Company Name" value={clientCompany} onChange={e=>setClientCompany(e.target.value)}/></div>
                <div><span style={lbl}>Email</span><input style={inp} placeholder="email@company.com" value={clientEmail} onChange={e=>setClientEmail(e.target.value)}/></div>
              </div>
            </div>

            {/* Project */}
            <div style={{ marginBottom:'20px' }}>
              <p style={{ ...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'10px' }}>PROJECT</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div><span style={lbl}>Title</span><input style={inp} placeholder="Brand Identity for Restaurant" value={projectTitle} onChange={e=>setProjectTitle(e.target.value)}/></div>
                <div><span style={lbl}>Brief / Understanding</span>
                  <textarea style={{ ...inp, height:'80px', resize:'vertical' }} placeholder="Describe the project and client's goals..." value={projectBrief} onChange={e=>setProjectBrief(e.target.value)}/>
                </div>
              </div>
            </div>

            {/* Line items */}
            <div style={{ marginBottom:'20px' }}>
              <p style={{ ...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'10px' }}>SCOPE & PRICING</p>
              {items.map((item, idx) => (
                <div key={idx} style={{ background:'#0d0d0d', border:'1px solid #1e1e1e', borderRadius:'4px', padding:'10px', marginBottom:'8px' }}>
                  <div style={{ marginBottom:'6px' }}>
                    <span style={lbl}>Quick select</span>
                    <select style={{ ...inp, background:'#080808' }}
                      onChange={e => {
                        const svc = SERVICES.find(s => s.label === e.target.value)
                        if (svc) applyService(idx, svc)
                      }}>
                      <option value="">— Pick a service —</option>
                      {SERVICES.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom:'6px' }}>
                    <span style={lbl}>Description</span>
                    <input style={inp} placeholder="Service description" value={item.desc} onChange={e=>updateItem(idx,'desc',e.target.value)}/>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'60px 1fr', gap:'8px' }}>
                    <div><span style={lbl}>Qty</span><input type="number" style={inp} value={item.qty} onChange={e=>updateItem(idx,'qty',Number(e.target.value))}/></div>
                    <div><span style={lbl}>Price (AED)</span><input type="number" style={inp} value={item.price} onChange={e=>updateItem(idx,'price',Number(e.target.value))}/></div>
                  </div>
                  {items.length > 1 && (
                    <button onClick={()=>removeItem(idx)} style={{ background:'none', border:'none', color:'#4a4a4a', fontSize:'10px', cursor:'pointer', marginTop:'6px', fontFamily:'monospace' }}>Remove</button>
                  )}
                </div>
              ))}
              <button onClick={addItem} style={{ ...inp, cursor:'pointer', color:'#ff4d00', textAlign:'center', borderStyle:'dashed' }}>+ Add line item</button>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom:'20px' }}>
              <p style={{ ...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'10px' }}>TIMELINE & TERMS</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div><span style={lbl}>Total Duration</span><input style={inp} placeholder="e.g. 3 weeks" value={timeline} onChange={e=>setTimeline(e.target.value)}/></div>
                <div><span style={lbl}>Milestones</span><textarea style={{ ...inp, height:'80px', resize:'vertical' }} value={milestones} onChange={e=>setMilestones(e.target.value)}/></div>
                <div>
                  <span style={lbl}>Payment Terms</span>
                  <select style={{ ...inp, background:'#080808' }} value={paymentTerms} onChange={e=>setPaymentTerms(e.target.value)}>
                    {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><span style={lbl}>Exclusions</span><textarea style={{ ...inp, height:'80px', resize:'vertical' }} value={excludes} onChange={e=>setExcludes(e.target.value)}/></div>
                <div><span style={lbl}>Additional Notes</span><textarea style={{ ...inp, height:'60px', resize:'vertical' }} placeholder="Optional notes..." value={notes} onChange={e=>setNotes(e.target.value)}/></div>
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT: A4 Preview ── */}
        <div className="proposal-preview">
          <div className="proposal-a4">

            {/* Top bar */}
            <div style={{ height:'5px', background:'#ff4d00' }}/>

            {/* Header */}
            <div style={{ padding:'28px 36px 22px', borderBottom:'1px solid #e8e0d5', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                  <div style={{ width:'28px', height:'28px', background:'#ff4d00', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'12px', color:'#fff', borderRadius:'2px' }}>A</div>
                  <span style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'4px', color:'#8a8070' }}>DESIGNAERIUM</span>
                </div>
                <h1 style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'26px', color:'#080808', letterSpacing:'-1px', lineHeight:1, margin:'0 0 4px' }}>
                  {projectTitle || 'Project Proposal'}
                </h1>
                <p style={{ fontFamily:'monospace', fontSize:'9px', color:'#ff4d00', letterSpacing:'1px', margin:0 }}>
                  Prepared for {clientCompany || 'Client Name'} · {getDate()}
                </p>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070', marginBottom:'3px' }}>REF: {ref}</div>
                <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070', marginBottom:'3px' }}>Valid until: {getExpiry()}</div>
                <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070' }}>abhi@adesignaerium.com</div>
                <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070' }}>+971 52 677 6884</div>
              </div>
            </div>

            {/* To/From */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ padding:'16px 28px', borderRight:'1px solid #e8e0d5' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'8px' }}>PREPARED FOR</div>
                <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#080808' }}>
                  {clientName || <span style={{color:'#ccc'}}>Client Name</span>}
                </div>
                {clientCompany && <div style={{ fontFamily:'monospace', fontSize:'10px', color:'#6a6060', marginTop:'2px' }}>{clientCompany}</div>}
                {clientEmail   && <div style={{ fontFamily:'monospace', fontSize:'9px', color:'#8a8070',  marginTop:'2px' }}>{clientEmail}</div>}
              </div>
              <div style={{ padding:'16px 28px' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'8px' }}>PREPARED BY</div>
                <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#080808' }}>Abhijeeth Subhash</div>
                <div style={{ fontFamily:'monospace', fontSize:'10px', color:'#ff4d00', marginTop:'2px' }}>Senior Creative Designer · Dubai, UAE</div>
                <div style={{ fontFamily:'monospace', fontSize:'9px', color:'#8a8070', marginTop:'2px' }}>adesignaerium.com</div>
                <div style={{ fontFamily:'monospace', fontSize:'9px', color:'#8a8070', marginTop:'1px' }}>+971 52 677 6884</div>
              </div>
            </div>

            {/* Project Understanding */}
            {projectBrief && (
              <div style={{ padding:'18px 28px', borderBottom:'1px solid #e8e0d5', background:'#faf8f5' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'8px' }}>PROJECT UNDERSTANDING</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#4a4a4a', lineHeight:1.7, margin:0 }}>{projectBrief}</p>
              </div>
            )}

            {/* Scope & Pricing */}
            <div style={{ padding:'18px 28px', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'10px' }}>SCOPE OF WORK & INVESTMENT</div>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'11px' }}>
                <thead>
                  <tr style={{ background:'#f5f0e8' }}>
                    <th style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'1px', color:'#8a8070', padding:'7px 10px', textAlign:'left', fontWeight:400 }}>DESCRIPTION</th>
                    <th style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'1px', color:'#8a8070', padding:'7px 10px', textAlign:'center', fontWeight:400, width:'40px' }}>QTY</th>
                    <th style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'1px', color:'#8a8070', padding:'7px 10px', textAlign:'right', fontWeight:400, width:'100px' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom:'1px solid #f0ece6' }}>
                      <td style={{ padding:'8px 10px', fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#080808' }}>{item.desc || '—'}</td>
                      <td style={{ padding:'8px 10px', textAlign:'center', fontFamily:'monospace', fontSize:'10px', color:'#8a8070' }}>{item.qty}</td>
                      <td style={{ padding:'8px 10px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#080808' }}>{item.price ? fmt(item.qty * item.price) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop:'1px solid #e8e0d5' }}>
                    <td colSpan={2} style={{ padding:'7px 10px', fontFamily:'monospace', fontSize:'9px', color:'#8a8070', textAlign:'right' }}>SUBTOTAL</td>
                    <td style={{ padding:'7px 10px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#080808' }}>{fmt(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ padding:'4px 10px', fontFamily:'monospace', fontSize:'9px', color:'#8a8070', textAlign:'right' }}>VAT 5%</td>
                    <td style={{ padding:'4px 10px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#8a8070' }}>{fmt(vat)}</td>
                  </tr>
                  <tr style={{ background:'#080808' }}>
                    <td colSpan={2} style={{ padding:'9px 10px', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'12px', color:'#ff4d00', textAlign:'right', letterSpacing:'1px' }}>TOTAL</td>
                    <td style={{ padding:'9px 10px', textAlign:'right', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#ffffff', letterSpacing:'-0.5px' }}>{fmt(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Timeline + Exclusions side by side */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ padding:'16px 28px', borderRight:'1px solid #e8e0d5' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'8px' }}>TIMELINE {timeline && `· ${timeline}`}</div>
                {milestones.split('\n').filter(Boolean).map((m,i) => (
                  <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', marginBottom:'5px' }}>
                    <span style={{ width:'4px', height:'4px', background:'#ff4d00', borderRadius:'50%', flexShrink:0, marginTop:'5px' }}/>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'#4a4a4a', lineHeight:1.5 }}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding:'16px 28px' }}>
                <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'8px' }}>NOT INCLUDED</div>
                {excludes.split('\n').filter(Boolean).map((e,i) => (
                  <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', marginBottom:'5px' }}>
                    <span style={{ fontFamily:'monospace', fontSize:'10px', color:'#ccc', flexShrink:0 }}>—</span>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'#8a8070', lineHeight:1.5 }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment + Notes */}
            <div style={{ padding:'16px 28px', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                <div>
                  <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'5px' }}>PAYMENT TERMS</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#080808' }}>{paymentTerms}</div>
                </div>
                <div style={{ background:'#fff8f5', border:'1px solid #ffcfb3', borderRadius:'4px', padding:'8px 14px' }}>
                  <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'2px', color:'#ff4d00', marginBottom:'2px' }}>FIRST PAYMENT DUE</div>
                  <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'16px', color:'#080808' }}>
                    {paymentTerms.includes('50%') ? fmt(Math.round(total*0.5)) :
                     paymentTerms.includes('40%') ? fmt(Math.round(total*0.4)) :
                     paymentTerms.includes('60%') ? fmt(Math.round(total*0.6)) :
                     paymentTerms.includes('100%') ? fmt(total) : fmt(total)}
                  </div>
                </div>
              </div>
              {notes && <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'#6a6060', marginTop:'10px', lineHeight:1.6, fontStyle:'italic' }}>{notes}</p>}
            </div>

            {/* Acceptance */}
            <div style={{ padding:'16px 28px', borderBottom:'1px solid #e8e0d5' }}>
              <div style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'10px' }}>ACCEPTANCE</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                <div>
                  <div style={{ borderBottom:'1px solid #080808', height:'32px', marginBottom:'5px' }}/>
                  <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070' }}>Client Signature</div>
                </div>
                <div>
                  <div style={{ borderBottom:'1px solid #080808', height:'32px', marginBottom:'5px' }}/>
                  <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#8a8070' }}>Date</div>
                </div>
              </div>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', color:'#aaa098', marginTop:'10px', lineHeight:1.6 }}>
                By signing, the client agrees to the scope, pricing, and payment terms outlined in this proposal. Work begins upon receipt of first payment. This proposal is valid for 14 days from the date issued.
              </p>
            </div>

            {/* Footer */}
            <div style={{ padding:'14px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontFamily:'monospace', fontSize:'8px', color:'#aaa098' }}>adesignaerium.com · abhi@adesignaerium.com · +971 52 677 6884</div>
              <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#ff4d00', letterSpacing:'-0.5px' }}>A.</div>
            </div>

            <div style={{ height:'3px', background:'#e8e0d5' }}/>
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing:border-box; }
        body { margin:0; background:#111; }
        .proposal-wrapper {
          display:flex; height:100vh; overflow:hidden;
          position:fixed; inset:0; z-index:100;
          background:#111;
        }
        .proposal-controls {
          width:320px; min-width:280px; background:#080808;
          border-right:1px solid #1e1e1e; flex-shrink:0;
          overflow-y:auto;
        }
        .proposal-preview {
          flex:1; overflow-y:auto; padding:24px;
          background:#1a1a1a;
          display:flex; justify-content:center;
        }
        .proposal-a4 {
          width:794px; min-height:1123px;
          background:#ffffff; color:#080808;
          font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;
          box-shadow:0 8px 40px rgba(0,0,0,0.5);
          flex-shrink:0;
        }
        @media print {
          .no-print { display:none!important; }
          body { background:#fff!important; }
          .proposal-wrapper { height:auto; display:block; }
          .proposal-preview { padding:0; background:#fff; }
          .proposal-a4 {
            width:100%; box-shadow:none;
            min-height:auto;
          }
          @page { size:A4; margin:0; }
        }
      `}</style>
    </>
  )
}
