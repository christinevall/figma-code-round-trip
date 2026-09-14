# 01 · Figma to code and back

**Demo 1 · Figma to code and back.** See the [overview](../README.md). Two steps, one folder:

| Step | Direction | Figma file |
| --- | --- | --- |
| **Step 1** | Hand-made Figma file → code | [01 · Step 1: Handmade Figma to Code](https://www.figma.com/community/file/1681259703873319741) |
| **Step 2** | That code → a new Figma file | [01 · Step 2: Code DS to Figma](https://www.figma.com/community/file/1681259233728578359) |

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

## The stack, in plain words

| Tool | What it is | Relevant for design? |
| --- | --- | --- |
| **HTML + CSS** | No framework. Every component is a small `.js` file that returns markup, plus a `.css` file | Yes: easy to read, no React knowledge needed |
| **CSS custom properties** | The design tokens (`--color-text-default`) in `src/tokens/tokens.css` | **Yes, most of all.** Same names as the Figma variables |
| **Vite** | Dev server that shows the page | No |
| **Storybook 10** | Every component on its own, with light/dark and the three frame sizes | **Yes.** Look here first |
| **Figma Console MCP** | The bridge Claude used to read (Step 1) and write (Step 2) the Figma files | Only as a tool |

No Tailwind, no React, no token build step. That is on purpose: this is the
simplest possible version to compare 02 and 03 against.

## How Figma and code connect

```
Step 1   Figma file (hand-made) ──read──►  figma/variables.json ──►  src/tokens/tokens.css ──►  components ──►  Storybook
Step 2   code (source of truth)  ──write──►  new Figma file: variables, text styles, components, page
```

There is no automatic sync. Each direction was one run with Claude and the
Figma Console MCP.

## Run it

```bash
npm install
npm run dev          # the page → http://localhost:5173
npm run storybook    # Storybook → http://localhost:6010
```

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

---

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
