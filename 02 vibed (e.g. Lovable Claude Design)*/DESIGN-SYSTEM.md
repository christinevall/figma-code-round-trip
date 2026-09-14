# Design system guide

The React app and the Figma file **02 Vibe to Figma** mirror each other 1:1. Every color, radius, spacing value, text size and breakpoint in Figma comes from this code, and the Figma variables use the same names as the CSS.

## 1. The stack

| Tool | Version | What it does | Where |
| --- | --- | --- | --- |
| Vite | 8.3 | Dev server and build tool | `vite.config.ts` |
| React | 19.3 | UI components | `src/App.tsx`, `src/components/` |
| TypeScript | 6.0 | JavaScript with types | `tsconfig.json` |
| Tailwind CSS | 4.3 | Utility classes + default spacing, type scale, breakpoints | `src/index.css` |
| shadcn/ui (radix-nova) | CLI 4.21 | Copy-in components (Button, Dialog, Tabs, Sheet…) | `src/components/ui/`, `components.json` |
| Radix UI | 1.6 | Accessible behaviour behind shadcn/ui | inside `src/components/ui/` |
| lucide-react | 1.45 | Icons | `import { SearchIcon } from "lucide-react"` |
| next-themes | 0.4 | Light / dark mode (`.dark` class) | `src/main.tsx` |
| sonner | 2.0 | Toasts | `src/components/ui/sonner.tsx` |
| cmdk | 1.1 | ⌘K command menu | `src/components/ui/command.tsx` |
| @fontsource/poppins | 5.3 | Self-hosted Poppins | `src/index.css` |
| tw-animate-css | 1.4 | Enter/exit animations | `src/index.css` |

## 2. How tokens flow

```
src/index.css            :root { --brand: #ff6431 }   .dark { --background: … }
      ↓
@theme inline            --color-brand: var(--brand)
      ↓
Tailwind classes         bg-brand · text-foreground · rounded-lg · p-6
      ↓
Components               src/components/*.tsx use only those classes

Figma variables          same names (brand, foreground …), code syntax = var(--name)
```

## 3. Where each value comes from

| Token | Defined in code | Figma |
| --- | --- | --- |
| Colors | CSS variables in `src/index.css` (`:root` = light, `.dark` = dark) | `2. Color` (Light / Dark) → `1. Primitives` |
| Brand, section, footer | Custom variables in `src/index.css` | `2. Color` |
| Radius | `--radius: 0.5rem`; `rounded-sm…4xl` derive from it | `3. Radius` |
| Spacing | Tailwind default `--spacing: 0.25rem` (`p-4` = 16px) | `4. Spacing` |
| Font | `--font-sans: Poppins`, files from `@fontsource/poppins` | `5. Typography` |
| Text sizes | Tailwind type scale + `text-[0.95rem]` + hero `clamp()` | `5. Typography` + text styles |
| Responsive values | `sm:` `md:` `lg:` prefixes inside components | `6. Responsive` (Mobile / Tablet / Desktop) |
| Breakpoints | Tailwind defaults, min-width, mobile first | `7. Breakpoints` |
| Container | `@utility page-container`: max 70rem (1120px), padding 20 → 24px | `6. Responsive · layout/container-*` |
| Icons | lucide-react, 16px in buttons | Components · Icons |
| Content | `src/data/site.ts` | Component text properties |

## 4. Text styles

| Style | Size / line height (px) | Weight | Tailwind |
| --- | --- | --- | --- |
| Display/Hero | 41.6 → 69 → 84 / ×1.05 | 800 | `text-[clamp(2.6rem,9vw,5.25rem)] uppercase tracking-tight` |
| Heading/H2 | 30 → 36 / 36–40 | 700 | `text-3xl sm:text-4xl` |
| Heading/Project title | 28 → 36 / ×1.25 | 700 | `text-[1.75rem] lg:text-4xl leading-tight` |
| Heading/Dialog | 36 / 40 | 700 | `text-4xl` |
| Heading/Menu link | 30 / 36 | 700 | `text-3xl` |
| Heading/Stat | 24 / 32 | 700 | `text-2xl` |
| Heading/H3 | 18 / 28 | 700 | `text-lg` |
| Body/Lead | 18 → 20 / 28 | 400 | `text-lg sm:text-xl` |
| Body/Base | 16 / 26 | 400 | `text-base leading-relaxed` |
| Body/Project | 15.2 / 24.7 | 400 | `text-[0.95rem] leading-relaxed` |
| Body/Small | 14 / 22.75 | 400 | `text-sm leading-relaxed` |
| Label/Semibold | 14 / 20 | 600 | `text-sm font-semibold` |
| Label/Medium | 14 / 20 | 500 | `text-sm font-medium` |
| Label/Regular | 14 / 20 | 400 | `text-sm` |
| Caption/Medium | 12 / 16 | 500 | `text-xs font-medium` |
| Caption/Regular | 12 / 16 | 400 | `text-xs` |

## 5. Breakpoints

| Prefix | From | Figma frame | What changes |
| --- | --- | --- | --- |
| (none) | 0 | Mobile 375 | One column, mobile header + menu, full-width tabs |
| `sm:` | 640px | — | Container padding 20 → 24, header 64 → 80, toolbar in a row, H2 30 → 36 |
| `md:` | 768px | Tablet 768 | Desktop nav, two-column project rows and About, three-column Skills |
| `lg:` | 1024px | — | Project titles 28 → 36, About gap 48 → 64 |
| `xl:` | 1280px | Desktop 1280 | Nothing new; content capped at 1120px |
| `2xl:` | 1536px | — | Not used |

## 6. Handoff rules

1. Never hardcode hex or px. Use variables and text styles.
2. New value? Add it to `src/index.css` first, then a Figma variable with the same name.
3. Stay on the Tailwind scale: 4px spacing steps, sizes from the type scale.
4. Design mobile first, then note what changes at `sm`, `md`, `lg`.
5. Copy lives in `src/data/site.ts`.
6. Build new screens from the existing components.
