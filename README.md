# Figma and code with AI · two demos

A playground for designers. The same small one-page portfolio goes back and forth between Figma and code with Claude and the Figma Console MCP. Two demos, four Figma files, three code folders. Nothing here is a finished product: it is a place to look, click around and compare what comes out.

**Live:** [overview](https://christinevall.github.io/figma-code-round-trip/) · [Storybook, demo 1](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/) · [Storybook, demo 2](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/)

## Start here

| You want to… | Go to |
| --- | --- |
| See a design system that came from a hand-made Figma file | [Demo 1 Storybook](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/) |
| See what a vibe-coded app looks like inside | [02 folder](02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) and its [Figma file](https://www.figma.com/community/file/1681262951439885139) |
| See the same app cleaned up into a design system | [Demo 2 Storybook](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/) |
| Understand the words and tools, no code knowledge needed | [In plain words](#in-plain-words), then each folder's README |
| Run a demo on your computer | [Run it on your computer](#run-it-on-your-computer) |

## The demos

### Demo 1 · Figma to code and back

What happens when a hand-made Figma file becomes code, and that code becomes a Figma file again?

| Step | Direction | Live | Figma | Folder |
| --- | --- | --- | --- | --- |
| **01 · Step 1** | Hand-made Figma file → code | [Storybook](https://christinevall.github.io/figma-code-round-trip/figma-to-ds-and-back/) | [Handmade Figma to Code](https://www.figma.com/community/file/1681259703873319741) | [`01 Figma to DS and back`](01%20Figma%20to%20DS%20and%20back/) |
| **01 · Step 2** | That code → a new Figma file | same Storybook | [Code DS to Figma](https://www.figma.com/community/file/1681259233728578359) | same folder |

**Look for:** the hand-made file has 30 breakpoint variants, the one built from code has 3. Variables get scopes and code names. The AI lists what was unclear in the hand-made file.

### Demo 2 · How to clean up a vibe-coded app

What does a typical vibe-coded app look like inside, and how do you turn it into a design system that Figma and code share?

| Step | Direction | Live | Figma | Folder |
| --- | --- | --- | --- | --- |
| **02** | Vibe-coded app → Figma, as it is | No Storybook, on purpose | [Vibe coded app to Figma](https://www.figma.com/community/file/1681262951439885139) | [`02 vibed (e.g. Lovable Claude Design)*`](02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) |
| **03** | The same app → design system → Figma | [Storybook](https://christinevall.github.io/figma-code-round-trip/vibe-to-ds-and-figma/) | [Vibe turned into DS to Figma](https://www.figma.com/community/file/1681263172277143380) | [`03 vibe to DS and Figma`](03%20vibe%20to%20DS%20and%20Figma/) |

**Look for:** in 02, values hide in Tailwind class names and one-off sizes, and the components are page sections. In 03 there are tokens in JSON, one naming rule for code and Figma, atoms to organisms, and Storybook.

## In plain words

**A design system in code is the same idea as a Figma library.** Figma has components, variables and styles; code has the same things, written as text files a browser can show.

| In Figma you know… | In code it is… |
| --- | --- |
| A component with variants | A **component** with **props**: `<Button variant="primary">` |
| Variables | **Design tokens**: CSS variables like `--color-action-primary-default` |
| The look of a component | A **stylesheet** (01) or **Tailwind classes** (02, 03) that use those tokens |
| The library file you browse | **Storybook**, a website with every component and state |

**Why the round trip matters:** when the names are the same in both tools, an AI can read one and build the other. When they are not (02), it can only copy what it sees. Each folder's README walks one colour from token to screen, step by step.

## The stack, demo by demo

| Demo | Stack | What it shows |
| --- | --- | --- |
| **01** | HTML, CSS, a little JavaScript, CSS custom properties, Vite, Storybook 10 | The simplest possible chain: no framework, no token build step |
| **02** | React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Vite | A typical vibe-coded app, as tools like Lovable or Claude produce it |
| **03** | Same as 02, plus design tokens (DTCG JSON), Style Dictionary, Storybook 10 with MCP | The same app with a real design system underneath |

## How Figma and code stay in sync

```
                         Figma Console MCP  (reads and writes the open Figma file)
                                  │
Demo 1   01 Step 1   Figma ───────┼───────►  code
         01 Step 2   Figma ◄──────┼────────  code

Demo 2   02          Figma ◄──────┼────────  vibe-coded app  (mapped as it is)
         03          Figma ◄──────┼────────  design system  ◄──  vibe-coded app
```

- **The AI** is Claude (Claude Code).
- **The bridge** is the [Figma Console MCP](https://github.com/southleft/figma-console-mcp).
  It talks to Figma Desktop through a plugin, so it can read variables, text
  styles and components, and also create them. No Organization plan needed.
- **Code Connect** (Dev Mode shows the real code for a component) was not used.
  It needs the official Figma MCP and an Organization or Enterprise plan.

Each folder has its own README in the same order: start here, in plain words, the stack, how Figma and code stay in sync, run it, what's where. Each Figma file starts with a
**Cover** page.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 or newer. Check with `node -v` in Terminal. One Terminal tab per demo; `Ctrl + C` stops it.

| Demo | Go to the folder | Start | Open |
| --- | --- | --- | --- |
| 01 | `cd "01 Figma to DS and back"` | `npm install`, then `npm run storybook` | http://localhost:6010 |
| 02 | `cd "02 vibed (e.g. Lovable Claude Design)*"` | `npm install`, then `npm run dev` | the link Terminal prints (usually http://localhost:5173) |
| 03 | `cd "03 vibe to DS and Figma"` | `npm install`, then `npm run storybook` | http://localhost:6006 |

Every push to `main` also rebuilds the two live Storybooks ([`.github/workflows/storybooks.yml`](.github/workflows/storybooks.yml)).

## What's where

| Folder | What |
| --- | --- |
| [`01 Figma to DS and back`](01%20Figma%20to%20DS%20and%20back/) | Demo 1: plain HTML and CSS, Storybook |
| [`02 vibed (e.g. Lovable Claude Design)*`](02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) | Demo 2, before: the vibe-coded app |
| [`03 vibe to DS and Figma`](03%20vibe%20to%20DS%20and%20Figma/) | Demo 2, after: tokens, components, Storybook |
| `.github/workflows/` | Publishes the Storybooks to GitHub Pages |

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

## Resources

- [Figma Console MCP](https://github.com/southleft/figma-console-mcp) (the bridge used in both demos)
- [Brad Frost's agent skills](https://github.com/bradfrost/skills), especially
  **vibe-killer**, which rebuilds a vibe-coded page out of a real design system.
  Demo 2 was done with the Figma Console MCP only. A version with Brad Frost's
  skills is planned.
- [AI & Design Systems inspection kit](https://github.com/Brad-Frost-Web/ai-design-systems-inspection-kit) (health check for a design system)
- [Storybook](https://storybook.js.org) · [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com)

## Made by

[Christine Vallaure](https://christinevallaure.com), founder of [moonlearning.io](https://moonlearning.io). I teach designers how Figma, code and AI fit together.

- **The full course on this workflow** is in the making: advanced, for designers with solid Figma skills. The [newsletter](https://moonlearning.io/newsletter) is where I announce it.
- **Live course on Maven:** [Build Scalable UI in Figma & AI: Design Systems Agents Can Actually Use](https://maven.com/moonlearning/figma). Four weeks, hybrid, all levels.
- **Lightning session:** *Design Figma Files That Scale with AI*, with materials at [moonlearning.io/scaleAI](https://moonlearning.io/scaleAI).
- **Self-paced Figma courses** in the [moonlearning store](https://moonlearning.io/store), and [free sessions](https://moonlearning.io/resources).
- **For design teams:** in-house AI workshops and consulting, through [moonlearning.io](https://moonlearning.io).
