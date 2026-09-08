'use client'
import { useState, useEffect } from 'react'

// ── 3-Tier Service Catalogue ──────────────────────────────────────
const CATALOGUE = [
  {
    category: 'Brand Identity',
    tiers: [
      { tier:'STARTER',  label:'Logo + Colours + Typography',              price:2500,  timeline:'5 days',    includes:'Logo (2 concepts), colour palette, 1 font family, PNG/SVG files' },
      { tier:'STANDARD', label:'Full Identity System + Guidelines',         price:7500,  timeline:'2–3 weeks', includes:'Logo suite, brand guidelines, colour system, typography, patterns, mockups' },
      { tier:'PREMIUM',  label:'Brand World + Web + Motion + Strategy',     price:18000, timeline:'4–6 weeks', includes:'Everything in Standard + website, motion identity, brand voice, launch strategy' },
    ]
  },
  {
    category: 'Web Design & Development',
    tiers: [
      { tier:'STARTER',  label:'1-Page Landing Page',                      price:3500,  timeline:'1 week',    includes:'Single page design + Next.js build + Vercel deployment + mobile responsive' },
      { tier:'STANDARD', label:'5-Page Brand Website',                     price:10000, timeline:'3–4 weeks', includes:'Up to 5 pages, CMS, SEO setup, contact form, mobile responsive, 1 month support' },
      { tier:'PREMIUM',  label:'Full E-Commerce / Platform',               price:25000, timeline:'6–8 weeks', includes:'Full store, product pages, checkout, admin panel, analytics, 3 months support' },
    ]
  },
  {
    category: 'AI Video Production',
    tiers: [
      { tier:'STARTER',  label:'30-Sec Product Reel',                      price:1800,  timeline:'3 days',    includes:'Storyboard, Veo3/Seedance production, 1 revision, 9:16 + 16:9 delivery' },
      { tier:'STANDARD', label:'60-Sec Brand Film + Voiceover',            price:5500,  timeline:'5–7 days',  includes:'Full storyboard, AI production, ElevenLabs voiceover, 2 revisions, all formats' },
      { tier:'PREMIUM',  label:'Full Campaign — 3 Videos + Social Cuts',   price:14000, timeline:'2 weeks',   includes:'3 hero videos, 6 social cuts, consistent characters, music, captions, all formats' },
    ]
  },
  {
    category: 'Social Content',
    tiers: [
      { tier:'STARTER',  label:'4 Reels / Month',                         price:3200,  timeline:'Monthly',   includes:'4 branded reels, captioned, scheduled, brand consistent' },
      { tier:'STANDARD', label:'8 Reels + Content Strategy',              price:6500,  timeline:'Monthly',   includes:'8 reels, monthly strategy, hashtag research, performance review' },
      { tier:'PREMIUM',  label:'Full Creative Direction + 12 Reels',      price:12000, timeline:'Monthly',   includes:'12 reels, full art direction, stories, highlights, brand playbook' },
    ]
  },
  {
    category: 'Packaging & Print',
    tiers: [
      { tier:'STARTER',  label:'Single Item — Box or Bag',                price:2000,  timeline:'5 days',    includes:'1 packaging item, dieline, print-ready CMYK files' },
      { tier:'STANDARD', label:'Full Gifting Set + Inserts',              price:6500,  timeline:'2 weeks',   includes:'Box + tissue + ribbon + insert + tag, all print-ready, supplier-ready files' },
      { tier:'PREMIUM',  label:'Catalogue + Full Packaging System',       price:14000, timeline:'3 weeks',   includes:'Full gifting collection + 24-page catalogue, brand consistent, print + digital' },
    ]
  },
  {
    category: 'AI Creative Direction',
    tiers: [
      { tier:'STARTER',  label:'10 Campaign Images',                      price:2500,  timeline:'2–3 days',  includes:'10 Midjourney-directed images, retouched, branded, high-res delivery' },
      { tier:'STANDARD', label:'25 Images + Style Guide',                 price:6000,  timeline:'1 week',    includes:'25 images, consistent brand aesthetic, Midjourney style guide for reuse' },
      { tier:'PREMIUM',  label:'Full AI Campaign Production',             price:12000, timeline:'2 weeks',   includes:'40+ images, video stills, character consistency, full campaign rollout' },
    ]
  },
  {
    category: 'Monthly Retainer',
    tiers: [
      { tier:'STARTER',  label:'On-Call Creative — 10 hrs/month',         price:5000,  timeline:'Monthly',   includes:'10 hours design, social, or motion — first priority response' },
      { tier:'STANDARD', label:'On-Call Creative — 20 hrs/month',         price:8000,  timeline:'Monthly',   includes:'20 hours, same-day quick tasks, monthly strategy call' },
      { tier:'PREMIUM',  label:'Full Creative Director — Unlimited',      price:15000, timeline:'Monthly',   includes:'Unlimited requests, daily availability, brand governance, quarterly review' },
    ]
  },
]

