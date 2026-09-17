# 02 · Vibe-coded app to Figma

**Demo 2 of the [Figma and code round trip](../README.md), part 1 of 2.** A portfolio page built the way Lovable, Bolt or Claude usually scaffold an app, with no design system, then mapped into Figma as it is. This folder stays as it came out, **on purpose**: it is the "before".

| | |
| --- | --- |
| **Live Storybook** | None, on purpose. The app itself is the only documentation |
| **Figma file** | [02 · Vibe coded app to Figma](https://www.figma.com/community/file/1681262951439885139) |
| **The "after"** | [03 · the same app as a design system](../03%20vibe%20to%20DS%20and%20Figma/), with its [live Storybook](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/) |

## Start here

| You want to… | Go to |
| --- | --- |
| See what makes a vibe-coded app hard to keep in sync with Figma | [What to notice](#what-to-notice-the-vibe-part) |
| See the cleaned-up version | [03 · vibe to design system and Figma](../03%20vibe%20to%20DS%20and%20Figma/) |
| Understand how it is built, no code knowledge needed | [In plain words](#in-plain-words), then [the stack](#the-stack-tool-by-tool) |
| Run it on your computer | [Run it on your computer](#run-it-on-your-computer) |

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

## In plain words

**A design system in code is the same idea as a Figma library.** Figma has components, variables and styles. The code has the same things, written as text files a browser can show.

| In Figma you know… | In this code it is… | Where |
| --- | --- | --- |
| A component (Button) with variants | A **React component** with **props**; here mostly whole page sections: `hero.tsx`, `work.tsx` | `src/components/` |
| Variables (colours, spacing, type) | A few **CSS variables** (`--brand`) plus **Tailwind defaults** hidden in class names (`p-6`, `text-3xl`) | `src/index.css`, and inside class names |
| The look of a component | **Tailwind classes** written straight into each component, some with one-off values (`text-[0.95rem]`) | each component file |
| The library file you browse | Nothing. There is no Storybook; the running app is all there is | http://localhost:5173 while `npm run dev` runs |

### How a colour gets to the screen here

1. **CSS variable:** `src/index.css` sets `--brand: #ff6431;` next to the shadcn theme colours.
2. **Tailwind theme:** `@theme inline` turns it into a Tailwind colour: `--color-brand: var(--brand);`
3. **Component:** `hero.tsx` uses the class `bg-brand` for the little status dot.
4. **Browser:** the page paints #FF6431.
5. **Figma:** Claude read the CSS and created a variable `brand` with the same value. That was one run: if the code changes, Figma does not.

This one colour works like a token. **Most values do not**: spacing, type sizes and breakpoints live in Tailwind class names and one-off values, so nobody ever decided them by name. That is the difference [03](../03%20vibe%20to%20DS%20and%20Figma/) fixes.

## The stack, tool by tool

The typical stack an AI app builder picks. It works and it looks good; there is just no system behind it.

| Tool | What it is | What it does here |
| --- | --- | --- |
| **Node.js + npm** | The engine that runs JavaScript tools on your computer, and the store they are installed from | Installs everything (`npm install`) and starts Storybook (`npm run storybook`) |
| **React** 19 + **TypeScript** 6 | A library for building interfaces from reusable components, in JavaScript that says which values are allowed | The whole page. Props are Figma component properties |
| **Tailwind CSS** 4.3 | Styling with short class names, with a built-in spacing scale, type scale and breakpoints | **Most values are hidden in class names** (`bg-brand`, `p-6`, `md:grid-cols-2`) |
| **shadcn/ui** (radix-nova) | Ready-made components copied into the project | Button, Dialog, Tabs, Sheet in `src/components/ui/`. Their variant names come from shadcn |
| **Radix UI** 1.6 | Invisible behaviour: focus, keyboard, screen readers | Inside the shadcn components |
| **lucide-react** 1.45 | An icon set | `<SearchIcon />`, same names as in Figma |
| **next-themes** 0.4 | A light / dark switch | The Light and Dark modes (`.dark` class) |
| **sonner** · **cmdk** | Toast messages · a ⌘K command menu | Contact form feedback, the command menu |
| **@fontsource/poppins** · **tw-animate-css** | The font, self-hosted · enter and exit animations | `src/index.css` |
| **Vite** 8.3 | A fast development server and bundler | Shows a code change in the browser within a second. Runs quietly under Storybook |
| **Figma Console MCP** | A plug that lets an AI assistant read and build inside the Figma desktop app | Mapped this app into Figma, once |

## How Figma and code stay in sync

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

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer. Check with `node -v` in Terminal.

```bash
npm install
npm run dev          # the page → the link Terminal prints, usually http://localhost:5173
```

`Ctrl + C` in Terminal stops it.

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

## Words you will hear

| Word | Means |
| --- | --- |
| **Repository (repo)** | The project folder, with the full history of every change. This one lives on GitHub |
| **npm / Node.js** | The tools that install and run everything. You type `npm run storybook`, they do the rest |
| **Build** | Turning the source files into a finished website. The live Storybook is a build |
| **Component** | A reusable piece of interface, like a Figma component. In code it is a file you use as `<Button />` |
| **Prop** | A component property. `variant="primary"` in code is `variant=primary` in Figma |
| **Token** | A named design decision (a colour, a spacing step) that code and Figma share |
| **Primitive / semantic token** | *What* a value is (a colour from a ramp) / *what it is for* (the background of a primary button). Components use semantic tokens |
| **Story** | One example of a component in one state, shown in Storybook |
| **MCP** | A plug that lets an AI assistant (Claude, Cursor) look things up in a tool and work in it: Storybook, or the Figma desktop app |
| **Code Connect** | A Figma feature that shows the real code of a component in Dev Mode. Needs an Organization or Enterprise plan |
| **Tailwind class** | A short class name that sets one style, e.g. `bg-brand` or `p-6` |
| **Vibe coding** | Building an app by describing it to an AI and accepting what comes out, without planning the system first |

## Not done / not checked

- No accessibility audit and no pixel comparison between Figma and the browser.
- The Figma file was built once from this code. If the code changes, Figma does not.

## Made by

[Christine Vallaure](https://christinevallaure.com), founder of [moonlearning.io](https://moonlearning.io). I teach designers how Figma, code and AI fit together.

- **The full course on this workflow** is in the making: advanced, for designers with solid Figma skills. The [newsletter](https://moonlearning.io/newsletter) is where I announce it.
- **Live course on Maven:** [Build Scalable UI in Figma & AI: Design Systems Agents Can Actually Use](https://maven.com/moonlearning/figma). Four weeks, hybrid, all levels.
- **Lightning session:** *Design Figma Files That Scale with AI*, with materials at [moonlearning.io/scaleAI](https://moonlearning.io/scaleAI).
- **Self-paced Figma courses** in the [moonlearning store](https://moonlearning.io/store), and [free sessions](https://moonlearning.io/resources).
- **For design teams:** in-house AI workshops and consulting, through [moonlearning.io](https://moonlearning.io).
