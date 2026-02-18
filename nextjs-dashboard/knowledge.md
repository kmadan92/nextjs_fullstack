# Project knowledge

This file gives Codebuff context about your project: goals, commands, conventions, and gotchas.

## Overview
Next.js App Router dashboard application with authentication, folder/media management, and role-based access control. Built on MongoDB with NextAuth v5.

## Quickstart
- Install: `pnpm install`
- Dev: `pnpm dev` (uses Turbopack)
- Build: `pnpm build`
- Start: `pnpm start`
- No test or lint scripts configured yet.

## Architecture
- **Key directories:**
  - `app/` — Next.js App Router pages and API routes
  - `app/(dashboard)/` — Protected dashboard pages (route group)
  - `app/api/` — API routes (auth, folder creation, user signup/login)
  - `components/` — Shared React components
  - `components/ui/` — shadcn/ui primitives (button, card, dialog, input, label, radio-group, badge)
  - `lib/` — Utilities (`auth.ts` for JWT helpers, `dbConfig.ts` for MongoDB connection, `utils.ts` for cn/clsx)
  - `models/` — Mongoose models (User, Folder, Media)
- **Data flow:** MongoDB via Mongoose → API routes → React client components
- **Auth flow:** NextAuth v5 beta (`auth.ts`) with Credentials + Google providers. Middleware (`middleware.ts`) protects all routes except `/login`, `/signup`, `/unauthorized`. JWT tokens (access + refresh) are managed in NextAuth callbacks. `auth.config.ts` is the lightweight config used by middleware.
- **Path alias:** `@/*` maps to project root (e.g., `@/components/...`, `@/lib/...`)

## Conventions
- **Package manager:** pnpm (do not use npm or yarn)
- **UI framework:** shadcn/ui (new-york style, Tailwind CSS variables, Lucide icons). Add components via `pnpm dlx shadcn@latest add <component>`.
- **Styling:** Tailwind CSS 3 with `@tailwindcss/forms` and `tailwindcss-animate` plugins. CSS variables for theming defined in `app/global.css`.
- **Icons:** Lucide React (`lucide-react`) and Heroicons (`@heroicons/react`)
- **Animation:** Framer Motion (`framer-motion`)
- **TypeScript:** Strict mode enabled. Use path aliases (`@/...`).
- **API routes:** Located under `app/api/`. Some use `.tsx` extension (e.g., `createFolder/route.tsx`).
- **Images:** Remote images allowed from `images.unsplash.com` (configured in `next.config.ts`).
- **Components** Prefer Server Components by default; use 'use client' only when necessary.

## Gotchas
- NextAuth is on v5 beta (`next-auth@5.0.0-beta.25`) — APIs differ from v4. Use `auth()` (not `getServerSession`).
- Middleware excludes `/api` routes from auth checks — API routes must handle their own auth if needed.
- User model has `password` field with `select: false` — must use `.select("+password")` when querying for login.
- Both `bcrypt` and `bcryptjs` are installed; the codebase uses `bcryptjs` in auth logic.
- `jose` and `jsonwebtoken` are both installed for JWT handling.
