// ─────────────────────────────────────────────────────────────────────────────
//  VIDEOS DATA
//  Replace each `id` value with your real YouTube video ID.
//  Thumbnail loads automatically: https://img.youtube.com/vi/YOUR_ID/maxresdefault.jpg
//  SHOWREEL_ID  →  the main reel that autoplays on the homepage
// ─────────────────────────────────────────────────────────────────────────────

export type VideoCategory = 'All' | 'AI Generated' | 'Product' | 'Social Content' | 'Brand Film'

export type Video = {
  id:          string                        // YouTube video ID
  title:       string
  description: string
  category:    Exclude<VideoCategory, 'All'>
  project?:    string                        // case study project ID (for embed + link)
  client?:     string
  year:        string
  duration?:   string                        // display only e.g. "0:45"
  featured?:   boolean                       // shown in homepage showreel section
}

// ── Main showreel: autoplays muted on homepage ────────────────────────────────
export const SHOWREEL_ID = 'REPLACE_SHOWREEL_ID'

// ── All videos ────────────────────────────────────────────────────────────────
export const videos: Video[] = [
  {
    id:          'REPLACE_ID_01',
    title:       'SIPPLE — Electric Shaker Campaign',
    description: 'AI-generated UGC reel for the Primexa, Mixpro & Mixera smart shakers. Veo 3 + ElevenLabs + CapCut.',
    category:    'Product',
    project:     'sipple',
    client:      'Sipple / Krossover Gifts',
    year:        '2025',
    duration:    '0:45',
    featured:    true,
  },
  {
    id:          'REPLACE_ID_02',
    title:       'Maison Valér — Desk to Destinations',
    description: 'Cinematic brand commercial for the premium leather gifting collection. Seedance + CapCut + ElevenLabs.',
    category:    'Brand Film',
    project:     'maison-valer',
    client:      'Maison Valér',
    year:        '2025',
    duration:    '1:20',
    featured:    true,
  },
  {
    id:          'REPLACE_ID_03',
    title:       'AI Characters — Pixar-Style Mascots',
    description: 'Midjourney v6.1 character design pipeline — The Strategist, Minimalist, Explorer & Identifier.',
    category:    'AI Generated',
    project:     'ai-visuals',
    year:        '2025',
    duration:    '0:30',
    featured:    true,
  },
  {
    id:          'REPLACE_ID_04',
    title:       'Krossover Gifts — Festive Campaign',
    description: 'Social media product video for UAE corporate gifting season. Motion + stop-motion blend.',
    category:    'Social Content',
    project:     'krossover',
    client:      'Krossover Gifts',
    year:        '2024',
    duration:    '0:30',
  },
  {
    id:          'REPLACE_ID_05',
    title:       'Ecora — Sustainable Gifting Reel',
    description: 'Brand story reel for the eco-gifting launch. Midjourney stills + After Effects motion.',
    category:    'Brand Film',
    project:     'ecora',
    client:      'Ecora',
    year:        '2024',
    duration:    '0:55',
  },
  {
    id:          'REPLACE_ID_06',
    title:       'AI Product Photography — Behind the Prompt',
    description: 'Showcase of the 30-prompt AI image library for e-commerce. Midjourney + Flux + Ideogram.',
    category:    'AI Generated',
    project:     'ai-visuals',
    year:        '2025',
    duration:    '1:05',
    featured:    true,
  },
  {
    id:          'REPLACE_ID_07',
    title:       'Shanghai Gifts — Product Showcase',
    description: 'Premium gifting product video with lifestyle photography and motion graphics.',
    category:    'Product',
    project:     'shanghai-gifts',
    client:      'Shanghai Gifts',
    year:        '2024',
    duration:    '0:40',
  },
  {
    id:          'REPLACE_ID_08',
    title:       'Social Reels Compilation — UAE Brands',
    description: 'Best-of social content: Instagram reels, product reveals, stop-motion, brand animations.',
    category:    'Social Content',
    project:     'social-motion',
    year:        '2024–2025',
    duration:    '2:00',
  },
  {
    id:          'REPLACE_ID_09',
    title:       'Zara — AI Brand Character Animation',
    description: 'Midjourney face-lock (--cref --cw 100) + Kling 2.5 start/end frame animation pipeline.',
    category:    'AI Generated',
    year:        '2025',
    duration:    '0:20',
    featured:    true,
  },
  {
    id:          'REPLACE_ID_10',
    title:       'Portable Fan — UGC Product Reel',
    description: 'Hook scene + lifestyle reel for promotional fan product. Veo 3 + CapCut.',
    category:    'Product',
    project:     'krossover',
    client:      'Krossover Gifts',
    year:        '2025',
    duration:    '0:35',
  },
]

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'All', 'AI Generated', 'Product', 'Social Content', 'Brand Film',
]

// Project ID → YouTube video ID (used for case study embeds)
export const PROJECT_VIDEO_MAP: Record<string, string> = {
  'sipple':        'REPLACE_ID_01',
  'maison-valer':  'REPLACE_ID_02',
  'ai-visuals':    'REPLACE_ID_03',
  'krossover':     'REPLACE_ID_04',
  'ecora':         'REPLACE_ID_05',
  'shanghai-gifts':'REPLACE_ID_07',
  'social-motion': 'REPLACE_ID_08',
}
