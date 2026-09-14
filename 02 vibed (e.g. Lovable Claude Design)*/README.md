# 02 · Vibe-coded app to Figma

**Demo 2 · How to clean up a vibe-coded app, part 1 of 2.** See the [overview](../README.md).
Figma file: [02 · Vibe coded app to Figma](https://www.figma.com/community/file/1681262951439885139)

## What happened

1. **Start:** screenshots of the portfolio page (see `screenshots/`) and a short
   prompt: build this, and add a bit more.
2. **Vibe coding:** Claude built the app the way Lovable, Bolt or Claude
   usually scaffold one: **Vite + React + TypeScript + Tailwind CSS v4 +
   shadcn/ui**. No design system, no plan, no clean-up. It works and it looks
   good.
3. **Mapped into Figma:** Claude read the code and rebuilt it in Figma with the
   Figma Console MCP: variables from the CSS and Tailwind defaults, text styles
   from the classes, components for every section, and the pages.

This folder stays as it came out, **on purpose**. It shows what a typical
vibe-coded app looks like from the inside. Step [03](../03%20vibe%20to%20DS%20and%20Figma/)
is the same app, cleaned up into a design system.

There is **no Storybook** here. That is part of the point.

## The stack, in plain words

| Tool | What it is | Where | Relevant for design? |
| --- | --- | --- | --- |
| **Vite** 8.3 | Dev server and build tool | `vite.config.ts` | No |
| **React** 19 | The UI is written as React components (functions with props) | `src/App.tsx`, `src/components/` | Props = Figma component properties |
| **TypeScript** 6.0 | JavaScript with types | `tsconfig.json` | No |
| **Tailwind CSS** 4.3 | Styling with short class names (`bg-brand`, `p-6`, `md:grid-cols-2`), plus default spacing, type scale and breakpoints | `src/index.css` | **Yes.** Most values are hidden in class names |
| **shadcn/ui** (radix-nova) | Ready-made components copied into the project (Button, Dialog, Tabs, Sheet…) | `src/components/ui/`, `components.json` | Yes: their variant names come from shadcn |
| **Radix UI** 1.6 | Invisible behaviour behind shadcn: focus, keyboard, screen readers | inside `src/components/ui/` | Indirectly |
| **lucide-react** 1.45 | Icons | `import { SearchIcon } from "lucide-react"` | Yes: same icon names |
| **next-themes** 0.4 | Light / dark mode (`.dark` class) | `src/main.tsx` | Yes: the Light / Dark modes |
| **sonner** 2.0 · **cmdk** 1.1 | Toasts · ⌘K command menu | `src/components/ui/` | Only their look |
| **@fontsource/poppins** 5.3 | Self-hosted Poppins | `src/index.css` | Yes: the font |
| **tw-animate-css** 1.4 | Enter/exit animations | `src/index.css` | No |

## How Figma and code connect

```
src/index.css            :root { --brand: #ff6431 }   .dark { --background: … }
      ↓
@theme inline            --color-brand: var(--brand)
      ↓
Tailwind classes         bg-brand · text-foreground · rounded-lg · p-6
      ↓
Components               src/components/*.tsx use those classes (and some one-off values)

Figma variables          same names (brand, foreground …), code syntax = var(--name)
```

One direction, one run: code → Figma. Nothing keeps them in sync afterwards.

## What to notice (the "vibe" part)

Not bugs. These are the things that make a vibe-coded app hard to keep in sync
with a design file.

| What | In code | What it means in Figma |
| --- | --- | --- |
| **Values live in class names** | Spacing, type sizes and breakpoints are Tailwind defaults. They don't appear in `src/index.css`, but they are fixed | Figma needs extra collections (Spacing, Typography, Responsive, Breakpoints) that nobody defined in code |
| **One-off values** | `text-[0.95rem]`, `text-[1.75rem]`, a `clamp()` hero size | Text styles like `Body/Project` 15.2 px that exist only because of one class |
| **Loose custom tokens** | `--brand`, `--section`, `--footer` added next to the shadcn theme | Colours without a system around them |
| **Responsive = prefixes** | `text-3xl sm:text-4xl`, `md:grid-cols-2` scattered inside components | Breakpoint changes have to be collected by hand into modes and variants |
| **Page sections are the components** | `hero.tsx`, `work.tsx`, `about.tsx`… each with its own markup | No small building blocks to reuse. Figma components mirror sections, not atoms |
| **No docs, no Storybook** | Only the running app | The Figma file is the first place the system is written down |

Compare with [03](../03%20vibe%20to%20DS%20and%20Figma/): tokens in JSON, one
naming rule, atoms → molecules → organisms, Storybook.

## Run it

```bash
npm install
npm run dev
```

## What's where

| What | File |
| --- | --- |
| All text, projects, skills | `src/data/site.ts` |
| Colours, font, radius, container | `src/index.css` (`--brand`, `--section`, `--footer`) |
| Page sections | `src/components/*.tsx` |
| shadcn/ui components | `src/components/ui/` (add more with `npx shadcn@latest add <name>`) |
| Images | `src/assets/` |
| The screenshots it started from | `screenshots/` |
| Tokens, text styles and breakpoints in detail | `DESIGN-SYSTEM.md` |

## Features Claude added

- Responsive layout for mobile, tablet and desktop
- Light and dark mode
- Sticky header with active-section indicator and scroll progress bar
- Mobile slide-in menu (Sheet)
- Work filter tabs
- Project case-study dialog with prev/next, arrow keys and shareable `?project=` links
- Command menu (<kbd>⌘K</kbd> / <kbd>Ctrl K</kbd>)
- Contact form with validation and toasts (the send is faked with a timeout)
- Scroll-reveal animations that respect reduced-motion settings

## Not checked

- No accessibility audit and no pixel comparison between Figma and the browser.
- The Figma file was built once from this code. If the code changes, Figma does not.
