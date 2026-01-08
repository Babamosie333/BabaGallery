# 🚀 BabaGallery - Professional Photo Gallery & Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

**A complete portfolio solution with photo gallery, project showcase, and blog management** - all built with Next.js 15, featuring dark techy design, localStorage persistence, and full CRUD operations.

🌐 **[Live Demo](https://baba-gallery.vercel.app/)** | 👨‍💻 **Made by [Babamosie333](https://github.com/babamosie333)**

---

## ✨ Features

### 📸 **Photo Gallery**
- Upload photos from device (file picker)
- Custom names & descriptions for each photo
- Category filters (Tech, Abstract, Portraits)
- Fullscreen lightbox with navigation
- Edit/delete any photo
- localStorage persistence (survives refresh!)

### 💼 **Projects Showcase**
- Add project screenshots
- Custom titles & descriptions
- Tech stack tags
- Hover effects with details
- Fullscreen preview modal
- Complete CRUD operations

### 📝 **Blog Management**
- Create new posts (title + excerpt)
- Edit existing posts inline
- Delete posts with one click
- Auto-dated entries
- Clean, readable layout

### 🎨 **Design & UX**
- Dark gradient theme (black/blue/cyan)
- Smooth animations & transitions
- Responsive (mobile, tablet, desktop)
- Persistent navbar across pages
- Professional techy aesthetic
- No login required

---

## 🛠 Tech Stack

```
Framework:     Next.js 15 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS
Icons:         Lucide React
Storage:       Browser localStorage
Image Opt:     Next.js Image component
Deployment:    Vercel
```

---

## 🚀 Quick Start

### 1. **Clone & Install**
```bash
git clone https://github.com/babamosie333/babagallery.git
cd babagallery
npm install
```

### 2. **Configure Images**
Update `next.config.mjs`:
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '**', pathname: '/**' }, // Allow any image host
    ],
  },
};
export default nextConfig;
```

### 3. **Add Default Images** (Optional)
Edit `src/lib/images.ts` to customize initial gallery:
```ts
export const images = [
  { id: 1, src: 'YOUR_IMAGE_URL', name: 'Photo 1', description: '...', category: 'tech', width: 800, height: 600 },
  // Add more...
];
```

### 4. **Run Development**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
babagallery/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (hero + slideshow)
│   │   ├── layout.tsx            # Navbar + global layout
│   │   ├── gallery/
│   │   │   └── page.tsx          # Photo gallery with upload
│   │   ├── projects/
│   │   │   └── page.tsx          # Project showcase
│   │   └── blog/
│   │       └── page.tsx          # Blog posts manager
│   └── lib/
│       └── images.ts             # Default gallery images
├── next.config.mjs               # Image domains config
├── tailwind.config.ts            # Custom dark theme
└── package.json
```

---

## 🎯 Key Features Breakdown

| Feature | Gallery | Projects | Blog |
|---------|---------|----------|------|
| **Add** | ✅ Device upload | ✅ Screenshot upload | ✅ Create post |
| **Edit** | ✅ Name + description | ✅ Title + description | ✅ Title + excerpt |
| **Delete** | ✅ Remove photo | ✅ Remove project | ✅ Delete post |
| **Filter** | ✅ By category | ❌ | ❌ |
| **Lightbox** | ✅ Fullscreen modal | ✅ Fullscreen modal | ❌ |
| **Persist** | ✅ localStorage | ✅ localStorage | ✅ localStorage |

---

## 🌐 Deploy to Vercel (60 seconds)

```bash
npm run build          # Test production build
git add .
git commit -m "Ready for deployment"
git push origin main

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**OR** connect GitHub repo to [Vercel Dashboard](https://vercel.com) for auto-deploys!

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.ts` and replace cyan/blue classes in components.

### Add More Categories
Update `categories` array in `src/app/gallery/page.tsx`:
```ts
const categories = ['all', 'tech', 'abstract', 'portraits', 'nature', 'architecture'];
```

### Modify Landing Slideshow
Replace image URLs in `src/app/page.tsx` slides array.

---

## 📸 Screenshots

**Landing Page**  
Dark hero with background slideshow + CTA buttons

**Photo Gallery**  
Masonry grid + category filters + upload button

**Projects**  
Screenshot cards with hover details + tech tags

**Blog**  
Clean post list with inline editing

---

## 🐛 Troubleshooting

### Images not loading?
- Add hostname to `next.config.mjs` `remotePatterns`
- Use direct image URLs (not Google Images)
- Try Imgur: [imgur.com/upload](https://imgur.com/upload)

### Data lost on refresh?
- Check browser console for localStorage errors
- Verify `useEffect` loads localStorage before setting state

### Build errors?
```bash
rm -rf .next/
rm -rf node_modules/
npm install
npm run build
```

---

## 👨‍💻 Made by Babamosie

**BCA Student | Full-Stack Developer**  
📧 vikramsingh14052006@gmail.com  
🎥 [YouTube](https://youtube.com/@DevBabaMosie)  
🐙 [GitHub](https://github.com/babamosie333)

⭐ **Star this repo** if it helped your portfolio!  
📚 Perfect for BCA semester projects & real-world practice.

---

## 📄 License

MIT License - Free to use for personal & educational projects!

---

**Built with ❤️ in Kanpur, India** 🇮🇳
```

***

## 2️⃣ **Add Footer to Layout** (optional credit)

Update `src/app/layout.tsx` - add before `</body>`:

```tsx
<footer className="border-t border-white/5 bg-black py-6 text-center text-sm text-gray-500">
  <p>
    Made with 💙 by{' '}
    <a href="https://github.com/babamosie333" target="_blank" className="text-cyan-400 hover:underline">
      Babamosie333
    </a>{' '}
    • BCA Student • {new Date().getFullYear()}
  </p>
</footer>
```
**Vercel auto-detects Next.js!**  **LIVE IN 60 SECONDS!** 🎉
