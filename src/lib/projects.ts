export type Project = {
  id: string
  title: string
  category: string[]
  tags: string[]
  description: string
  longDescription: string
  year: string
  client: string
  url?: string
  color: string
  role: string[]
}

export const projects: Project[] = [
  {
    id: 'krossover',
    title: 'Krossover Gifts',
    category: ['UI/UX', 'Branding', 'E-commerce'],
    tags: ['E-commerce', 'UI/UX', 'Product Photography', 'Social Media'],
    description: 'Full creative direction for a corporate gifting e-commerce brand — from packaging to digital campaigns to UX.',
    longDescription: `Krossover Gifts needed a complete creative ecosystem. From zero, I built their visual identity, designed their e-commerce website UI/UX (kross-over.net), created product photography, social media reels, and print-ready B2B catalogues. Managing 50+ concurrent projects with 100% on-time delivery while maintaining brand coherence across every touchpoint.`,
    year: '2023–Present',
    client: 'Krossover Gifts Trading LLC',
    url: 'https://www.kross-over.net',
    color: '#1a1a1a',
    role: ['Creative Director', 'UI/UX Designer', 'Social Media Manager', 'Product Photographer'],
  },
  {
    id: 'shanghai-gifts',
    title: 'Shanghai Gifts',
    category: ['UI/UX', 'E-commerce', 'Branding'],
    tags: ['E-commerce', 'UI/UX', 'Branding'],
    description: 'E-commerce platform design and brand identity for a premium gifting brand.',
    longDescription: `Designed and managed the complete digital presence for Shanghai Gifts — a premium gifting e-commerce platform. Responsible for UI/UX design, product listing management, visual content creation, and brand consistency across all digital touchpoints.`,
    year: '2023–Present',
    client: 'Krossover Gifts Trading LLC',
    url: 'https://www.shanghaigifts.net',
    color: '#1a1a1a',
    role: ['UI/UX Designer', 'Brand Designer'],
  },
  {
    id: 'ecora',
    title: 'Ecora',
    category: ['Branding', 'UI/UX', 'Web Design'],
    tags: ['Brand Identity', 'Web Design', 'Sustainability', 'UI/UX'],
    description: 'Designed by nature, refined by purpose — a restrained eco-gifting brand with editorial minimalism.',
    longDescription: `Ecora is an eco-conscious gifting brand that demanded restraint, responsibility, and clarity. I developed the full brand identity — from naming logic to visual language — and designed a multi-page Next.js website with a nature-meets-modernist aesthetic. Every design decision maps to ECORA's three pillars: responsible sourcing, thoughtful design, and responsible production.`,
    year: '2024',
    client: 'Internal / Krossover Brand Portfolio',
    url: 'https://ecora-theta.vercel.app',
    color: '#0f2518',
    role: ['Brand Designer', 'Web Designer', 'Frontend Developer'],
  },
  {
    id: 'maison-valer',
    title: 'Maison Valér',
    category: ['Branding', 'UI/UX', 'Luxury'],
    tags: ['Luxury Brand', 'Leather Goods', 'UI/UX', 'Editorial'],
    description: 'A fashion-led corporate gifting brand — premium leather lifestyle essentials, styled with intention.',
    longDescription: `Maison Valér required the language of a luxury fashion house applied to corporate gifting. I created a refined brand identity with a fashion editorial aesthetic — sharp typography, curated colour palette (Heritage Brown, Stone Gray, Midnight Black), and a website that feels closer to a luxury lookbook than a product catalogue. Every detail communicates restraint, quality, and executive appeal.`,
    year: '2024',
    client: 'Internal / Krossover Brand Portfolio',
    url: 'https://maison-valer.vercel.app',
    color: '#1a1208',
    role: ['Brand Designer', 'Art Director', 'Web Designer'],
  },
  {
    id: 'sipple',
    title: 'SIPPLE',
    category: ['Branding', 'UI/UX', 'Product Design'],
    tags: ['Product Brand', 'Smart Drinkware', 'UI/UX', 'Motion'],
    description: 'Hydration made smarter — a tech-forward smart drinkware brand with MagSafe innovation at its core.',
    longDescription: `SIPPLE is where utility acquires elegance. I built the complete brand universe for this smart drinkware company — identity, product photography direction, and a multi-page website that communicates technical innovation without losing warmth. The design system supports 4 products across desk, gym, travel and home use cases, with a gallery, product pages, and custom branding configurator.`,
    year: '2024–2025',
    client: 'Internal / Krossover Brand Portfolio',
    url: 'https://sipple-eta.vercel.app',
    color: '#0a1520',
    role: ['Brand Designer', 'Art Director', 'UI/UX Designer', 'Frontend Developer'],
  },
  {
    id: 'ai-visuals',
    title: 'AI Visual Design',
    category: ['AI Design', 'Art Direction'],
    tags: ['Midjourney', 'Sora', 'OpenAI', 'Higgsfield', 'Prompt Engineering'],
    description: 'AI-accelerated creative production — Midjourney, Sora, Higgsfield, and Nano Banana Pro for lifestyle imagery and campaign visuals.',
    longDescription: `Using Midjourney, Sora, Higgsfield, OpenAI, Gemini, and Nano Banana Pro, I've built scalable AI-powered creative pipelines that reduce production time while elevating visual quality. Work includes lifestyle photography replacement, campaign visual generation, product mockups, AI-generated reels, and prompt-engineered brand imagery for B2B e-commerce clients.`,
    year: '2023–Present',
    client: 'Multiple Clients',
    color: '#0e0a1a',
    role: ['AI Art Director', 'Prompt Engineer', 'Visual Designer'],
  },
  {
    id: 'corporate-gifting-packaging',
    title: 'Packaging & Print',
    category: ['Branding', 'Packaging', 'Print'],
    tags: ['Packaging Design', 'Print', 'Editorial', 'B2B'],
    description: 'Premium packaging design and print-ready editorial catalogues for 100+ corporate B2B clients.',
    longDescription: `From unboxing experience to print-ready PDF catalogues, I've designed premium packaging systems for over 100 B2B corporate clients across Dubai. Work includes gift box design, product labelling, brand-application guidelines, and editorial catalogues that bridge digital and print. Each piece is designed to elevate the perceived value of the gifting experience.`,
    year: '2023–Present',
    client: 'Krossover Gifts & B2B Clients',
    color: '#141010',
    role: ['Packaging Designer', 'Print Designer', 'Art Director'],
  },
  {
    id: 'social-motion',
    title: 'Social & Motion',
    category: ['Motion', 'Social Media', 'Video'],
    tags: ['Reels', 'After Effects', 'Video', 'Social Media'],
    description: 'High-performing reels, product videos, and social media content that drives engagement at scale.',
    longDescription: `Created high-converting social media content — reels, product videos, lifestyle imagery, and branded posts — for multiple e-commerce and corporate brands. Work spans Instagram, LinkedIn, and WhatsApp marketing. Tools include After Effects, Premiere Pro, Adobe Lightroom, and AI video tools including Sora and Higgsfield for AI-generated motion sequences.`,
    year: '2023–Present',
    client: 'Multiple Clients',
    color: '#0e0e0e',
    role: ['Motion Designer', 'Content Creator', 'Video Editor'],
  },
  {
    id: 'education-design',
    title: 'Design Education',
    category: ['Education', 'UI/UX', 'Branding'],
    tags: ['Teaching', 'Curriculum', 'Mentorship', 'KELTRON'],
    description: 'Trained 100+ designers at KELTRON Advanced Studies — 90% student placement rate in design roles.',
    longDescription: `As Design Faculty at KELTRON Advanced Studies, Trivandrum, I developed and delivered curriculum covering UI/UX principles, visual identity, digital illustration, typography, and Adobe Creative Suite. Mentored students on live client projects and organised industry workshops. 90% of graduates placed in professional design roles.`,
    year: '2019–2020',
    client: 'KELTRON Advanced Studies',
    color: '#0a0a14',
    role: ['Design Educator', 'Curriculum Developer', 'Mentor'],
  },
]

export const categories = ['All', 'Branding', 'UI/UX', 'E-commerce', 'AI Design', 'Motion', 'Packaging', 'Education']
