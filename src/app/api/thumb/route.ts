import { NextRequest, NextResponse } from 'next/server'

// Proxy YouTube thumbnails through our own domain
// This prevents browser extensions from blocking img.youtube.com
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return new NextResponse('Missing id', { status: 400 })

  // Try thumbnails from highest to lowest quality
  const urls = [
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/default.jpg`,
  ]

  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const buffer = await res.arrayBuffer()
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=86400', // cache 24h
          },
        })
      }
    } catch {}
  }

  return new NextResponse('Thumbnail not found', { status: 404 })
}
