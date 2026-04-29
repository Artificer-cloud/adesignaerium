import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Abhijeeth Subhash — Senior Creative Designer Dubai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Orange accent top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#ff4d00', display: 'flex' }} />

        {/* Grid of work image placeholders (colour blocks representing the 9 projects) */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexWrap: 'wrap',
          opacity: 0.22,
        }}>
          {[
            '#060d18','#0d0d18','#040f07','#100d04',
            '#060d18','#0a0618','#120808','#0a0a12','#080a08',
          ].map((col, i) => (
            <div key={i} style={{
              width: i < 4 ? '25%' : '20%',
              height: i < 4 ? '50%' : '50%',
              background: col,
              borderRight: '1px solid #1e1e1e',
              borderBottom: '1px solid #1e1e1e',
              display: 'flex',
            }} />
          ))}
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.9) 100%)',
          display: 'flex',
        }} />

        {/* Orange vertical accent line */}
        <div style={{
          position: 'absolute', left: '80px', top: '80px', bottom: '80px',
          width: '2px', background: 'linear-gradient(to bottom, #ff4d00, transparent)',
          display: 'flex',
        }} />

        {/* Main content */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          padding: '72px 100px',
        }}>
          {/* Logo / brand mark */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto',
          }}>
            <div style={{
              width: '36px', height: '36px', background: '#ff4d00',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 900, color: '#080808',
            }}>A</div>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#8a8070', fontFamily: 'monospace' }}>
              DESIGNAERIUM
            </div>
          </div>

          {/* Hero text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', letterSpacing: '4px', color: '#ff4d00', marginBottom: '20px', fontFamily: 'monospace' }}>
              ✦ SENIOR CREATIVE DESIGNER · DUBAI, UAE
            </div>
            <div style={{
              fontSize: '108px', fontWeight: 900, color: '#ede8dd',
              lineHeight: 0.85, letterSpacing: '-5px', marginBottom: '24px',
            }}>
              Abhi.
            </div>
            <div style={{
              fontSize: '22px', color: '#ff4d00', fontStyle: 'italic',
              letterSpacing: '0px', marginBottom: '28px',
            }}>
              If it looks average, I didn&apos;t make it.
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[['7+','Years'],['100+','Projects'],['50+','Clients'],['100%','Satisfaction']].map(([n, l]) => (
                <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#ff4d00', letterSpacing: '-1px' }}>{n}</div>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#8a8070', fontFamily: 'monospace' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* URL bottom right */}
          <div style={{
            position: 'absolute', bottom: '72px', right: '100px',
            fontSize: '11px', letterSpacing: '3px', color: '#4a4a4a', fontFamily: 'monospace',
          }}>
            adesignaerium.com
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#1e1e1e', display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
