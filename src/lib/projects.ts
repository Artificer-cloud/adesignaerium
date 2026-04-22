export type Project = {
  id:              string
  title:           string
  description:     string
  longDescription: string
  category:        string[]
  color:           string
  year:            string
  client:          string
  role:            string[]
  tags:            string[]
  url?:            string
  coverImage?:     string
}

export const projects: Project[] = [
  {
    id:'krossover', title:'Krossover Gifts',
    description:'Full creative direction for a corporate gifting e-commerce brand — from packaging to digital campaigns to UX.',
    longDescription:`Krossover Gifts is a Dubai-based B2B corporate gifting company serving 100+ clients across the UAE. I led the complete creative direction — from brand identity and packaging design to e-commerce UI/UX and digital campaigns.\n\nEvery touchpoint — product photography, catalogue design, website UI, social content — was designed to work as a unified system.`,
    category:['UI/UX','Branding','E-Commerce'], color:'#060d18', year:'2023–Present',
    client:'Krossover Gifts Trading LLC', role:['Creative Director','UI/UX Designer','Brand Designer'],
    tags:['Branding','E-Commerce','UI/UX','Packaging','Photography'], url:'https://kross-over.net', coverImage:'/images/work/krossover-cover.webp',
  },
  {
    id:'shanghai-gifts', title:'Shanghai Gifts',
    description:'E-commerce platform design and brand identity for a premium gifting brand.',
    longDescription:`Shanghai Gifts is a sister brand under the same corporate umbrella as Krossover. I designed the complete e-commerce experience — product listings, category pages, checkout flow, and brand identity.\n\nThe brand needed to feel distinctly different from Krossover while sharing the same quality standard.`,
    category:['UI/UX','E-Commerce'], color:'#0d0d18', year:'2023–Present',
    client:'Shanghai Gifts', role:['UI/UX Designer','Brand Designer'],
    tags:['E-Commerce','UI/UX','Web Design'], url:'https://shanghaigifts.net', coverImage:'/images/work/shanghai-gifts-cover.webp',
  },
  {
    id:'ecora', title:'Ecora',
    description:'Designed by nature, refined by purpose — a restrained eco-gifting brand with editorial minimalism.',
    longDescription:`Ecora is a sustainable corporate gifting brand I built from scratch. The brief was to create something that felt genuinely eco-conscious — not greenwashed.\n\nI developed the full brand system: logo, color palette, typography, packaging design, and web presence.`,
    category:['Branding','UI/UX'], color:'#040f07', year:'2024',
    client:'Ecora', role:['Brand Designer','Web Designer','Developer'],
    tags:['Branding','Sustainability','Web Design','Next.js'], url:'https://ecora-theta.vercel.app', coverImage:'/images/work/ecora-cover.webp',
  },
  {
    id:'maison-valer', title:'Maison Valér',
    description:'A fashion-led corporate gifting brand — premium leather lifestyle essentials, styled with intention.',
    longDescription:`Maison Valér is a luxury corporate gifting brand I created from concept to launch. The brand targets high-end B2B clients who want premium leather goods as corporate gifts.\n\nI developed the complete brand universe — name, logo, visual identity, editorial photography direction, packaging, and web experience.`,
    category:['Branding','UI/UX'], color:'#100d04', year:'2024',
    client:'Maison Valér', role:['Brand Designer','Creative Director','Web Designer'],
    tags:['Luxury','Branding','Editorial','Web Design'], url:'https://maison-valer.vercel.app', coverImage:'/images/work/maison-valer-cover.webp',
  },
  {
    id:'sipple', title:'SIPPLE',
    description:'Hydration made smarter — a tech-forward smart drinkware brand with MagSafe innovation at its core.',
    longDescription:`SIPPLE is a smart drinkware brand I designed from scratch. The product concept centres on MagSafe-compatible hydration tracking with a companion app.\n\nI created the full brand identity, product UI, app interface design, and marketing website.`,
    category:['Branding','UI/UX'], color:'#060d18', year:'2024–2025',
    client:'SIPPLE', role:['Brand Designer','UI/UX Designer','Creative Director'],
    tags:['Product Design','Branding','App UI','Tech'], url:'https://sipple-eta.vercel.app', coverImage:'/images/work/sipple-cover.webp',
  },
  {
    id:'ai-visuals', title:'AI Visual Design',
    description:'AI-accelerated creative production — Midjourney, Sora, Higgsfield, and Nano Banana Pro for lifestyle imagery.',
    longDescription:`A collection of AI-driven visual production work spanning product campaigns, lifestyle imagery, and editorial visuals. I use Midjourney, Sora, Higgsfield, and Nano Banana Pro as creative accelerators.\n\nEvery image starts with a creative brief and ends with a polished, on-brand deliverable.`,
    category:['AI Design','Art Direction'], color:'#0a0618', year:'2023–Present',
    client:'Various', role:['AI Art Director','Creative Director'],
    tags:['Midjourney','Sora','Higgsfield','AI Design','Art Direction'], coverImage:'/images/work/ai-visuals-cover.webp',
  },
  {
    id:'corporate-gifting-packaging', title:'Packaging & Print',
    description:'Premium packaging design and print-ready editorial catalogues for 100+ corporate B2B clients.',
    longDescription:`Over 3+ years of packaging and print design for corporate gifting clients across the UAE. This includes gift box design, ribbon and tissue customisation, catalogue layouts, branded inserts, and large-format print.\n\nEvery project is designed to print-ready standards with full bleed, CMYK colour profiles, and supplier-ready files.`,
    category:['Branding','Packaging'], color:'#120808', year:'2023–Present',
    client:'Various B2B Clients', role:['Packaging Designer','Print Designer'],
    tags:['Packaging','Print','CMYK','Editorial','B2B'], coverImage:'/images/work/packaging-cover.webp',
  },
  {
    id:'social-motion', title:'Social & Motion',
    description:'High-performing reels, product videos, and social media content that drives engagement at scale.',
    longDescription:`Motion design and social media content production for corporate gifting brands and B2B clients. This includes Instagram reels, product reveal videos, stop-motion, and animated brand content.\n\nI direct, shoot, edit, and deliver — from concept to final export.`,
    category:['Motion','Social Media'], color:'#0a0a12', year:'2023–Present',
    client:'Various', role:['Motion Designer','Video Editor','Content Director'],
    tags:['Motion','Reels','Video','Social Media','After Effects'], coverImage:'/images/work/social-motion-cover.webp',
  },
  {
    id:'education-design', title:'Education Design',
    description:'Curriculum design, teaching materials, and UI/UX training for 100+ design students at KELTRON.',
    longDescription:`As a Graphic Design Faculty member at KELTRON Advanced Studies, I developed and delivered a comprehensive design curriculum covering UI/UX, branding, Adobe Creative Suite, and industry practice.\n\n90% of my students secured design roles within 3 months of graduation.`,
    category:['Education','UI/UX'], color:'#080a08', year:'2019–2020',
    client:'KELTRON Advanced Studies', role:['Design Faculty','Curriculum Designer'],
    tags:['Education','UI/UX','Branding','Teaching','KELTRON'], coverImage:'/images/work/education-cover.webp',
  },
]

export const categories = ['All','Branding','UI/UX','E-Commerce','AI Design','Packaging','Motion','Education']
