# Figma and code with AI · two demos

A playground for designers. The same small one-page portfolio goes back and
forth between Figma and code with Claude and the Figma Console MCP. Two demos,
four Figma files, three code folders.

Nothing here is a finished product. It is a place to look, click around and
compare what comes out.

## Demo 1 · Figma to code and back

What happens when a hand-made Figma file becomes code, and that code becomes a
Figma file again?

| Step | Direction | Stack | Storybook | Folder | Figma |
| --- | --- | --- | --- | --- | --- |
| **01 · Step 1** | Hand-made Figma file → code | HTML, CSS, a little JavaScript | Yes | [`01 Figma to DS and back`](01%20Figma%20to%20DS%20and%20back/) | [Handmade Figma to Code](https://www.figma.com/community/file/1681259703873319741) |
| **01 · Step 2** | That code → a new Figma file | Figma variables, modes, components | Yes (same code) | same folder | [Code DS to Figma](https://www.figma.com/community/file/1681259233728578359) |

**Look for:** the hand-made file has 30 breakpoint variants, the one built
from code has 3. Variables get scopes and code names. The AI lists what was
unclear in the hand-made file.

## Demo 2 · How to clean up a vibe-coded app

What does a typical vibe-coded app look like inside, and how do you turn it
into a design system that Figma and code share?

| Step | Direction | Stack | Storybook | Folder | Figma |
| --- | --- | --- | --- | --- | --- |
| **02** | Vibe-coded app → Figma, as it is | React, TypeScript, Tailwind CSS v4, shadcn/ui | **No, on purpose** | [`02 vibed (e.g. Lovable Claude Design)*`](02%20vibed%20(e.g.%20Lovable%20Claude%20Design)*/) | [Vibe coded app to Figma](https://www.figma.com/community/file/1681262951439885139) |
| **03** | The same app → design system → Figma | Same as 02, plus design tokens, Style Dictionary, Storybook | Yes | [`03 vibe to DS and Figma`](03%20vibe%20to%20DS%20and%20Figma/) | [Vibe turned into DS to Figma](https://www.figma.com/community/file/1681263172277143380) |

**Look for:** in 02, values hide in Tailwind class names and one-off sizes,
and the components are page sections. In 03 there are tokens in JSON, one
naming rule for code and Figma, atoms to organisms, and Storybook.

GitHub repo: *coming soon*.

## How the AI moves between Figma and code

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

Each folder has its own README: what happened, the stack in plain words, how
Figma and code connect, and what is not checked. Each Figma file starts with a
**Cover** page.

## Resources

- [Figma Console MCP](https://github.com/southleft/figma-console-mcp) (the bridge used in both demos)
- [Brad Frost's agent skills](https://github.com/bradfrost/skills), especially
  **vibe-killer**, which rebuilds a vibe-coded page out of a real design system.
  Demo 2 was done with the Figma Console MCP only. A version with Brad Frost's
  skills is planned.
- [AI & Design Systems inspection kit](https://github.com/Brad-Frost-Web/ai-design-systems-inspection-kit) (health check for a design system)
- [Storybook](https://storybook.js.org) · [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com)
