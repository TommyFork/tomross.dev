## tomross.dev

Personal portfolio and project showcase built with Next.js.

### Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **MDX** (optional writing pages)

### Local development
1. Install dependencies
   - `npm install` (or your preferred manager)
2. Copy env example and set values
   - Create a `.env` file with the keys below
3. Run dev server
   - `npm run dev`

### Environment variables
- `NEXT_PUBLIC_GA_ID` (optional) — Google Analytics measurement ID
- `NEXT_PUBLIC_EMAIL_USER` — email username (defaults to `tommyross`)
- `NEXT_PUBLIC_EMAIL_DOMAIN` — email domain (defaults to `me.com`)

### Scripts
- `dev` — start dev server (Turbopack)
- `build` — production build
- `start` — start production server
- `lint` — run ESLint
- `lint:fix` — fix ESLint issues
- `typecheck` — run TypeScript checks

### Notes
- GA only loads in production when `NEXT_PUBLIC_GA_ID` is set.
- Email is revealed via UI and env vars to reduce scraping.

### License
Source-available under the PolyForm Noncommercial License 1.0.0. You may view and reuse small parts for noncommercial purposes. Distribution of the whole project or commercial reuse is not permitted. See `LICENSE` for details.
