import VaultClient from './VaultClient'
import fs from 'fs'
import path from 'path'

type GalleryImage = {
  id:       string
  src:      string
  alt:      string
  category: string
  width:    number
  height:   number
}

function getCategoryFromFilename(filename: string): string {
  const n = filename.toLowerCase()
  if (n.startsWith('social'))  return 'Social'
  if (n.startsWith('photo'))   return 'Photography'
  if (n.startsWith('illus'))   return 'Illustration'
  if (n.startsWith('doodle'))  return 'Doodle'
  if (n.startsWith('paint'))   return 'Painting'
  if (n.startsWith('craft'))   return 'Craft'
  if (n.startsWith('ai'))      return 'AI Visual'
  if (n.startsWith('motion'))  return 'Motion'
  if (n.startsWith('brand'))   return 'Branding'
  if (n.startsWith('logo'))    return 'Branding'
  if (n.startsWith('web'))     return 'Web'
  if (n.startsWith('print'))   return 'Print'
  if (n.startsWith('pack'))    return 'Packaging'
  if (n.startsWith('ui'))      return 'UI/UX'
  if (n.startsWith('video'))   return 'Motion'
  return 'Other'
}

function getGalleryImages(): GalleryImage[] {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
    if (!fs.existsSync(galleryDir)) return []

    const files = fs.readdirSync(galleryDir)

    return files
      .filter(f => f.toLowerCase().endsWith('.webp'))
      .map(filename => {
        const alt = filename
          .replace(/\.webp$/i, '')
          .replace(/[-_]/g, ' ')
          .trim()

        return {
          id:       filename,
          src:      `/images/gallery/${filename}`,
          alt:      alt || filename,
          category: getCategoryFromFilename(filename),
          width:    1080,
          height:   1080,
        }
      })
  } catch {
    return []
  }
}

export default function VaultPage() {
  const images = getGalleryImages()
  return <VaultClient images={images} />
}
