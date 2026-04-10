# Ghulam Mustafa Portfolio

A premium, Awwwards-inspired full stack developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js + React Three Fiber + Drei
- next-themes (dark/light mode)
- Nodemailer (contact email API)
- cmdk (command palette)

## Run Locally

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Set SMTP credentials
3. Start development:
   - `npm run dev`

## Build

- `npm run build`
- `npm run start`

## Key Features

- Fullscreen interactive 3D hero scene
- Particle effects + mouse-reactive 3D object
- Glassmorphism navbar + premium neon gradients
- Smooth section reveals and micro-interactions
- Project filtering + modal details
- Command palette (`Ctrl/Cmd + K`)
- Cursor glow + scroll progress indicator
- Loading overlay + route loading skeleton
- SEO metadata, `robots`, and `sitemap`
- Contact form API with Nodemailer

## Folder Structure

- `app/` - routes, metadata, API
- `components/` - shared UI + Three.js components
- `sections/` - page section modules
- `lib/` - typed content/data
- `hooks/` - reusable custom hooks
- `styles/` - design tokens and style helpers
