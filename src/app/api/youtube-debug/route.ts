import { NextResponse } from 'next/server'

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const HANDLE  = (process.env.YOUTUBE_CHANNEL_HANDLE || 'adesignaerium').replace('@','')

  const debug: Record<string, any> = {
    hasApiKey:    !!API_KEY,
    apiKeyPrefix: API_KEY ? API_KEY.substring(0, 10) + '...' : 'NOT SET',
    handle:       HANDLE,
  }

  if (!API_KEY) {
    return NextResponse.json({ ...debug, error: 'YOUTUBE_API_KEY env var not set' })
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${HANDLE}&key=${API_KEY}`
    debug.requestUrl = url.replace(API_KEY, 'HIDDEN')

    const res  = await fetch(url)
    const data = await res.json()

    debug.httpStatus  = res.status
    debug.rawResponse = data

    return NextResponse.json(debug)
  } catch (e) {
    return NextResponse.json({ ...debug, fetchError: String(e) })
  }
}
