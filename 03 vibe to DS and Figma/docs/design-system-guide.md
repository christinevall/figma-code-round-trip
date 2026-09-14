# Design system guide for designers

The portfolio design system lives in three places that share one set of names:

| Place | What you do there | Link |
| --- | --- | --- |
| **Code** (`/tokens`, `src/components`) | The source of truth. Values and components are defined here first. | this repo |
| **Storybook** | See every component live, in light and dark, with its props, code and CSS. | `npm run storybook` → http://localhost:6006 |
| **Figma** file **Vibe to DS and Figma** | Design with the same tokens and components. Variables, text styles, components, the Home screen. | Figma |

If a name exists in one place, it means the same thing in the other two.

---

## 1. The stack, in plain words

You don't need to know how these tools work inside. This table says what each one is, why it is here, and whether it matters to you when designing.

| Tool | What it is | Why it is here | Relevant for design? |
| --- | --- | --- | --- |
| **Design tokens** (`/tokens/*.tokens.json`, W3C DTCG format) | A JSON file for every color, size, radius, shadow and text style | One list of decisions that code *and* Figma are generated from | **Yes, most of all.** Every Figma variable comes from here |
| **Style Dictionary** (`npm run tokens`) | A converter | Turns the token JSON into CSS variables, the Tailwind theme and `tokens/build/figma.json` | Only as a command: run it after a token changes |
| **Tailwind CSS v4** | Styling through short class names (`bg-background`, `p-4`, `text-heading-xl`) | The tokens *are* the Tailwind theme, so code can only use design-system values | **Yes.** Class names match Figma names; that is how you read a component's code |
| **React 19 + TypeScript** | The UI library and the language components are written in | Components are functions with **props**; TypeScript checks the props | Props matter: a Figma component property = a React prop |
| **shadcn/ui** | A collection of accessible components copied into the repo (`src/components/ui`) | You own the code and can restyle it with tokens; `npx shadcn add <name>` adds more | Yes: Button, Badge, Input, Dialog, Tabs… come from here, so their variants follow shadcn names |
| **Radix UI** | Invisible behaviour under shadcn: focus trapping, keyboard, screen readers | Dialogs, sheets, tabs and tooltips are accessible without extra work | Only indirectly: you don't design this, but it is why a Dialog behaves correctly |
| **class-variance-authority (cva)** | The small function that lists a component's variants (`variant`, `size`) | Keeps variants explicit and typed | **Yes.** Each cva option is a Figma variant option with the same name |
| **lucide-react** | The icon set | Consistent 24px-grid icons with a 2px stroke | Yes: use the same icon names (`Icon/arrow-right` = `<ArrowRightIcon />`) |
| **next-themes** | Light/dark switch that adds the `.dark` class | Dark mode works everywhere from the same tokens | Yes: the Figma **Light / Dark** modes are this |
| **sonner**, **cmdk** | Toast notifications, the ⌘K command menu | Ready-made patterns | Only their look (they use popover tokens) |
| **Vite** | The dev server and build tool | Fast local preview (`npm run dev`) | No |
| **Storybook 10** | A workshop that renders every component in isolation, with docs, controls, an accessibility check and light/dark switch | Living documentation that can't drift from the code, because it *is* the code | **Yes.** Check a component here before designing a change to it |
| **Storybook MCP** and **figma-console MCP** | Bridges that let Claude read Storybook and read/write the Figma file | Keeps Figma and code in sync without manual copying | Useful: ask Claude to "sync tokens to Figma" or "check Button against code" |

### How it fits together

```
tokens/*.tokens.json  ── npm run tokens ──►  src/styles/tokens.css  ──►  Tailwind classes  ──►  React components  ──►  Storybook
          │
          └──────────── npm run figma:tokens ──►  tokens/build/figma-push.js  ── Claude + figma-console ──►  Figma variables + styles
                                                                                                            │
                                                                                                            ▼
                                                                                              Figma components (bound to variables)
```

Code is the source of truth. Figma receives tokens; it does not send them back automatically.

---

## 2. One naming rule

