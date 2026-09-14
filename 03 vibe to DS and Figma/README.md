# 03 · Vibe-coded app turned into a design system, then to Figma

**Demo 2 · How to clean up a vibe-coded app, part 2 of 2.** See the [overview](../README.md).
Figma file: [03 · Vibe turned into DS to Figma](https://www.figma.com/community/file/1681263172277143380)

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

## The stack, in plain words

Same app stack as 02, plus a token pipeline and Storybook.

| Tool | What it is | Relevant for design? |
| --- | --- | --- |
| **Design tokens** (`tokens/*.tokens.json`, W3C DTCG format) | One JSON list of every colour, size, radius, shadow and text style | **Yes, most of all.** Every Figma variable comes from here |
| **Style Dictionary** | A converter: tokens → CSS variables, Tailwind theme, Figma JSON | Only as a command (`npm run tokens`) |
| **Tailwind CSS v4** | Styling with short class names. The tokens *are* the theme, so code can only use system values | **Yes.** Class names match Figma names |
| **React 19 + TypeScript** | Components are functions with props | Props = Figma component properties |
| **shadcn/ui + Radix UI** | Accessible base components, copied into `src/components/ui` | Yes: variant names come from shadcn |
| **cva** | Lists a component's variants (`variant`, `size`) | **Yes.** Each option = a Figma variant option |
| **lucide-react** | Icons | Yes: `Icon/arrow-right` = `<ArrowRightIcon />` |
| **next-themes** | Light / dark switch | Yes: the Light / Dark modes |
| **Storybook 10** | Every component live, with docs, controls, a11y check, light/dark | **Yes.** Check a component here first |
| **Storybook MCP · Figma Console MCP** | Let Claude read Storybook and read/write the Figma file | Useful: "sync tokens to Figma" |
| **Vite** | Dev server and build tool | No |

## How Figma and code connect · the token pipeline

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

## Run it

```bash
npm install
npm run dev              # the portfolio
npm run storybook        # Storybook on http://localhost:6006
npm run tokens           # rebuild CSS + Figma JSON after a token change
npm run figma:tokens     # tokens + the Figma push script
npm run playground:check # prototypes may only use design-system parts
```

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

## Not in sync / not checked

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
