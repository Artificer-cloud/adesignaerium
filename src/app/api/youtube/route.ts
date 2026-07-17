import { NextResponse } from 'next/server'

// Cache response for 1 hour — revalidates automatically
// This means YouTube API is called max once per hour, well within free quota
export const revalidate = 3600

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

function inferCategory(title: string, desc: string): string {
  const text = `${title} ${desc}`.toLowerCase()
  if (text.match(/\bai\b|midjourney|veo|sora|generated|character|animation|prompt/)) return 'AI Generated'
  if (text.match(/brand film|commercial|cinematic|campaign|story|launch/))           return 'Brand Film'
  if (text.match(/social|reel|instagram|tiktok|content|compilation/))                return 'Social Content'
  return 'Product' // default
}

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const HANDLE  = (process.env.YOUTUBE_CHANNEL_HANDLE || 'adesignaerium').replace('@','')

  if (!API_KEY) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY not set', videos: [] }, { status: 200 })
  }

  try {
    // ── Step 1: Resolve channel handle → channel ID + uploads playlist ──────
    const chRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails,snippet&forHandle=${HANDLE}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const chData = await chRes.json()

    if (!chData.items?.length) {
      return NextResponse.json({ error: 'Channel not found', videos: [] }, { status: 200 })
    }

    const channel        = chData.items[0]
    const uploadsId      = channel.contentDetails.relatedPlaylists.uploads
    const channelTitle   = channel.snippet.title
    const channelThumb   = channel.snippet.thumbnails?.default?.url

    // ── Step 2: Fetch latest 50 videos from uploads playlist ─────────────────
    const plRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const plData = await plRes.json()

    if (!plData.items?.length) {
      return NextResponse.json({ videos: [], channelTitle, channelThumb }, { status: 200 })
    }

    // ── Step 3: Fetch video durations in one batched call ────────────────────
    const ids     = plData.items.map((i: any) => i.snippet.resourceId.videoId).join(',')
    const vidRes  = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const vidData = await vidRes.json()

    const detailMap: Record<string, any> = {}
    vidData.items?.forEach((v: any) => { detailMap[v.id] = v })

    // ── Step 4: Build video objects ──────────────────────────────────────────
    const videos = plData.items
      .filter((item: any) => item.snippet.resourceId.videoId) // skip deleted
      .map((item: any) => {
        const id      = item.snippet.resourceId.videoId
        const snippet = item.snippet
        const details = detailMap[id]
        const thumb   =
          snippet.thumbnails?.maxres?.url  ||
          snippet.thumbnails?.high?.url    ||
          snippet.thumbnails?.medium?.url  ||
          `https://img.youtube.com/vi/${id}/hqdefault.jpg`

        return {
          id,
          title:       snippet.title,
          description: snippet.description?.split('\n')[0] || '', // first line only
          thumbnail:   thumb,
          publishedAt: snippet.publishedAt,
          category:    inferCategory(snippet.title, snippet.description || ''),
          duration:    parseDuration(details?.contentDetails?.duration || ''),
          views:       details?.statistics?.viewCount || '0',
        }
      })

    return NextResponse.json({ videos, channelTitle, channelThumb }, { status: 200 })

  } catch (err) {
    console.error('YouTube API error:', err)
    return NextResponse.json({ error: 'Failed to fetch videos', videos: [] }, { status: 200 })
  }
}
