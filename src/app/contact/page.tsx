import VaultClient from './VaultClient'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

function getGalleryImages() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
    if (!fs.existsSync(galleryDir)) return []

    const files = fs.readdirSync(galleryDir)
    const webpFiles = files.filter(f => f.toLowerCase().endsWith('.webp'))

    return webpFiles.map(filename => {
      const filePath = path.join(galleryDir, filename)
      let width = 800
      let height = 800

      try {
        // Read file as buffer then get dimensions
        const buffer = fs.readFileSync(filePath)
        const sizeOf = require('image-size')
        const dims = sizeOf(buffer)
        width  = dims.width  || 800
        height = dims.height || 800
      } catch {}

      const name = filename.toLowerCase()
      let category = 'Other'
      if (name.startsWith('social'))  category = 'Social'
      if (name.startsWith('photo'))   category = 'Photography'
      if (name.startsWith('illus'))   category = 'Illustration'
      if (name.startsWith('doodle'))  category = 'Doodle'
      if (name.startsWith('paint'))   category = 'Painting'
      if (name.startsWith('craft'))   category = 'Craft'
      if (name.startsWith('ai'))      category = 'AI Visual'
      if (name.startsWith('motion'))  category = 'Motion'
      if (name.startsWith('brand'))   category = 'Branding'
      if (name.startsWith('web'))     category = 'Web'
      if (name.startsWith('print'))   category = 'Print'
      if (name.startsWith('logo'))    category = 'Branding'
      if (name.startsWith('pack'))    category = 'Packaging'

      const alt = filename
        .replace('.webp', '')
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .trim()

      return { id: filename, src: `/images/gallery/${filename}`, alt, category, width, height }
    })
  } catch (err) {
    console.error('Gallery read error:', err)
    return []
  }
}

export default function VaultPage() {
  const images = getGalleryImages()
  return <VaultClient images={images} />
}