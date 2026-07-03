# GradeAI — Marketing Website

Animated landing page for the **GradeAI** app. Standalone from the Flutter app.

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS — "Aurora Academia" dark theme
- **Animation:** Framer Motion + CSS keyframes
- **i18n:** next-intl with URL locale prefixes (`/en`, `/fr`, `/tr`, `/es`), default English
- **Icons:** lucide-react
- **Hosting:** **Railway** — Node.js server build (`output: 'standalone'`)

## Theme

| Token | Value |
|---|---|
| Background | `#0F172A` |
| Primary (indigo) | `#6366F1` |
| Secondary (teal) | `#14B8A6` |
| Accent (amber) | `#F59E0B` |

## Structure

```
app/
└─ [locale]/
   ├─ layout.tsx         # root <html>, metadata, NextIntlClientProvider
   └─ page.tsx           # landing page (composes sections)
components/
├─ Navbar.tsx            # logo, nav links, language switcher, mobile hamburger
├─ LanguageSwitcher.tsx  # EN/FR/TR/ES dropdown (locale-aware routing)
├─ Hero.tsx / HeroScene.tsx   # headline, CTA, downloads, QR + animated papers
├─ MagneticButton.tsx    # magnetic CTA w/ animated gradient border
├─ DownloadButtons.tsx   # App Store / Google Play / Windows
├─ Features.tsx          # 6 feature cards
├─ HowItWorks.tsx        # 4-step vertical timeline
├─ Languages.tsx         # 4 flag cards
├─ Download.tsx          # download CTA band
└─ Footer.tsx            # links, copyright, contact email
i18n/
├─ routing.ts            # locales + defaultLocale (defineRouting)
├─ navigation.ts         # locale-aware Link / useRouter / usePathname
├─ request.ts            # next-intl request config
└─ config.ts             # locale names + flags
messages/                # en.json fr.json tr.json es.json
middleware.ts            # locale routing (/  → /en)
next.config.js           # output: 'standalone'
railway.toml · Procfile · .env.example
```

## Local development

Requires **Node.js 18.17+** and npm.

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /en
```

Try `/en`, `/fr`, `/tr`, `/es`, or use the in-page language switcher.

## Production build

```bash
npm run build        # next build (standalone server output)
npm run start        # next start — serves on $PORT (default 3000)
```

## Deploy to Railway

This project runs as a **Node.js server** on Railway (not a static export).

1. **Push this repo to GitHub.**
   ```bash
   git init && git add . && git commit -m "GradeAI website"
   git branch -M main
   git remote add origin https://github.com/<you>/grade_ai_website.git
   git push -u origin main
   ```
2. **Create the project on Railway.** Go to <https://railway.app> → **New Project** →
   **Deploy from GitHub repo** → pick this repository. Railway detects Next.js and
   builds with **nixpacks** (`railway.toml` pins the builder + start command; the
   `Procfile` is a fallback for other platforms).
3. **Add environment variables** in the Railway dashboard (Settings → Variables):
   - `NEXT_PUBLIC_APP_URL` — your Railway URL, e.g. `https://grade-ai-production.up.railway.app`
   - `PORT` is provided by Railway automatically; `next start` reads it. Don't hardcode it.
4. **Auto-deploy.** Railway rebuilds and redeploys on every push to `main`.

Build/run commands used by Railway:
- Build: `npm run build`
- Start: `npm run start` (from `railway.toml` / `Procfile`)

## Editing content

All copy lives in `messages/<locale>.json`. Add a language by creating
`messages/<xx>.json`, adding the code to `locales` in `i18n/routing.ts`, and giving
it a name + flag in `i18n/config.ts`.

## Placeholders to replace before launch

- **Download links** in `DownloadButtons.tsx` are `#` — add real store URLs.
- **QR code** in `Hero.tsx` is an icon placeholder — drop in a real QR image.
- **`NEXT_PUBLIC_APP_URL`** — set to your real Railway/custom domain.
- **Contact email** is `ali.utku.ismihan@gmail.com` (in `Footer.tsx`).
