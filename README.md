# Daniyal — Personal Site
**React + Sanity + Vercel**

---

## Stack
- **Frontend:** React 18 + Vite
- **CMS:** Sanity.io (you edit content here — no code needed)
- **Hosting:** Vercel (free, auto-deploys from GitHub)

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Create your Sanity project

1. Go to **https://sanity.io** → Sign up (free)
2. Click **"Create new project"** → name it `daniyal-site`
3. Copy your **Project ID** from the dashboard

---

## 3. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

```
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

---

## 4. Deploy the Sanity Studio (your editing dashboard)

```bash
cd sanity
npx sanity@latest init --env .env.local
npx sanity deploy
```

This gives you a URL like `https://daniyal-site.sanity.studio` — **this is where you edit all content**.

---

## 5. Run locally

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 6. Deploy to Vercel

1. Push this folder to a **GitHub repo**
2. Go to **https://vercel.com** → Import the repo
3. Add these environment variables in Vercel dashboard:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_VERSION` = `2024-01-01`
4. Click Deploy — done ✓

---

## How to add content (no code needed)

Go to your Sanity Studio URL and use these sections:

| Section | What to add |
|---|---|
| **Statistics** | Add/edit any data figure (US or Pakistan) |
| **Blog Posts** | Write blog articles with rich text + images |
| **Journalism** | Add photo essays, field reports, interviews |
| **Research Reports** | Upload PDFs of UN/CDC/national reports |
| **International Work (SCP)** | Add SCP board work and advocacy items |

Every time you publish in Sanity, the live site updates automatically.

---

## File structure

```
src/
  components/   — Navbar, Footer, StatCard, ArticleCard, Ticker, PageHero
  pages/        — Home, Journalism, Research, InternationalWork, About, BlogPost
  lib/          — sanityClient.js, queries.js
  styles/       — globals.css
sanity/
  schemas/      — All 5 content type definitions
```

---

## Customization

- **Colors / fonts** → edit `src/styles/globals.css` (CSS variables at the top)
- **Navigation links** → edit `src/components/Navbar.jsx`
- **Ticker data** → edit `src/components/Ticker.jsx` (or connect to Sanity)
- **Your name / bio** → edit `src/pages/About.jsx`
- **SCP website link** → search for `sawyer-culberson-project.org` and replace