A token path joined with `-` is the CSS name. Joined with `/` it is the Figma name. The leading `color` group is dropped.

| Token (JSON) | CSS | Tailwind | Figma |
| --- | --- | --- | --- |
| `color.background` | `--background` | `bg-background` | variable `background` (collection Color) |
| `color.neutral.950` | `--neutral-950` | — (primitive, hidden) | variable `neutral/950` (Primitives) |
| `radius.lg` | `--radius-lg` | `rounded-lg` | variable `radius/lg` (Scale) |
| `spacing.4` | `calc(var(--spacing) * 4)` | `p-4`, `gap-4` | variable `spacing/4` (Scale) |
| `typography.heading-xl` | `--text-heading-xl` | `text-heading-xl` | text style `heading-xl` |
| `Button`, prop `variant="outline"` | `buttonVariants` | — | component `Button`, property `variant=outline` |

In Dev Mode every variable shows its CSS name (code syntax is set), so a developer inspecting a frame sees `var(--muted-foreground)`, not a hex value.

---

## 3. Working in the Figma file

**Pages**

| Page | What's on it |
| --- | --- |
| Cover | File overview |
| Start here | This guide, short version |
| Sync status | What matches code, what can't, and open items |
| Foundations | Colors (light and dark), typography, spacing, radius, shadow, layout |
| Icons | Lucide icons the code uses, plus the images from `src/assets` |
| Atoms / Molecules / Organisms | Components, same grouping and names as the Storybook sidebar. Every component description has its JSX, file path and Storybook link |
| Home | The one-page portfolio built from component instances: desktop 1280 and mobile 390, each in Light and Dark |

**Rules that keep design and code in sync**

1. **Colors:** pick from the *Color* collection only (`background`, `foreground`, `muted`, `brand`…). Primitives are hidden on purpose. If no token fits, that's a design-system question, not a one-off hex.
2. **Text:** always apply a text style. The style name is the class in code.
3. **Spacing and radius:** bind padding, gap and corner radius to `spacing/*` and `radius/*`. Values off the 4px grid have no class in code.
4. **Themes:** select a frame → *Appearance* → Color: Light / Dark. Layout: Mobile / Desktop changes header height and page gutter.
5. **Components:** use instances; change them through their properties. Property names and options are the React props (`variant`, `size`, `tone`…).
6. **States:** `state=hover | focus | disabled` exists only in Figma. In code these are automatic (`:hover`, `:focus-visible`, `disabled`), so never ask for a `state` prop.
7. **Icons:** swap the icon through the instance-swap property; don't detach.
8. **Don't detach components or edit variables by hand.** A variable edited in Figma is overwritten at the next token push. Change tokens in `/tokens` (or ask Claude to), then push.

---

## 4. Everyday workflows

### Change a color, size or text style

1. Edit the value in `tokens/primitives/*.tokens.json` or `tokens/semantic/*.tokens.json` (or ask Claude: "make `muted-foreground` darker in light mode").
2. Run `npm run figma:tokens`. This rebuilds the CSS and writes `tokens/build/figma-push.js`.
3. Ask Claude: "push tokens/build/figma-push.js to Figma with figma-console". The script updates variables and styles in place and never deletes anything.
4. Check Storybook (`npm run storybook`) and the Figma Foundations page.

### Change or add a component

1. Look at the component in Storybook first (Docs tab: props, source, CSS).
2. Design the change in Figma using the existing variables and properties. If you add an option, name it as it will be named in code.
3. Implement in code (`src/components/...`), add or update the story.
4. Update the Figma component to match, and tick it on the **Sync status** page.

### Add an icon

Copy the name from lucide.dev, import it in code (`XxxIcon` from `lucide-react`), and add `Icon/<name>` on the Icons page (Claude can do it from the lucide package).

---

## 5. Run it locally

```bash
npm install
npm run storybook       # component docs on http://localhost:6006
npm run dev             # the portfolio
npm run tokens          # rebuild CSS + Figma JSON after a token change
npm run figma:tokens    # tokens + the Figma push script
```

## 6. What is not in sync

See [figma-sync.md](figma-sync.md) (also the **Sync status** page in Figma).
