import VaultClient from './VaultClient'
import fs from 'fs'
import path from 'path'

type GalleryImage = { id:string; src:string; alt:string; category:string; width:number; height:number }

function getCat(filename: string): string {
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
  return 'Other'
}

function getWebpDims(filepath: string): { width:number; height:number } {
  try {
    const buf = fs.readFileSync(filepath)
    if (buf.toString('ascii',0,4) !== 'RIFF') return {width:1080,height:1080}
    if (buf.toString('ascii',8,12) !== 'WEBP') return {width:1080,height:1080}
    const chunk = buf.toString('ascii',12,16)
    if (chunk === 'VP8 ') {
      const w = buf.readUInt16LE(26) & 0x3fff
      const h = buf.readUInt16LE(28) & 0x3fff
      if (w > 0 && h > 0) return {width:w,height:h}
    } else if (chunk === 'VP8L') {
      const b0=buf[21],b1=buf[22],b2=buf[23],b3=buf[24]
      const w = ((b0|(b1<<8))&0x3fff)+1
      const h = (((b1>>6)|(b2<<2)|(b3<<10))&0x3fff)+1
      if (w > 0 && h > 0) return {width:w,height:h}
    } else if (chunk === 'VP8X') {
      const w = buf.readUIntLE(24,3)+1
      const h = buf.readUIntLE(27,3)+1
      if (w > 0 && h > 0) return {width:w,height:h}
    }
    return {width:1080,height:1080}
  } catch { return {width:1080,height:1080} }
}

function getGalleryImages(): GalleryImage[] {
  try {
    const dir = path.join(process.cwd(),'public','images','gallery')
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter(f => f.toLowerCase().endsWith('.webp'))
      .map(filename => {
        const dims = getWebpDims(path.join(dir,filename))
        const alt  = filename.replace(/\.webp$/i,'').replace(/[-_]/g,' ').trim()
        return { id:filename, src:`/images/gallery/${filename}`, alt:alt||filename, category:getCat(filename), width:dims.width, height:dims.height }
      })
  } catch { return [] }
}

export default function VaultPage() {
  const images = getGalleryImages()
  return <VaultClient images={images} />
}
