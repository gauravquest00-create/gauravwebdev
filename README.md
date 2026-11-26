# Gaurav Verma — Website Developer Portfolio (Next.js 15 App Router)

A modular, production-ready **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Three.js** portfolio and client lead-capture platform for **Gaurav Verma**.

## Features Included

- **Dual Light/Dark Semantic Theme System** (`localStorage` persisted via `gaurav_portfolio_theme_v1`, Light default)
- **Architectural CAD Blueprint Entry Animation** (3-phase animated SVG wireframe, scanline, `Esc` skip, and global Replay button in Sidebar, Mobile Sheet, and Footer)
- **Three.js 3D Animated Background** (wireframe icosahedron, orbiting torus ring, particle constellation, mouse parallax, scroll Z-dolly zoom, theme color sync, `prefers-reduced-motion` support, and automatic 2D Canvas fallback)
- **Always-Clickable Floating Left Glassmorphism Sidebar (`z-[70]`)** + **Mobile Floating Bottom Dock & Profile Sheet** with cross-page `/#<section>` smooth scrolling
- **All 12 Real Shipped Projects** with live search, category filtering (`/projects`), and statically generated full-page Case Studies (`/projects/[slug]`)
- **All-Industry Website Packages (Zero Prices Displayed)** + **4-Step Guided Website Enquiry Wizard** (`/enquiry`) with `localStorage` draft persistence, adaptive industry options, Smart Scope Fit, and WhatsApp / Copy / Email / Direct Submit actions
- **Centralized Server-Side Google Sheets API (`/api/leads`)** with strict Indian 10-digit mobile (`6–9`) & English-only validation, zero browser CORS issues, and graceful Demo Mode when `.env.local` is not configured yet

---

## Quick Start (Windows `cmd.exe`, PowerShell, macOS, Linux)

### 1. Extract & Install Dependencies

```bash
cd gaurav-portfolio-nextjs
npm install
```

### 2. Configure Google Sheets Lead Sync (`.env.local`)

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Paste the code from `google-apps-script/Code.gs` and save.
3. Click **Deploy → New Deployment → Web App** (`Execute as: Me`, `Who has access: Anyone`).
4. Copy the generated `/exec` URL into `.env.local`:

```env
GOOGLE_SHEET_WEB_APP_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

> **Note:** If you leave `YOUR_DEPLOYMENT_ID` as-is during local testing, `/api/leads` automatically runs in **Demo Mode** so forms still work smoothly without crashing.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Verify Health Check & Production Build

- API Health Check: `GET http://localhost:3000/api/leads` → `{ "status": "ok", "sheetConfigured": true|false }`
- Production build:

```bash
npm run typecheck
npm run build
npm run start
```
