# 01 · Figma to code and back

**Demo 1 of the [Figma and code round trip](../README.md).** A one-page portfolio designed by hand in Figma becomes code, and that code becomes a new Figma file. The simplest possible stack: plain HTML, CSS and a little JavaScript, no framework.

| | |
| --- | --- |
| **Live Storybook** | [Figma to design system and back](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/), no install needed |
| **Figma, step 1** | [Handmade Figma to Code](https://www.figma.com/community/file/1681259703873319741): the hand-made file the code was built from |
| **Figma, step 2** | [Code DS to Figma](https://www.figma.com/community/file/1681259233728578359): the new file built from the code |

## Start here

| You want to… | Go to |
| --- | --- |
| See the components, live | [Live Storybook](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/) → *Introduction* |
| Compare the two Figma files | Step 1 and step 2 above: 30 breakpoint variants by hand, 3 generated from code |
| Understand how it is built, no code knowledge needed | [In plain words](#in-plain-words), then [the stack](#the-stack-tool-by-tool) |
| See what the AI found unclear in the hand-made file | [What the AI noticed](#what-the-ai-noticed-in-the-hand-made-figma-file) |
| Run it on your computer | [Run it on your computer](#run-it-on-your-computer) |

## What happened

1. **Start:** a one-page portfolio designed by hand in Figma, with variables,
   text styles, components and three page frames (desktop, tablet, mobile).
2. **Step 1:** Claude read that file through the Figma Console MCP and wrote
   plain HTML, CSS and a little JavaScript, plus Storybook. Along the way it
   listed what was unclear in the Figma file (see below).
3. **Step 2:** the code became the source of truth. Claude built a new, empty
   Figma file from it: variables with modes, text styles and components, all
   bound to variables.

Compare the two Figma files: the hand-made one has 30 breakpoint variants. The
one generated from code has breakpoint variants on 3 components only.

## In plain words

**A design system in code is the same idea as a Figma library.** Figma has components, variables and styles. The code has the same things, written as text files a browser can show.

| In Figma you know… | In this code it is… | Where |
| --- | --- | --- |
| A component (Button) with variants | A small **JavaScript function** that returns HTML, with options: `variant`, `label` | `src/components/button/button.js` |
| Variables (colours, spacing, type) | **Design tokens**: CSS variables like `--color-action-primary-default` | `src/tokens/tokens.css` |
| The look of a component | A **stylesheet** that uses those tokens | `src/components/button/button.css` |
| The library file you browse | **Storybook**, a website with every component and state | [live](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/) or http://localhost:6010 |

### How a colour gets from Figma to the screen, and back

1. **Figma (hand-made):** the variable `action/primary/default` points at `color/neutral/800` (#2C2C2C) in Light mode.
2. **Read:** Claude read the file through the Figma Console MCP and saved every variable in `figma/variables.json`.
3. **Token:** it wrote the same decision into `src/tokens/tokens.css`:<br>`--color-action-primary-default: var(--color-neutral-800);`
4. **Component:** `button.css` says `background: var(--color-action-primary-default);`, never the hex.
5. **Browser:** the page looks the token up and paints #2C2C2C. In dark mode it reads the dark value.
6. **Back to Figma (step 2):** Claude built a new file from the code: the variable is called `action/primary/default` again, now with the CSS name as its code syntax.

So **change the token once, and every component that uses it changes**. The names stay the same in both tools, which is what lets the AI move between them.

## The stack, tool by tool

The simplest possible chain on purpose, to compare 03 against. No Tailwind, no React, no token build step.

| Tool | What it is | What it does here |
| --- | --- | --- |
| **Node.js + npm** | The engine that runs JavaScript tools on your computer, and the store they are installed from | Installs everything (`npm install`) and starts Storybook (`npm run storybook`) |
| **HTML + CSS + a little JavaScript** | The three languages every website is made of. No framework | Each component is a `.js` file that returns markup and a `.css` file for the look. Easy to read without React knowledge |
| **CSS custom properties** | Variables inside CSS | The design tokens, in three layers: primitives → semantic → text styles. Same names as the Figma variables |
| **Vite** 8 | A fast development server and bundler | Shows a code change in the browser within a second. Runs quietly under Storybook |
| **Storybook** 10 (HTML) | A workshop where each component is shown on its own, in every state | Every component with light/dark and the three Figma frame sizes, plus a *Code* section on each Docs page |
| **Figma Console MCP** | A plug that lets an AI assistant read and build inside the Figma desktop app | Step 1: read the hand-made file. Step 2: built the new file |

## How Figma and code stay in sync

```
Step 1   Figma file (hand-made) ──read──►  figma/variables.json ──►  src/tokens/tokens.css ──►  components ──►  Storybook
Step 2   code (source of truth)  ──write──►  new Figma file: variables, text styles, components, page
```

There is no automatic sync. Each direction was one run with Claude and the
Figma Console MCP.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer. Check with `node -v` in Terminal.

```bash
npm install
npm run dev          # the page → http://localhost:5173
npm run storybook    # Storybook → http://localhost:6010
```

`Ctrl + C` in Terminal stops it.

## What's where

| Folder | What |
| --- | --- |
| `figma/variables.json` | What Figma gave us: every variable and text style, as read |
| `src/tokens/tokens.css` | The same values as CSS custom properties |
| `src/base.css` | The few page-wide rules |
| `src/components/` | 10 components, each with `.js` (markup), `.css` (look), `.stories.js` (Storybook) |
| `src/content.js` | All words and images in one place |
| `public/images/` | Images exported from Figma (`.jpg`) and illustrated placeholders (`.svg`) |
| `src/pages/portfolio.js` | The page, made only from components |
| `src/Introduction.mdx` | The first page in Storybook |
| `.storybook/` | Theme switch (light/dark), the three Figma frame sizes, and a folded **Code** section on every Docs page (`docs-page.js`) |

## Step 1 · Figma → code

| Figma | Code |
| --- | --- |
| 5 variable collections, 63 variables | 63 CSS custom properties, in 3 layers: primitives → semantic → text styles |
| Color modes light / dark | `[data-theme="dark"]` |
| Text modes lg / md / sm | Media queries at 800px and 1280px |
| 11 text styles | 11 `--text-*` font shorthands (+ tracking) |
| 10 components, 30 variants | 10 components. Breakpoint variants become one responsive component |
| Button state variants | `:hover`, `:active`, `:focus-visible`. `state` only kept for Storybook |
| 3px inside stroke | `box-shadow: inset`, so the button doesn't grow |
| Slots (`media`) | An `image` prop |
| Menu `close / open` | `aria-expanded` |

### What the AI noticed in the hand-made Figma file

These were fixed or rounded in code. They are left in the Step 1 file on
purpose, to show in the demo.

1. **Spacing without variables.** Navigation gaps (783, 54, 35.5), About
   padding (66 / 52 / 52.9 / 64) and gaps (95, 56). Rounded to the nearest
   space token.
2. **Hardcoded sizes.** Container max width 1200 and logo 48px have no
   variable. The container became `--container-max` in `base.css`.
3. **Breakpoint names don't agree.** The text mode is called `lg (>1280)`, but
   the desktop frame is `<1280 (Desktop)` and the mobile frame is
   `>800 (Mobile)`. Code uses ≥800 and ≥1280.
4. **Secondary button uses primary tokens.** Its border is
   `action/primary/*`; `action/secondary/default | hover | pressed | border`
   exist but nothing uses them.
5. **Unclear variant names.** Menu is `Property 1 = close | open`, so it's not
   clear whether "open" means the menu or the icon.
6. **Prop typo.** About has `hadButton`. In code: `button` (leave it out to
   hide).
7. **Leftover modes.** The Skills mobile variant still points to modes from
   two library collections that are not in this file.
8. **Not designed yet:** the open mobile menu, and hover for text links. Code
   uses a simple stacked menu and an underline. Both are marked in the CSS.

---

## Step 2 · code → a new Figma file

### What's in the file

| Page | What |
| --- | --- |
| Cover | Thumbnail, the Start here guide, the tokens overview (semantic colours in Light and Dark, primitives, text styles, spacing) and About moonlearning.io |
| About … Skills | One page per component, same order as Storybook. Each has docs: Figma → code |
| Portfolio | The page in 4 frames (lg, md, sm, sm dark), instances only |

### Variables · 65 in 3 collections

| Collection | Modes | What |
| --- | --- | --- |
| Primitives | Value | Brand and neutral colours (hidden from pickers), space, radius, font family and weights, `layout/container-max` |
| Color | Light · Dark | 23 semantic colours, all aliases of primitives |
| Breakpoint | sm · md · lg | `font-size/100–600` and `layout/gutter` |

- **Names match the code:** `text/default` in Color = `--color-text-default`.
- **Code syntax** on every variable, so Dev Mode shows `var(--color-text-default)`.
- **Scopes** on every variable, no "all scopes": text colours only for text,
  surfaces only for fills, borders only for strokes, space only for gap and padding.
- **11 text styles** bound to the font family, weight and size variables.

### Components · 10, all values bound

Every fill, stroke, padding, gap and radius is bound to a variable, and every text
uses a text style. Checked with a script over 119 layers. One exception: the
focus ring's 12px radius (8px button radius + 4px offset has no token).

| Component | Props in Figma | Code props |
| --- | --- | --- |
| Button | `variant`, `state`, `label` | `variant`, `label` (+ `state` for Storybook only) |
| Logo | none | `href`, `label` |
| MenuToggle | `open` | `open` |
| Navigation | `breakpoint`, `open`, `link 1–3`, exposed Button | `links`, `cta`, `open` |
| Hero | `subtitle`, `headline` | same |
| ProjectCard | `hasBackground`, `headline`, `description`, `linkLabel`, **`media` slot** | same, `image` |
| About | `breakpoint`, `headline`, `description`, `button`, **`media` slot** | same, `image` |
| SkillItem | `headline`, `content` | same |
| Skills | `headline`, **`items` slot** (prefers SkillItem) | `headline`, `items` |
| Footer | `breakpoint`, `copyright`, `link 1–2` | `copyright`, `links` |

### Responsiveness · three tools, used in this order

The hand-made file had a Desktop / Tablet / Mobile variant for every section
(30 variants). The generated file has breakpoint variants on 3 components only.

1. **A value changes → Breakpoint mode.** Font sizes and side padding. Hero has
   no variants at all: put it in a frame, switch the mode. In code: tokens inside
   a media query in `tokens.css`.
2. **Content reflows → Wrap + min width.** ProjectCard (image and text, min 320)
   and Skills (items, min 200) stack by themselves on small frames. In code:
   `flex-direction` in one media query.
3. **The structure changes → breakpoint variant.** Only here:
   - **Navigation:** burger on sm, links from md. `open` exists only on sm.
   - **About:** image on top on sm, beside the text from md.
   - **Footer:** stacked on sm, one row from md.

   Each breakpoint variant carries its own Breakpoint mode, so an instance always
   has the right font sizes.

To make rule 1 match 1:1, the code got one change: `--layout-gutter` became a
token that changes at 1280px, like the font sizes. Hero, ProjectCard and Skills
lost their desktop-only media queries. Nothing looks different.

---

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

## Not done / not checked

- **Images.** The page uses the real images exported from Figma
  (`public/images/*.jpg`); the Web Template image shows a real name and photo.
  For a neutral version, point `content.js` back to the `*.svg` placeholders.
  Text is fictional (Sam Taylor, `example.com`).
- **Images in the Step 2 Figma file are placeholders.** The Figma plugin only
  loads images from its allowed domains, and `localhost` is refused.
- **No Code Connect.** It needs the official Figma MCP and an Organization plan.
- **Storybook links** in Figma point to `localhost:6010`, so they only work
  while Storybook runs.
- Pixel-level comparison with Figma was done by eye and by screenshots, not
  measured. Accessibility: the a11y panel runs in Storybook, no full audit.
- The page renders with JavaScript. A real site would output static HTML.

## Made by

[Christine Vallaure](https://christinevallaure.com), founder of [moonlearning.io](https://moonlearning.io). I teach designers how Figma, code and AI fit together.

- **The full course on this workflow** is in the making: advanced, for designers with solid Figma skills. The [newsletter](https://moonlearning.io/newsletter) is where I announce it.
- **Live course on Maven:** [Build Scalable UI in Figma & AI: Design Systems Agents Can Actually Use](https://maven.com/moonlearning/figma). Four weeks, hybrid, all levels.
- **Lightning session:** *Design Figma Files That Scale with AI*, with materials at [moonlearning.io/scaleAI](https://moonlearning.io/scaleAI).
- **Self-paced Figma courses** in the [moonlearning store](https://moonlearning.io/store), and [free sessions](https://moonlearning.io/resources).
- **For design teams:** in-house AI workshops and consulting, through [moonlearning.io](https://moonlearning.io).
