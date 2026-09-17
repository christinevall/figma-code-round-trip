# 03 · Vibe-coded app turned into a design system, then to Figma

**Demo 2 of the [Figma and code round trip](../README.md), part 2 of 2.** The vibe-coded app from [02](../02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) cleaned up into a real design system: tokens, one naming rule, components from atoms to pages, Storybook, and the same system in Figma.

| | |
| --- | --- |
| **Live Storybook** | [Vibe-coded app to design system and Figma](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/), no install needed |
| **Figma file** | [Vibe turned into DS to Figma](https://www.figma.com/community/file/1681263172277143380) |
| **The "before"** | [02 · the vibe-coded app](../02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) and its [Figma file](https://www.figma.com/community/file/1681262951439885139) |

## Start here

| You want to… | Go to |
| --- | --- |
| See the design system, live | [Live Storybook](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/) → *Introduction* |
| See what changed from the vibe-coded version | [02 vs 03 at a glance](#02-vs-03-at-a-glance) |
| Understand how it is built, no code knowledge needed | [In plain words](#in-plain-words), then [the stack](#the-stack-tool-by-tool) |
| Read the guide written for designers | [`docs/design-system-guide.md`](docs/design-system-guide.md) |
| Run it on your computer | [Run it on your computer](#run-it-on-your-computer) |

## What happened

1. **Start:** the vibe-coded app from [02](../02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/)
   (Vite, React, Tailwind, shadcn/ui).
2. **Clean-up:** Claude turned it into a design system. Same page, same look,
   but now with design tokens in JSON, one naming rule, components sorted into
   atoms, molecules and organisms, and Storybook as the live reference.
3. **Back to Figma:** tokens are pushed into Figma as variables and text
   styles by a script. Components were rebuilt in Figma from the component
   code, name for name. Both with the Figma Console MCP.

**Code is the source of truth.** Figma receives tokens, it does not send them
back.

> Done with the Figma Console MCP only. Brad Frost's
> [vibe-killer skill](https://github.com/bradfrost/skills) is built for exactly
> this step (rebuild a vibe-coded page out of a design system). A version with
> it is planned.

## In plain words

**A design system in code is the same idea as a Figma library.** Figma has components, variables and styles. The code has the same things, written as text files a browser can show.

| In Figma you know… | In this code it is… | Where |
| --- | --- | --- |
| A component (Button) with variants | A **React component** with **props**, its variants listed with cva: `<Button variant="outline">` | `src/components/ui/button.tsx` |
| Variables (colours, spacing, type) | **Design tokens** in JSON, turned into CSS variables and a Tailwind theme | `tokens/` → `src/styles/tokens.css` |
| The look of a component | **Tailwind classes** that can only use token values: `bg-primary` | inside each component file |
| The library file you browse | **Storybook**, a website with every component and state | [live](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/) or http://localhost:6006 |

### How a colour gets from a token to the screen (and into Figma)

1. **Primitive token:** `tokens/primitives/color.tokens.json` defines `color.neutral.900`, a near-black. It says *what* the colour is.
2. **Semantic token:** `tokens/semantic/color.light.tokens.json` defines `color.primary` → `{color.neutral.900}`, described as "primary action background". It says *what it is for*.
3. **Build:** `npm run tokens` (Style Dictionary) writes `src/styles/tokens.css`:<br>`--primary: var(--neutral-900);` and the Tailwind theme `--color-primary: var(--primary);`
4. **Component:** the default button has the class `bg-primary`, never a colour value.
5. **Browser:** the page looks the token up and paints the near-black. In dark mode `--primary` points at `neutral-200` instead.
6. **Figma:** `npm run figma:tokens` turns the same token into the variable `primary`, and Claude pushes it through the Figma Console MCP.

So **change the token once, and every component that uses it changes**. In 02 the same colour was scattered through class names and one-off values; that is the difference a design system makes.

## The stack, tool by tool

Same app stack as 02, plus a token pipeline and Storybook.

| Tool | What it is | What it does here |
| --- | --- | --- |
| **Node.js + npm** | The engine that runs JavaScript tools on your computer, and the store they are installed from | Installs everything (`npm install`) and starts Storybook (`npm run storybook`) |
| **React** 19 + **TypeScript** 6 | A library for building interfaces from reusable components, in JavaScript that says which values are allowed | Components are functions with props. Props are Figma component properties |
| **Design tokens** (W3C DTCG JSON) | One list of every colour, size, radius, shadow and text style | **Every Figma variable comes from here**: `tokens/primitives`, `tokens/semantic` |
| **Style Dictionary** 5 | A converter from token JSON to code | `npm run tokens` writes CSS variables, the Tailwind theme and the Figma JSON |
| **Tailwind CSS** v4 | Styling with short class names | The tokens *are* the theme, so a class can only use a system value. Class names match Figma names |
| **shadcn/ui** + **Radix UI** | Accessible base components, copied into the project | `src/components/ui`. The variant names come from shadcn |
| **cva** | Lists a component's variants | Each option is a Figma variant option: `variant`, `size` |
| **lucide-react** | An icon set | `Icon/arrow-right` in Figma is `<ArrowRightIcon />` in code |
| **next-themes** | A light / dark switch | The Light and Dark modes |
| **Vite** 8 | A fast development server and bundler | Shows a code change in the browser within a second. Runs quietly under Storybook |
| **Storybook** 10, with MCP, a11y and themes addons | A workshop where each component is shown on its own, in every state | Atoms to pages, light/dark, an accessibility check, and a plug for AI assistants |
| **Figma Console MCP** | A plug that lets an AI assistant read and build inside the Figma desktop app | Pushed the tokens and built the Figma components |

## How Figma and code stay in sync

```
tokens/*.tokens.json ── npm run tokens ──►  src/styles/tokens.css ──►  Tailwind classes ──►  React components ──►  Storybook
          │
          └───────── npm run figma:tokens ──►  tokens/build/figma-push.js ── Claude + Figma Console MCP ──►  Figma variables + text styles
                                                                                                                  │
                                                                                                                  ▼
                                                                                                    Figma components (bound to variables)
```

**One naming rule:** a token path joined with `-` is the CSS name, joined with
`/` it is the Figma name.

| Token (JSON) | CSS | Tailwind | Figma |
| --- | --- | --- | --- |
| `color.background` | `--background` | `bg-background` | variable `background` |
| `radius.lg` | `--radius-lg` | `rounded-lg` | variable `radius/lg` |
| `spacing.4` | `calc(var(--spacing) * 4)` | `p-4` | variable `spacing/4` |
| `typography.heading-xl` | `--text-heading-xl` | `text-heading-xl` | text style `heading-xl` |
| `Button` `variant="outline"` | `buttonVariants` | — | component `Button`, `variant=outline` |

## 02 vs 03 at a glance

| | 02 · vibe-coded | 03 · design system |
| --- | --- | --- |
| Where values live | `src/index.css` plus Tailwind defaults and one-off classes | `tokens/*.tokens.json`, built into CSS |
| Naming | Whatever the code happened to use | One rule for JSON, CSS, Tailwind and Figma |
| Components | Page sections | Atoms, molecules, organisms, page |
| Docs | None | Storybook + `docs/` + Figma pages |
| Figma sync | One run, by hand | Tokens by script, components on request, a sync list |
| Guard against drift | None | `npm run playground:check` for prototypes |

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer. Check with `node -v` in Terminal.

```bash
npm install
npm run dev              # the portfolio
npm run storybook        # Storybook on http://localhost:6006
npm run tokens           # rebuild CSS + Figma JSON after a token change
npm run figma:tokens     # tokens + the Figma push script
npm run playground:check # prototypes may only use design-system parts
```

`Ctrl + C` in Terminal stops it.

## What's where

| What | Where | Storybook | Figma page |
| --- | --- | --- | --- |
| Tokens (primitive → semantic) | `tokens/primitives/`, `tokens/semantic/` → `src/styles/tokens.css` | Foundations | Cover (tokens overview) |
| Atoms | `src/components/ui/` (shadcn) and `src/components/patterns/` | Atoms | Atoms |
| Molecules | `src/components/patterns/`, some `ui/` | Molecules | Molecules |
| Organisms | `src/components/sections/`, dialogs from `ui/` | Organisms | Organisms |
| Page | `src/pages/home-page.tsx` | Pages / Home | Home |
| Prototypes built only from the system | `src/playground/` | Playground | Playground |
| Token build and Figma push scripts | `scripts/` | — | — |
| Content | `src/data/site.ts` | — | — |
| Guide for designers | [`docs/design-system-guide.md`](docs/design-system-guide.md) | Introduction | Cover (Start here) |
| What is and isn't in sync | [`docs/figma-sync.md`](docs/figma-sync.md) | — | Sync status |

`src/components/ui/` stays flat so `npx shadcn add` keeps working. The atomic
level shows in the Storybook sidebar, not in folder names.

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
| **Tailwind class** | A short class name that sets one style, e.g. `bg-primary` for the primary background |
| **Atoms, molecules, organisms** | Brad Frost's names for component sizes: a button, a card made of buttons, a whole page section |

## Not done / not checked

- The full list is in [`docs/figma-sync.md`](docs/figma-sync.md): what Figma
  can't do (oklch colours, fluid type, motion tokens, CSS states) and open
  findings in the code.
- **Storybook Introduction tables** render as plain text (no GFM Markdown
  support configured in MDX). The tables in this README are the readable version.
- `.claude/launch.json` still points to an old folder name (`design-system`).
- **No Code Connect.** It needs an Organization or Enterprise plan. Every Figma
  component description has the JSX, the file path and a Storybook link instead.
- Storybook links in Figma point to `localhost:6006`.
- No full accessibility audit. `brand-foreground` on `brand` is 2.9:1, below AA
  for small text.

## Made by

[Christine Vallaure](https://christinevallaure.com), founder of [moonlearning.io](https://moonlearning.io). I teach designers how Figma, code and AI fit together.

- **The full course on this workflow** is in the making: advanced, for designers with solid Figma skills. The [newsletter](https://moonlearning.io/newsletter) is where I announce it.
- **Live course on Maven:** [Build Scalable UI in Figma & AI: Design Systems Agents Can Actually Use](https://maven.com/moonlearning/figma). Four weeks, hybrid, all levels.
- **Lightning session:** *Design Figma Files That Scale with AI*, with materials at [moonlearning.io/scaleAI](https://moonlearning.io/scaleAI).
- **Self-paced Figma courses** in the [moonlearning store](https://moonlearning.io/store), and [free sessions](https://moonlearning.io/resources).
- **For design teams:** in-house AI workshops and consulting, through [moonlearning.io](https://moonlearning.io).
