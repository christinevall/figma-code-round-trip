# Figma ↔ code sync

Figma file: **Vibe to DS and Figma** (`WuQrHTwlnm4eVA5N33sa1w`). The same list is on the file's **Sync status** page.

**Direction:** code → Figma. `/tokens` is the source of truth. Figma never writes back on its own.

| What | How it gets to Figma | Automated? |
| --- | --- | --- |
| Variables (5 collections, 91 variables, modes, aliases, scopes, CSS code syntax) | `npm run figma:tokens`, then run `tokens/build/figma-push.js` in the file (Claude + figma-console) | Yes, idempotent upsert |
| Text styles (16) bound to font family, size and weight variables | same script | Yes |
| Effect styles (`shadow-sm`, `shadow-lg`), color bound to `black-alpha/10` | same script | Yes |
| Icons (`Icon/<lucide-name>`) | built from `lucide-react` SVG data | On request |
| Components (names, variant properties = cva props, token bindings) | built from the component source | Manual / on request, checked against code |

---

## Not possible in Figma, or deliberately different

Each item says what code does, what Figma does instead, and whether anything should change.

### Tokens

| # | Code | Figma | Action |
| --- | --- | --- | --- |
| T1 | Colors are **oklch** | Variables are **sRGB**. Converted with gamut mapping; neutrals are exact, `red/400` and `red/600` are clamped very slightly | None |
| T2 | `leading.*` (unitless line heights) and `tracking.*` (em) tokens | No variables: Figma can't bind unitless line height or em letter spacing. Values live inside the text styles (px and %) | None. Change them in `/tokens`, re-push |
| T3 | `duration.*`, `ease.*` motion tokens | Not creatable through the Plugin API. Documented on Foundations only | Use them by name in prototype notes |
| T4 | `text-display` is fluid: `clamp(2.6rem, 9vw, 5.25rem)` | Two text styles: `display` (84px) and `display-sm` (41.6px, Figma only) | None |
| T5 | Breakpoints `sm` 640, `md` 768, `lg` 1024 | Layout collection has 2 modes (Mobile / Desktop) for gutter and header height. Other responsive changes are separate frames (Home desktop and mobile) | None |
| T6 | Opacity modifiers in classes: `bg-primary/80`, `ring-ring/50`, `bg-destructive/10`, `bg-background/80`, `ring-foreground/10`, `text-foreground/60` | A child layer (`bg`, `border`, `focus-ring`, `hover-overlay`) filled with the variable, with **layer opacity** set. Paint opacity on a variable-bound paint does not survive the Plugin API reliably, so layer opacity is used instead. The opacity number is not a token | Optional: add alpha tokens if these should be managed |
| T7 | `color-mix(in oklch, var(--secondary), var(--foreground) 5%)` (secondary button hover) | `secondary` fill plus a `hover-overlay` layer in `foreground` at 5% (sRGB blend, visually the same) | None |
| T8 | `rounded-full` (9999px) on pills, chips, dots | Fixed radius, not a variable | None |

### Components

