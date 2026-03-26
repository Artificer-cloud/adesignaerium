# ADesignAerium — Abhijeeth Subhash Portfolio

> Senior Creative Designer portfolio — built with Next.js 14, Tailwind CSS, deployed on Vercel.

**Live:** [adesignaerium.com](https://adesignaerium.com)

---

## 🚀 Quick Start (VS Code)

```bash
# 1. Open this folder in VS Code
# 2. Open terminal (Ctrl + `)

# Install dependencies
npm install

# Run locally
npm run dev
# → Open http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          ← Homepage (hero, work preview, skills, CTA)
│   ├── work/
│   │   ├── page.tsx      ← All work grid with category filter
│   │   └── [slug]/
│   │       └── page.tsx  ← Individual case study pages
│   ├── about/
│   │   └── page.tsx      ← About page with timeline
│   ├── contact/
│   │   └── page.tsx      ← Contact page with form
│   ├── globals.css       ← Global styles, custom cursor, grain texture
│   └── layout.tsx        ← Root layout with metadata
├── components/
│   ├── Cursor.tsx        ← Custom cursor with ink trail effect
│   └── Navbar.tsx        ← Sticky navbar with mobile menu
└── lib/
    └── projects.ts       ← ALL project data — edit this file to update work
```

---

## ✏️ How to Edit Content

### Add / Edit Projects
Open `src/lib/projects.ts` — this is your CMS. Each project has:
- `id` — URL slug (e.g. `sipple` → `/work/sipple`)
- `title`, `description`, `longDescription` — what's displayed
- `category` — used for filters on Work page
- `url` — live site link
- `color` — card background hex (dark recommended)
- `year`, `client`, `role`, `tags`

### Add Project Images
In `src/app/work/[slug]/page.tsx`, replace the placeholder divs with:
```tsx
import Image from 'next/image'
<Image src="/images/sipple-1.jpg" alt="Sipple project" width={800} height={600} />
```
Put images in `/public/images/` folder.

### Update Personal Info
- **Contact details:** `src/app/contact/page.tsx`
- **About text:** `src/app/about/page.tsx`
- **Social links:** Used in `src/app/page.tsx` footer and `src/app/about/page.tsx`

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/adesignaerium.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

### Step 3: Connect Custom Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add: `adesignaerium.com` and `www.adesignaerium.com`
3. In your domain registrar (GoDaddy, Namecheap, etc.):
   - Add **A record**: `@` → `76.76.21.21`
   - Add **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait 10–60 minutes for DNS propagation ✓

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0e0e0e` | Page background |
| `--bone` | `#f5f0e8` | Primary text |
| `--orange` | `#ff4d00` | Accent, CTAs |
| `--muted` | `#b8a99a` | Secondary text |
| `--dim` | `#6b6b6b` | Tertiary/labels |
| `--surface` | `#1a1a1a` | Card backgrounds |
| `--border` | `#2a2a2a` | Borders |

**Fonts:**
- Display: `Barlow Condensed` (700/800/900 — all headings)
- Body: `Lora` (400/600 italic — descriptions, body)
- Mono: `JetBrains Mono` (labels, tags, metadata)

---

## 📸 Adding Real Project Screenshots

For each project in `/work/[slug]`, replace placeholder divs with actual screenshots:

```tsx
// In src/app/work/[slug]/page.tsx
// Find the "Add Project Images" section and replace with:

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Image
    src="/images/krossover-1.jpg"
    alt="Krossover website homepage"
    width={800}
    height={600}
    className="w-full rounded"
    style={{ border: '1px solid var(--border)' }}
  />
  <Image
    src="/images/krossover-2.jpg"
    alt="Krossover product catalogue"
    width={800}
    height={600}
    className="w-full rounded"
    style={{ border: '1px solid var(--border)' }}
  />
</div>
```

**Recommended image sizes:**
- Hero project images: 1600×900px
- Grid images: 800×600px
- Full-width: 1920×1080px

---

## 🔧 Customization Tips

**Change accent color** — find/replace `#ff4d00` in `globals.css` and `--orange` var.

**Add Google Analytics:**
```tsx
// In src/app/layout.tsx, add inside <head>:
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
```

**Add more pages** — create `src/app/photography/page.tsx` for a dedicated photo gallery page.

---

Built with ✦ by Abhijeeth Subhash
