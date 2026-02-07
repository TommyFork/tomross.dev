# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for tomross.dev. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Deployed on Vercel.

## Commands

```bash
bun dev              # Dev server with Turbopack
bun run build        # Production build
bun run lint         # ESLint check
bun run lint:fix     # Auto-fix lint issues
bun run typecheck    # TypeScript check (tsc --noEmit)
```

## Architecture

**Routing**: Next.js App Router in `src/app/`. Three pages: `/about` (default, redirected from `/`), `/work`, `/contact`.

**Server vs Client**: Components are server components by default. Interactive components use `"use client"` directive — notably Nav, WorkContent, ContactModal, ContactButton, and the Providers wrapper.

**State Management**: React Context API via `ContactModalContext` for global contact modal state (open/close, anchor tracking, focus management, body scroll lock). No external state libraries.

**Styling**: Tailwind CSS v4 with custom CSS variables for brand colors and custom animations (`animate-float`, `animate-bounce-subtle`) defined in `globals.css`. Path alias `@/*` maps to `src/*`.

**Content**: Static markdown in `public/content/` rendered with `react-markdown` + `remark-gfm`. MDX support configured but markdown files are in public dir. No database or CMS.

**Animations**: Framer Motion for component transitions, Web Animations API for modal morphing, IntersectionObserver for scroll-triggered reveals. Respects `prefers-reduced-motion`.

**Email Protection**: ContactModal uses XOR cipher encoding with a mask sequence to prevent scraping. Includes bot detection (checks `navigator.webdriver` and suspicious user agents).

## Key Files

- `src/app/layout.tsx` — Root layout with Nav, Footer, ContactModal, Providers
- `src/app/providers.tsx` — Client wrapper providing ContactModalProvider
- `src/components/ContactModal.tsx` — Portal-based modal with animation anchoring
- `src/components/ContactModalContext.tsx` — Context + custom hook `useContactModal()`
- `src/components/Nav.tsx` — Responsive nav with scroll-aware sticky header
- `src/app/work/WorkContent.tsx` — Portfolio showcase with section tracking, animated counters, image galleries