const TIER_COLORS: Record<string, string> = {
  STARTER:  '#22c55e',
  STANDARD: '#ff4d00',
  PREMIUM:  '#7c3aed',
}

const PAYMENT_TERMS = [
  '50% upfront, 50% on delivery',
  '40% upfront, 30% at midpoint, 30% on delivery',
  '60% upfront, 40% on delivery',
  '100% upfront',
  'Monthly in advance (retainer)',
]

function fmt(n: number) { return `AED ${n.toLocaleString('en-AE')}` }
function pad(n: number) { return n.toString().padStart(2,'0') }
function getDate() {
  const d = new Date()
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`
}
function getExpiry() {
  const d = new Date(); d.setDate(d.getDate()+14)
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`
}
function getRef() { return `ADA-${new Date().getFullYear()}-${Math.floor(100+Math.random()*900)}` }

type LineItem = { category:string; tier:string; label:string; includes:string; timeline:string; qty:number; price:number; custom:boolean }

export default function ProposalPage() {
  const [ref] = useState(getRef())

  useEffect(() => {
    document.body.classList.add('pdf-mode')
    document.body.style.overflow = 'hidden'
    return () => { document.body.classList.remove('pdf-mode'); document.body.style.overflow = '' }
  }, [])

  const [clientName,    setClientName]    = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [clientEmail,   setClientEmail]   = useState('')
  const [projectTitle,  setProjectTitle]  = useState('')
  const [projectBrief,  setProjectBrief]  = useState('')
  const [items,         setItems]         = useState<LineItem[]>([])
  const [timeline,      setTimeline]      = useState('')
  const [milestones,    setMilestones]    = useState('Week 1: Discovery & Brief\nWeek 2: Concept Presentation\nWeek 3: Revisions & Refinement\nWeek 4: Final Delivery')
  const [paymentTerms,  setPaymentTerms]  = useState(PAYMENT_TERMS[0])
  const [excludes,      setExcludes]      = useState('Stock photography & licensed fonts\nPrinting / production costs\nMore than 2 rounds of revisions\nContent writing / copywriting\nArabic translation\nFuture updates after 30 days')
  const [notes,         setNotes]         = useState('')

  const subtotal = items.reduce((s,i) => s + i.qty * i.price, 0)
  const vat      = Math.round(subtotal * 0.05)
  const total    = subtotal + vat

  const addTier = (cat: typeof CATALOGUE[0], t: typeof CATALOGUE[0]['tiers'][0]) => {
    setItems(prev => [...prev, {
      category:t.tier, tier:t.tier, label:`${cat.category} — ${t.label}`,
      includes:t.includes, timeline:t.timeline, qty:1, price:t.price, custom:false,
    }])
  }

  const addCustom = () => setItems(prev => [...prev, {
    category:'CUSTOM', tier:'CUSTOM', label:'Custom scope', includes:'', timeline:'', qty:1, price:0, custom:true,
  }])

  const removeItem  = (i:number) => setItems(prev => prev.filter((_,j) => j!==i))
  const updateItem  = (i:number, f:string, v:string|number) =>
    setItems(prev => prev.map((item,j) => j===i ? {...item,[f]:v} : item))

  const inp: React.CSSProperties = {
    width:'100%', background:'#0d0d0d', border:'1px solid #1e1e1e',
    borderRadius:'4px', padding:'7px 10px', color:'#ede8dd',
    fontSize:'11px', fontFamily:'monospace', outline:'none', boxSizing:'border-box',
  }
  const lbl: React.CSSProperties = {
    fontSize:'9px', letterSpacing:'2px', color:'#4a4a4a',
    fontFamily:'monospace', display:'block', marginBottom:'4px',
  }

  return (
    <>
      <div className="prop-wrap">

        {/* ── LEFT CONTROLS ── */}
        <div className="prop-ctrl no-print">

          {/* Toolbar */}
          <div style={{ padding:'14px 16px', borderBottom:'1px solid #1e1e1e', display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0a0a0a' }}>
            <div style={{ fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'15px', color:'#ede8dd' }}>
              A<span style={{color:'#ff4d00'}}>.</span> Proposals
            </div>
            <button onClick={() => window.print()} style={{
              background:'#ff4d00', border:'none', color:'#080808',
              fontFamily:'monospace', fontSize:'10px', letterSpacing:'2px',
              padding:'8px 16px', borderRadius:'2px', cursor:'pointer', fontWeight:700,
            }}>Save PDF</button>
          </div>

          <div style={{ overflowY:'auto', height:'calc(100vh - 52px)', padding:'16px', scrollbarWidth:'thin' }}>

            {/* CLIENT */}
            <p style={{...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'8px'}}>CLIENT</p>
            <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'18px'}}>
              <div><span style={lbl}>Full Name</span><input style={inp} placeholder="Sarah Al Maktoum" value={clientName} onChange={e=>setClientName(e.target.value)}/></div>
              <div><span style={lbl}>Company</span><input style={inp} placeholder="Company Name" value={clientCompany} onChange={e=>setClientCompany(e.target.value)}/></div>
              <div><span style={lbl}>Email</span><input style={inp} placeholder="email@company.com" value={clientEmail} onChange={e=>setClientEmail(e.target.value)}/></div>
            </div>

            {/* PROJECT */}
            <p style={{...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'8px'}}>PROJECT</p>
            <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'18px'}}>
              <div><span style={lbl}>Title</span><input style={inp} placeholder="Brand Identity for Restaurant" value={projectTitle} onChange={e=>setProjectTitle(e.target.value)}/></div>
              <div><span style={lbl}>Brief</span><textarea style={{...inp,height:'70px',resize:'vertical'}} placeholder="Client goals and project overview..." value={projectBrief} onChange={e=>setProjectBrief(e.target.value)}/></div>
            </div>

            {/* SERVICE PICKER */}
            <p style={{...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'10px'}}>ADD SERVICES</p>
            {CATALOGUE.map(cat => (
              <div key={cat.category} style={{marginBottom:'10px', background:'#0d0d0d', border:'1px solid #1e1e1e', borderRadius:'6px', overflow:'hidden'}}>
                <div style={{padding:'8px 12px', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'11px', color:'#ede8dd', letterSpacing:'-0.3px', borderBottom:'1px solid #1a1a1a'}}>
                  {cat.category}
                </div>
                <div style={{padding:'8px 12px', display:'flex', flexDirection:'column', gap:'5px'}}>
                  {cat.tiers.map(t => (
                    <button key={t.tier} onClick={() => addTier(cat, t)}
                      style={{
                        background:'transparent', border:`1px solid ${TIER_COLORS[t.tier]}22`,
                        borderRadius:'4px', padding:'7px 10px', cursor:'pointer',
                        display:'flex', justifyContent:'space-between', alignItems:'center',
                        transition:'all .2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${TIER_COLORS[t.tier]}15`)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{display:'flex',alignItems:'center',gap:'8px',flex:1,minWidth:0}}>
                        <span style={{
                          fontFamily:'monospace', fontSize:'7px', letterSpacing:'1.5px',
                          color:TIER_COLORS[t.tier], background:`${TIER_COLORS[t.tier]}20`,
                          padding:'2px 6px', borderRadius:'2px', flexShrink:0,
                        }}>{t.tier}</span>
                        <span style={{fontFamily:'monospace', fontSize:'10px', color:'#8a8070', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                          {t.label}
                        </span>
                      </div>
                      <span style={{fontFamily:'monospace', fontSize:'10px', color:'#ede8dd', flexShrink:0, marginLeft:'8px'}}>
                        {fmt(t.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* SELECTED ITEMS */}
            {items.length > 0 && (
              <div style={{marginBottom:'18px', marginTop:'6px'}}>
                <p style={{...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'8px'}}>SELECTED ({items.length})</p>
                {items.map((item,i) => (
                  <div key={i} style={{background:'#0d0d0d', border:`1px solid ${TIER_COLORS[item.tier]||'#1e1e1e'}33`, borderRadius:'4px', padding:'8px 10px', marginBottom:'6px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'4px'}}>
                      <div style={{flex:1}}>
                        <span style={{fontFamily:'monospace', fontSize:'7px', color:TIER_COLORS[item.tier]||'#8a8070', letterSpacing:'1px'}}>{item.tier}</span>
                        {item.custom ? (
                          <input style={{...inp, marginTop:'3px'}} placeholder="Custom service description" value={item.label} onChange={e=>updateItem(i,'label',e.target.value)}/>
                        ) : (
                          <div style={{fontFamily:'monospace', fontSize:'10px', color:'#ede8dd', marginTop:'2px', lineHeight:1.4}}>{item.label}</div>
                        )}
                      </div>
                      <button onClick={()=>removeItem(i)} style={{background:'none', border:'none', color:'#4a4a4a', cursor:'pointer', fontSize:'14px', marginLeft:'8px', flexShrink:0}}>×</button>
                    </div>
                    <div style={{display:'flex', gap:'6px', alignItems:'center'}}>
                      <div style={{flex:'0 0 40px'}}>
                        <span style={lbl}>Qty</span>
                        <input type="number" style={{...inp, padding:'4px 6px'}} value={item.qty} onChange={e=>updateItem(i,'qty',Number(e.target.value))}/>
                      </div>
                      <div style={{flex:1}}>
                        <span style={lbl}>Price (AED)</span>
                        <input type="number" style={{...inp, padding:'4px 6px'}} value={item.price} onChange={e=>updateItem(i,'price',Number(e.target.value))}/>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addCustom} style={{...inp, cursor:'pointer', color:'#ff4d00', textAlign:'center', borderStyle:'dashed', padding:'7px'}}>+ Add custom line</button>
              </div>
            )}

            {/* TERMS */}
            <p style={{...lbl, color:'#ff4d00', fontSize:'10px', marginBottom:'8px'}}>TIMELINE & TERMS</p>
            <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'16px'}}>
              <div><span style={lbl}>Total Duration</span><input style={inp} placeholder="e.g. 3 weeks" value={timeline} onChange={e=>setTimeline(e.target.value)}/></div>
              <div><span style={lbl}>Milestones</span><textarea style={{...inp,height:'72px',resize:'vertical'}} value={milestones} onChange={e=>setMilestones(e.target.value)}/></div>
              <div>
                <span style={lbl}>Payment Terms</span>
                <select style={{...inp,background:'#080808'}} value={paymentTerms} onChange={e=>setPaymentTerms(e.target.value)}>
                  {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><span style={lbl}>Exclusions</span><textarea style={{...inp,height:'72px',resize:'vertical'}} value={excludes} onChange={e=>setExcludes(e.target.value)}/></div>
              <div><span style={lbl}>Notes</span><textarea style={{...inp,height:'50px',resize:'vertical'}} placeholder="Optional..." value={notes} onChange={e=>setNotes(e.target.value)}/></div>
            </div>

          </div>
        </div>

        {/* ── RIGHT: A4 PREVIEW ── */}
        <div className="prop-preview">
          <div className="prop-a4">

            <div style={{height:'5px', background:'#ff4d00'}}/>

            {/* Header */}
            <div style={{padding:'24px 32px 18px', borderBottom:'1px solid #e8e0d5', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px'}}>
                  <div style={{width:'26px', height:'26px', background:'#ff4d00', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'12px', color:'#fff', borderRadius:'2px'}}>A</div>
                  <span style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'4px', color:'#8a8070'}}>DESIGNAERIUM</span>
                </div>
                <h1 style={{fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'24px', color:'#080808', letterSpacing:'-1px', lineHeight:1, margin:'0 0 4px'}}>
                  {projectTitle || 'Project Proposal'}
                </h1>
                <p style={{fontFamily:'monospace', fontSize:'9px', color:'#ff4d00', letterSpacing:'0.5px', margin:0}}>
                  Prepared for {clientCompany || 'Client'} · {getDate()}
                </p>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'monospace', fontSize:'8px', color:'#8a8070', marginBottom:'3px'}}>REF: <strong style={{color:'#080808'}}>{ref}</strong></div>
                <div style={{fontFamily:'monospace', fontSize:'8px', color:'#8a8070', marginBottom:'3px'}}>Issued: {getDate()}</div>
                <div style={{fontFamily:'monospace', fontSize:'8px', color:'#8a8070'}}>Valid until: {getExpiry()}</div>
              </div>
            </div>

            {/* To / From */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5'}}>
              <div style={{padding:'14px 24px', borderRight:'1px solid #e8e0d5'}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'7px'}}>PREPARED FOR</div>
                <div style={{fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#080808'}}>{clientName || <span style={{color:'#ccc'}}>Client Name</span>}</div>
                {clientCompany && <div style={{fontFamily:'monospace', fontSize:'9px', color:'#6a6060', marginTop:'2px'}}>{clientCompany}</div>}
                {clientEmail   && <div style={{fontFamily:'monospace', fontSize:'9px', color:'#8a8070', marginTop:'1px'}}>{clientEmail}</div>}
              </div>
              <div style={{padding:'14px 24px'}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'7px'}}>PREPARED BY</div>
                <div style={{fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#080808'}}>Abhijeeth Subhash</div>
                <div style={{fontFamily:'monospace', fontSize:'9px', color:'#ff4d00', marginTop:'2px'}}>Senior Creative Designer · Dubai</div>
                <div style={{fontFamily:'monospace', fontSize:'9px', color:'#8a8070', marginTop:'1px'}}>abhi@adesignaerium.com</div>
                <div style={{fontFamily:'monospace', fontSize:'9px', color:'#8a8070', marginTop:'1px'}}>+971 52 677 6884</div>
              </div>
            </div>

            {/* Brief */}
            {projectBrief && (
              <div style={{padding:'14px 24px', borderBottom:'1px solid #e8e0d5', background:'#faf8f5'}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'7px'}}>PROJECT UNDERSTANDING</div>
                <p style={{fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#4a4a4a', lineHeight:1.7, margin:0}}>{projectBrief}</p>
              </div>
            )}

            {/* Scope table */}
            <div style={{padding:'14px 24px', borderBottom:'1px solid #e8e0d5'}}>
              <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'10px'}}>SCOPE OF WORK & INVESTMENT</div>
              {items.length === 0 ? (
                <p style={{fontFamily:'monospace', fontSize:'10px', color:'#ccc', textAlign:'center', padding:'20px 0'}}>Add services from the left panel</p>
              ) : (
                <table style={{width:'100%', borderCollapse:'collapse', fontSize:'10px'}}>
                  <thead>
                    <tr style={{background:'#f5f0e8'}}>
                      <th style={{fontFamily:'monospace', fontSize:'7px', color:'#8a8070', padding:'6px 8px', textAlign:'left', fontWeight:400, letterSpacing:'1px'}}>SERVICE</th>
                      <th style={{fontFamily:'monospace', fontSize:'7px', color:'#8a8070', padding:'6px 8px', textAlign:'left', fontWeight:400, letterSpacing:'1px', width:'80px'}}>TIER</th>
                      <th style={{fontFamily:'monospace', fontSize:'7px', color:'#8a8070', padding:'6px 8px', textAlign:'left', fontWeight:400, letterSpacing:'1px', width:'70px'}}>TIMELINE</th>
                      <th style={{fontFamily:'monospace', fontSize:'7px', color:'#8a8070', padding:'6px 8px', textAlign:'right', fontWeight:400, letterSpacing:'1px', width:'90px'}}>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item,i) => (
                      <tr key={i} style={{borderBottom:'1px solid #f0ece6'}}>
                        <td style={{padding:'8px 8px'}}>
                          <div style={{fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#080808', fontWeight:500}}>{item.label}</div>
                          {item.includes && <div style={{fontFamily:'DM Sans,sans-serif', fontSize:'9px', color:'#8a8070', marginTop:'2px', lineHeight:1.4}}>{item.includes}</div>}
                        </td>
                        <td style={{padding:'8px', verticalAlign:'top'}}>
                          <span style={{fontFamily:'monospace', fontSize:'7px', color:TIER_COLORS[item.tier]||'#8a8070', background:`${TIER_COLORS[item.tier]||'#8a8070'}15`, padding:'2px 6px', borderRadius:'2px', letterSpacing:'1px', whiteSpace:'nowrap'}}>
                            {item.tier}
                          </span>
                        </td>
                        <td style={{padding:'8px', fontFamily:'monospace', fontSize:'9px', color:'#8a8070', verticalAlign:'top', whiteSpace:'nowrap'}}>{item.timeline}</td>
                        <td style={{padding:'8px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#080808', verticalAlign:'top', whiteSpace:'nowrap'}}>{fmt(item.qty*item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><td colSpan={3} style={{padding:'6px 8px', fontFamily:'monospace', fontSize:'8px', color:'#8a8070', textAlign:'right'}}>SUBTOTAL</td><td style={{padding:'6px 8px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#080808'}}>{fmt(subtotal)}</td></tr>
                    <tr><td colSpan={3} style={{padding:'3px 8px', fontFamily:'monospace', fontSize:'8px', color:'#8a8070', textAlign:'right'}}>VAT 5%</td><td style={{padding:'3px 8px', textAlign:'right', fontFamily:'monospace', fontSize:'10px', color:'#8a8070'}}>{fmt(vat)}</td></tr>
                    <tr style={{background:'#080808'}}>
                      <td colSpan={3} style={{padding:'9px 8px', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'11px', color:'#ff4d00', textAlign:'right', letterSpacing:'1px'}}>TOTAL INVESTMENT</td>
                      <td style={{padding:'9px 8px', textAlign:'right', fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#fff', letterSpacing:'-0.5px', whiteSpace:'nowrap'}}>{fmt(total)}</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>

            {/* Timeline + Exclusions */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid #e8e0d5'}}>
              <div style={{padding:'14px 24px', borderRight:'1px solid #e8e0d5'}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'7px'}}>TIMELINE{timeline && ` · ${timeline}`}</div>
                {milestones.split('\n').filter(Boolean).map((m,i) => (
                  <div key={i} style={{display:'flex', gap:'7px', alignItems:'flex-start', marginBottom:'4px'}}>
                    <span style={{width:'4px', height:'4px', background:'#ff4d00', borderRadius:'50%', flexShrink:0, marginTop:'5px'}}/>
                    <span style={{fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'#4a4a4a', lineHeight:1.5}}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:'14px 24px'}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'7px'}}>NOT INCLUDED</div>
                {excludes.split('\n').filter(Boolean).map((e,i) => (
                  <div key={i} style={{display:'flex', gap:'7px', alignItems:'flex-start', marginBottom:'4px'}}>
                    <span style={{fontFamily:'monospace', fontSize:'10px', color:'#ccc', flexShrink:0}}>—</span>
                    <span style={{fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'#8a8070', lineHeight:1.5}}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{padding:'14px 24px', borderBottom:'1px solid #e8e0d5', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px'}}>
              <div>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'5px'}}>PAYMENT TERMS</div>
                <div style={{fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'#080808'}}>{paymentTerms}</div>
                {notes && <p style={{fontFamily:'DM Sans,sans-serif', fontSize:'9px', color:'#6a6060', marginTop:'6px', fontStyle:'italic', lineHeight:1.6}}>{notes}</p>}
              </div>
              <div style={{background:'#fff8f5', border:'1px solid #ffcfb3', borderRadius:'4px', padding:'8px 14px', textAlign:'center', flexShrink:0}}>
                <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'2px', color:'#ff4d00', marginBottom:'2px'}}>FIRST PAYMENT DUE</div>
                <div style={{fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'16px', color:'#080808'}}>
                  {paymentTerms.includes('50%') ? fmt(Math.round(total*.5)) :
                   paymentTerms.includes('40%') ? fmt(Math.round(total*.4)) :
                   paymentTerms.includes('60%') ? fmt(Math.round(total*.6)) : fmt(total)}
                </div>
              </div>
            </div>

            {/* Acceptance */}
            <div style={{padding:'14px 24px', borderBottom:'1px solid #e8e0d5'}}>
              <div style={{fontFamily:'monospace', fontSize:'7px', letterSpacing:'3px', color:'#ff4d00', marginBottom:'10px'}}>ACCEPTANCE</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'8px'}}>
                <div><div style={{borderBottom:'1px solid #080808', height:'28px', marginBottom:'4px'}}/><div style={{fontFamily:'monospace', fontSize:'8px', color:'#8a8070'}}>Client Signature & Date</div></div>
                <div><div style={{borderBottom:'1px solid #080808', height:'28px', marginBottom:'4px'}}/><div style={{fontFamily:'monospace', fontSize:'8px', color:'#8a8070'}}>Authorised Signatory</div></div>
              </div>
              <p style={{fontFamily:'DM Sans,sans-serif', fontSize:'8.5px', color:'#aaa098', margin:0, lineHeight:1.6}}>
                By signing, the client agrees to the scope, pricing, and payment terms outlined. Work begins upon receipt of first payment. This proposal is valid for 14 days from issue date.
              </p>
            </div>

            {/* Footer */}
            <div style={{padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontFamily:'monospace', fontSize:'7.5px', color:'#aaa098'}}>adesignaerium.com · abhi@adesignaerium.com · +971 52 677 6884</div>
              <div style={{fontFamily:'Clash Display,Arial Black,sans-serif', fontWeight:700, fontSize:'14px', color:'#ff4d00'}}>A.</div>
            </div>
            <div style={{height:'3px', background:'#e8e0d5'}}/>

          </div>
        </div>
      </div>

      <style>{`
        *{box-sizing:border-box;}
        body{margin:0;background:#111;}
        .prop-wrap{display:flex;height:100vh;overflow:hidden;position:fixed;inset:0;z-index:100;background:#111;}
        .prop-ctrl{width:310px;min-width:280px;background:#080808;border-right:1px solid #1e1e1e;flex-shrink:0;overflow:hidden;display:flex;flex-direction:column;}
        .prop-preview{flex:1;overflow-y:auto;padding:20px;background:#1a1a1a;display:flex;justify-content:center;}
        .prop-a4{width:794px;min-height:1123px;background:#fff;color:#080808;font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 40px rgba(0,0,0,0.5);flex-shrink:0;}
        @media(max-width:768px){
          .prop-ctrl{width:100%;height:50vh;border-right:none;border-bottom:1px solid #1e1e1e;}
          .prop-wrap{flex-direction:column;}
          .prop-preview{padding:12px;}
          .prop-a4{width:100%;min-height:auto;transform-origin:top left;}
        }
        @media print{
          .no-print{display:none!important;}
          body{background:#fff!important;}
          .prop-wrap{position:static;height:auto;display:block;}
          .prop-preview{padding:0;background:#fff;}
          .prop-a4{width:100%;box-shadow:none;min-height:auto;}
          @page{size:A4;margin:0;}
        }
      `}</style>
    </>
  )
}
