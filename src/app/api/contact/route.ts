import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      // Fallback: return mailto link data so client can open email client
      return NextResponse.json({ fallback: true }, { status: 200 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ADesignAerium Contact <contact@adesignaerium.com>',
        to: ['abhijeethpiyush4@gmail.com'],
        reply_to: email,
        subject: `Portfolio Enquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#080808;color:#ede8dd;padding:40px;border-radius:8px;">
            <div style="border-bottom:2px solid #ff4d00;padding-bottom:20px;margin-bottom:28px;">
              <h1 style="color:#ff4d00;font-size:24px;margin:0;letter-spacing:-1px;">New Portfolio Enquiry</h1>
              <p style="color:#8a8070;font-size:12px;margin:8px 0 0;letter-spacing:2px;font-family:monospace;">VIA ADESIGNAERIUM.COM</p>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#8a8070;font-size:11px;letter-spacing:2px;font-family:monospace;width:100px;">NAME</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#ede8dd;font-size:15px;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#8a8070;font-size:11px;letter-spacing:2px;font-family:monospace;">EMAIL</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;"><a href="mailto:${email}" style="color:#ff4d00;">${email}</a></td></tr>
            </table>
            <div style="background:#111;border:1px solid #1e1e1e;border-radius:4px;padding:24px;">
              <p style="color:#8a8070;font-size:11px;letter-spacing:2px;font-family:monospace;margin:0 0 12px;">MESSAGE</p>
              <p style="color:#ede8dd;font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap;">${message}</p>
            </div>
            <p style="color:#4a4a4a;font-size:11px;margin-top:28px;font-family:monospace;letter-spacing:1px;">Reply directly to this email to respond to ${name}.</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ fallback: true }, { status: 200 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ fallback: true }, { status: 200 })
  }
}
