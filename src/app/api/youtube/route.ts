import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

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

function getTotalSeconds(iso: string): number {
  if (!iso) return 0
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  return parseInt(m[1]||'0')*3600 + parseInt(m[2]||'0')*60 + parseInt(m[3]||'0')
}

function detectShort(iso: string, title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase()
  if (text.includes('#short') || text.includes('shorts')) return true
  const secs = getTotalSeconds(iso)
  return secs > 0 && secs <= 90
}


export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const HANDLE  = (process.env.YOUTUBE_CHANNEL_HANDLE || 'adesignaerium').replace('@','')

  if (!API_KEY) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY not configured', videos:[] }, { status:200 })
  }

  try {
    // ── 1. Resolve handle → channel + uploads playlist ───────────────────────
    const chRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails,snippet&forHandle=${HANDLE}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const chData = await chRes.json()

    if (chData.error) {
      console.error('YouTube channel error:', chData.error)
      return NextResponse.json({ error: chData.error.message, videos:[] }, { status:200 })
    }

    if (!chData.items?.length) {
      return NextResponse.json({ error:'Channel not found', videos:[] }, { status:200 })
    }

    const channel      = chData.items[0]
    const uploadsId    = channel.contentDetails.relatedPlaylists.uploads
    const channelTitle = channel.snippet.title
    const channelThumb = channel.snippet.thumbnails?.default?.url

    // ── 2. Fetch latest 50 uploads ───────────────────────────────────────────
    const plRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const plData = await plRes.json()

    if (plData.error) {
      console.error('YouTube playlist error:', plData.error)
      return NextResponse.json({ error: plData.error.message, videos:[] }, { status:200 })
    }

    if (!plData.items?.length) {
      return NextResponse.json({ videos:[], channelTitle, channelThumb }, { status:200 })
    }

    // ── 3. Batch fetch durations ─────────────────────────────────────────────
    const ids     = plData.items.map((i: any) => i.snippet.resourceId.videoId).filter(Boolean).join(',')
    const vidRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
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

        const isShort = detectShort(iso, snippet.title, snippet.description || '')

        return {
          id,
          title:       snippet.title,
          description: (snippet.description || '').split('\n')[0],
          thumbnail:   thumb,
          publishedAt: snippet.publishedAt,
          duration:    parseDuration(iso),
          views:       details?.statistics?.viewCount || '0',
          isShort,
        }
      })

    return NextResponse.json({ videos, channelTitle, channelThumb }, { status:200 })

  } catch (err) {
    console.error('YouTube API exception:', err)
    return NextResponse.json({ error: String(err), videos:[] }, { status:200 })
  }
}