| # | Code | Figma | Action |
| --- | --- | --- | --- |
| C1 | Hover, focus-visible and disabled are CSS states | Extra `state` variant property (Figma only) | Don't add a `state` prop in code |
| C2 | Focus ring is `box-shadow` 3px `ring/50` | Absolute layer `focus-ring`, 3px outside the component, stroke bound to `ring`, layer opacity 50% | None |
| C3 | Dark-mode-only overrides in shadcn classes (`dark:bg-input/30`, `dark:border-input` on outline Button, Input, Textarea, Tabs) | Components use the light-mode token in both modes, so these differ slightly in Dark | Decide: add component tokens (e.g. `button-outline-bg`) to `/tokens`, or accept |
| C4 | Button `size="sm"` uses `text-[0.8rem]` (12.8px), not a text style | Uses `caption-strong` (12px) | Suggest changing code to `text-xs` |
| C5 | Button padding shrinks next to an icon (`has-data-[icon=inline-start]:pl-2`) | Not modeled | None |
| C6 | `children` is free content | `label` text property plus `icon start` / `icon end` booleans and icon swaps | None |
| C7 | Animations: scroll reveal, image zoom, nav underline, `animate-ping` status dot, dialog fade | Static. Prototype with Smart Animate if needed | None |
| C8 | Behaviour: focus trap, Escape, ⌘K, arrow keys in ProjectDialog, form validation, toasts | Not in Figma | Storybook is the reference |
| C9 | Icon-only buttons are `<Button size="icon-*">` | Separate component set **Icon Button** (keeps the Button matrix under control) | None |
| C10 | shadcn classes without a text style: `CardTitle` and `SheetTitle` (`text-base font-medium`), `DialogTitle` (`text-base leading-none font-medium`), Label `leading-none` | Nearest style: `prose-md` for the three titles, `label-md` for Label. The portfolio overrides DialogTitle with `text-heading-lg` in ContactDialog, so that one matches | Suggest a `title-md` text style (16px medium) in `/tokens` and using it in those shadcn files |
| C18 | `CommandShortcut` is `text-xs tracking-widest` (0.1em) | Uses `caption` (0% tracking). No text style has widest tracking | Optional: add a `caption-wide` style, or drop the tracking in code |
| C19 | CommandInput field is `bg-input/30 border-input/30` (differs from InputGroup) | Built in place in CommandMenu with `bg` and `border` layers at 30%, not as an InputGroup instance | None |
| C20 | In code an icon inherits the text colour (`currentColor`) | Icons are strokes bound to `foreground`. Swapping the icon inside a filled Button (default, secondary, destructive) can reset it to `foreground`. **Designers:** after a swap, set the icon colour to the same variable as the label (e.g. `primary-foreground`) | None in code. Figma has no `currentColor` |
| C11 | Input `size=lg` and Textarea `min-h-28` are `className` overrides in ContactDialog | Figma exposes them as a `size` variant / fixed height | None, or promote to a real `size` prop in code |
| C12 | Sections are responsive with breakpoint classes (`sm:`, `md:`, `lg:`) | Organisms have a Figma-only `breakpoint=desktop | mobile` variant, each with its Layout mode set (Desktop / Mobile). In-between widths (768–1023px) aren't drawn | None |
| C13 | SiteHeader border and progress depend on scroll position (`y > 8`) | Figma-only `scrolled=false | true` variant | None |
| C14 | `backdrop-blur-lg` (header), `backdrop-blur-xs` (dialog and sheet overlay), `backdrop-blur` (image chip) | Background blur effect with a fixed radius (16 / 4 / 8). Blur values aren't tokens | None |
| C15 | Dialog and Sheet overlay is `bg-black/10`, using the `black` primitive | The overlay layer binds to the hidden primitive `black` at 10% layer opacity. It's the one place a primitive is bound directly | Optional: add a semantic `overlay` token |
| C16 | BrandMark `md` is 36px below 640px | Mobile header frames show the 40px `md` variant | None |
| C17 | Component TEXT properties share one default across variants | Toast variants and Badge variants all show the same placeholder text until you set it on the instance | None |

### Tooling

| # | Topic | Status |
| --- | --- | --- |
| X1 | **Code Connect** (Dev Mode shows the real JSX for an instance) | Tried on Button: Figma answered "You need a Dev or Full seat on an Organization or Enterprise plan". The file lives in a team without that plan. Instead every component description has the JSX, the file path and a Storybook link. Moving the file into the Enterprise org would unlock it |
| X2 | Storybook links | Point to `http://localhost:6006`. Replace with the deployed Storybook URL once it exists |
| X3 | Images in Figma | Compressed 560px copies of `src/assets`; the originals stay in code |
| X4 | Library publishing | Not published as a team library yet. Publish when other files should use it |
| X5 | figma-console QA tools | `figma_audit_design_system_report` scores token architecture 0 because it can't see the local variables (they exist: 91 in 5 collections). `figma_lint_design` fails with "Unknown method" until the Desktop Bridge plugin is updated (Figma shows "update available"). Its naming warnings (lowercase `Icon/arrow-right`, no category paths) are deliberate: names match lucide and the code |

---

## Findings in the code (not fixed, for review)

| # | Where | What |
| --- | --- | --- |
| F1 | `src/data/site.ts` | Fixed: `copyrightHolder` now matches `name` ("James Jones") |
| F2 | `color.brand-foreground` | White on `#ff6431` is 2.9:1, below WCAG AA for small text. Brand badge text is 12px |
| F3 | Storybook Introduction and other MDX pages | Markdown tables render as plain text (no GFM support configured) |
| F4 | `BackToTop` + `SiteFooter` on small screens | At the very bottom of the page the fixed button (16px from the corner) covers the footer's "Contact" link. The Figma Home mocks place it above the footer instead |
| F5 | Storybook docs pages | The browser console logs "Encountered a script tag while rendering React component" (7×) on the Introduction docs page. Not caused by the MDX text; source not investigated |
| F6 | `npm run storybook` | The dev server crashed once during this session (exit code 134, a V8 abort inside a regular expression) about 28 minutes after start. A restart worked. Worth watching; if it repeats, check the react-docgen / component-manifest settings in `.storybook/main.ts` |
