import VaultClient from './VaultClient'
import fs from 'fs'
import path from 'path'

export default function VaultPage() {
  let images: {id:string;src:string;alt:string;category:string;width:number;height:number}[] = []

  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir)
      const webpFiles = files.filter((f: string) => f.toLowerCase().endsWith('.webp'))

      images = webpFiles.map((filename: string) => {
        let width = 800
        let height = 800

        try {
          const buffer = fs.readFileSync(path.join(galleryDir, filename))
          // eslint-disable-next-line @typescript-eslint/no-var-requires
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
        if (name.startsWith('logo'))    category = 'Branding'
        if (name.startsWith('web'))     category = 'Web'
        if (name.startsWith('print'))   category = 'Print'
        if (name.startsWith('pack'))    category = 'Packaging'

        const alt = filename.replace('.webp','').replace(/-/g,' ').replace(/_/g,' ').trim()
        return { id: filename, src: `/images/gallery/${filename}`, alt, category, width, height }
      })
    }
  } catch {}

  return <VaultClient images={images} />
}
