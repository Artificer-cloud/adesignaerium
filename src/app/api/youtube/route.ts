import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function parseDuration(iso: string): string {
  if (!iso) return ''
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = parseInt(m[1] || '0')
  const min = parseInt(m[2] || '0')
  const s = parseInt(m[3] || '0')
  if (h > 0) return `${h}:${String(min).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  return `${min}:${String(s).padStart(2,'0')}`
}

function detectShort(iso: string, title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase()
  if (text.includes('#short') || text.includes('shorts')) return true
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return false
  const secs = parseInt(m[1]||'0')*3600 + parseInt(m[2]||'0')*60 + parseInt(m[3]||'0')
  return secs > 0 && secs <= 90
}

export async function GET() {
  const API_KEY    = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCUao1zhJVyqloGWXR_Px3Vw'

  if (!API_KEY) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY not set', videos: [] })
  }

  try {
    // ── 1. Get channel info + uploads playlist ID ────────────────────────────
    const chRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails,snippet&id=${CHANNEL_ID}&key=${API_KEY}`
    )
    const chData = await chRes.json()

    if (chData.error) {
      return NextResponse.json({ error: chData.error.message, videos: [] })
    }
    if (!chData.items?.length) {
      return NextResponse.json({ error: 'Channel not found', videos: [] })
    }

    const channel      = chData.items[0]
    const uploadsId    = channel.contentDetails.relatedPlaylists.uploads
    const channelTitle = channel.snippet.title
    const channelThumb = channel.snippet.thumbnails?.default?.url

    // ── 2. Fetch uploads playlist ────────────────────────────────────────────
    const plRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&key=${API_KEY}`
    )
    const plData = await plRes.json()

    if (!plData.items?.length) {
      return NextResponse.json({ videos: [], channelTitle, channelThumb })
    }

    // ── 3. Batch fetch durations ─────────────────────────────────────────────
    const ids    = plData.items.map((i: any) => i.snippet.resourceId.videoId).filter(Boolean).join(',')
    const vidRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids}&key=${API_KEY}`
    )
    const vidData = await vidRes.json()

    const detailMap: Record<string, any> = {}
    vidData.items?.forEach((v: any) => { detailMap[v.id] = v })

    // ── 4. Build video list ──────────────────────────────────────────────────
    const videos = plData.items
      .filter((item: any) => item.snippet?.resourceId?.videoId)
      .map((item: any) => {
        const id      = item.snippet.resourceId.videoId
        const snippet = item.snippet
        const details = detailMap[id]
        const iso     = details?.contentDetails?.duration || ''
        const thumb   =
          snippet.thumbnails?.maxres?.url  ||
          snippet.thumbnails?.high?.url    ||
          snippet.thumbnails?.medium?.url  ||
          `https://img.youtube.com/vi/${id}/hqdefault.jpg`

        return {
          id,
          title:       snippet.title,
          description: (snippet.description || '').split('\n')[0],
          thumbnail:   thumb,
          publishedAt: snippet.publishedAt,
          duration:    parseDuration(iso),
          views:       details?.statistics?.viewCount || '0',
          isShort:     detectShort(iso, snippet.title, snippet.description || ''),
        }
      })

    return NextResponse.json({ videos, channelTitle, channelThumb })

  } catch (err) {
    return NextResponse.json({ error: String(err), videos: [] })
  }
}
