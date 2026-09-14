/**
 * Token build. Source of truth: /tokens (DTCG 2025.10 JSON).
 *
 * Outputs
 *   src/styles/tokens.css   CSS custom properties + the Tailwind v4 theme (generated, do not edit)
 *   tokens/build/figma.json variables, text styles and effect styles for the Figma file
 *   tokens/build/tokens.json flat token list used by the Storybook foundation pages
 *
 * Style Dictionary loads and validates the DTCG files and resolves references.
 * Output formatting is custom: references stay as var(--x) in CSS, and Tailwind
 * needs its own @theme syntax.
 *
 * Naming rule (one rule everywhere): the DTCG path joined with "-" is the CSS name,
 * joined with "/" is the Figma name. The leading "color" group is dropped.
 *   color.neutral.950  →  --neutral-950   Figma: neutral/950
 *   color.background   →  --background    Figma: background   Tailwind: bg-background
 *   radius.lg          →  --radius-lg     Figma: radius/lg    Tailwind: rounded-lg
 *   text.heading-xl    →  --text-heading-xl  Figma text style: heading-xl  Tailwind: text-heading-xl
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Color from 'colorjs.io'
import StyleDictionary from 'style-dictionary'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const t = (file) => path.join(root, 'tokens', file)

const PRIMITIVES = [t('primitives/color.tokens.json'), t('primitives/scale.tokens.json')]

async function load(sources, include = []) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    include,
    source: sources,
    log: { verbosity: 'silent' },
    platforms: { raw: { transforms: [] } },
  })
  const { allTokens } = await sd.getPlatformTokens('raw')
  return allTokens
}

// ---------- naming ----------
const isRef = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v)
const refPath = (v) => v.slice(1, -1).split('.')
const stripColor = (p) => (p[0] === 'color' ? p.slice(1) : p)
const cssName = (p) => (p[0] === 'spacing' && p[1] === 'base' ? 'spacing' : stripColor(p).join('-'))
const figmaName = (p) => stripColor(p).join('/')
const cssVar = (p) => `var(--${cssName(p)})`

// ---------- values ----------
const round = (n, d = 6) => +n.toFixed(d)
const rem = (px) => (px === 0 ? '0' : `${round(px / 16)}rem`)
const GENERIC_FONTS = new Set(['ui-sans-serif', 'system-ui', 'sans-serif', 'serif', 'monospace'])

function colorCss(v) {
  const a = v.alpha ?? 1
  const alpha = a < 1 ? ` / ${round(a * 100, 2)}%` : ''
  if (v.colorSpace === 'oklch') return `oklch(${v.components.join(' ')}${alpha})`
  if (a < 1) return `rgb(${v.components.map((c) => Math.round(c * 255)).join(' ')}${alpha})`
  return v.hex ?? toSrgb(v).hex
}

function toSrgb(v) {
  const c = new Color(v.colorSpace, v.components, v.alpha ?? 1).to('srgb').toGamut()
  const [r, g, b] = c.coords.map((x) => Math.min(1, Math.max(0, x)))
  const hex2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
  const a = c.alpha ?? 1
  return { r: round(r), g: round(g), b: round(b), a: round(a), hex: `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a) : ''}` }
}

function dimCss(v, { px = false } = {}) {
  if (v.unit === 'px') return px ? `${v.value}px` : rem(v.value)
  return `${v.value}${v.unit}`
}

function toCss(type, original, resolved, opts) {
  if (isRef(original)) return cssVar(refPath(original))
  switch (type) {
    case 'color':
      return colorCss(resolved)
    case 'dimension':
      return dimCss(resolved, opts)
    case 'fontFamily':
      return resolved.map((f) => (GENERIC_FONTS.has(f) ? f : `'${f}'`)).join(', ')
    case 'fontWeight':
    case 'number':
      return String(resolved)
    case 'duration':
      return `${resolved.value}${resolved.unit}`
    case 'cubicBezier':
      return `cubic-bezier(${resolved.join(', ')})`
    case 'shadow':
      return resolved
        .map((s, i) =>
          [
            ...['offsetX', 'offsetY', 'blur', 'spread'].map((k) => dimCss(s[k], { px: true })),
            toCss('color', original[i]?.color, s.color),
          ].join(' '),
        )
        .join(', ')
    default:
      throw new Error(`No CSS formatter for $type "${type}"`)
  }
}

const decl = (tok, opts) => `  --${cssName(tok.path)}: ${toCss(tok.$type, tok.original.$value, tok.$value, opts)};`
const is = (group) => (tok) => tok.path[0] === group

// ---------- load ----------
const base = await load([...PRIMITIVES, t('semantic/color.light.tokens.json'), t('semantic/typography.tokens.json'), t('semantic/layout.mobile.tokens.json')])
const dark = (await load([t('semantic/color.dark.tokens.json')], PRIMITIVES)).filter((tok) => tok.isSource)
const desktop = (await load([t('semantic/layout.desktop.tokens.json')], PRIMITIVES)).filter((tok) => tok.isSource)

// Classify by path and $type, not filePath: Style Dictionary reports the wrong file for
// tokens that share a group across files (text.xs lives in primitives, text.heading-xl in semantic).
const semanticColorNames = new Set(dark.map((tok) => tok.name))
const SCALE_GROUPS = new Set(['font', 'font-weight', 'text', 'leading', 'tracking', 'radius', 'spacing', 'shadow', 'duration', 'ease'])
const primitiveColors = base.filter((tok) => tok.path[0] === 'color' && !semanticColorNames.has(tok.name))
const light = base.filter((tok) => tok.path[0] === 'color' && semanticColorNames.has(tok.name))
const scales = base.filter((tok) => SCALE_GROUPS.has(tok.path[0]) && tok.$type !== 'typography')
const textStyles = base.filter((tok) => tok.$type === 'typography')
const mobile = base.filter((tok) => tok.path[0] === 'layout')

// ---------- CSS ----------
const EXT = 'dev.portfolio-ds'

// typography.heading-xl → Tailwind's --text-* namespace (utility class text-heading-xl)
const textStyleName = (tok) => tok.path.slice(1).join('-')

function textStyleDecls(tok) {
  const name = `text-${textStyleName(tok)}`
  const o = tok.original.$value
  const r = tok.$value
  const ext = tok.$extensions?.[EXT] ?? {}
  return [
    `  --${name}: ${ext.cssFontSize ?? toCss('dimension', o.fontSize, r.fontSize)};`,
    `  --${name}--line-height: ${toCss('number', o.lineHeight, r.lineHeight)};`,
    `  --${name}--font-weight: ${toCss('fontWeight', o.fontWeight, r.fontWeight)};`,
    `  --${name}--letter-spacing: ${toCss('dimension', o.letterSpacing, r.letterSpacing)};`,
  ].join('\n')
}

const themeScales = scales.filter((tok) => !(tok.path[0] === 'spacing' && tok.path[1] !== 'base') && !['duration'].includes(tok.path[0]))
const durations = scales.filter(is('duration'))

const css = `/*
 * Generated by scripts/build-tokens.mjs from /tokens. Do not edit by hand — run \`npm run tokens\`.
 */

/* Tier 1 + 2 scales → Tailwind theme (static: always emitted, so Figma code syntax always resolves) */
@theme static {
${themeScales.map((tok) => decl(tok, { px: tok.path[0] === 'shadow' })).join('\n')}

  /* Text styles: one class sets size, line-height, weight and tracking (e.g. text-heading-xl) */
${textStyles.map(textStyleDecls).join('\n')}
}

/* Semantic colors → Tailwind color utilities. The default palette is removed on purpose:
   components can only use design-system colors. */
@theme inline {
  --color-*: initial;
  --color-white: var(--neutral-0);
  --color-black: var(--black);
${light.map((tok) => `  --color-${cssName(tok.path)}: var(--${cssName(tok.path)});`).join('\n')}
}

:root {
  /* Tier 1 — primitive colors (do not use in components) */
${primitiveColors.map((tok) => decl(tok)).join('\n')}

  /* Tier 1 — motion */
${durations.map((tok) => decl(tok)).join('\n')}

  /* shadcn/ui compatibility: generated components read --radius */
  --radius: var(--radius-lg);

  /* Tier 2 — semantic colors, light */
${light.map((tok) => decl(tok)).join('\n')}

  /* Tier 2 — layout, mobile first */
${mobile.map((tok) => decl(tok)).join('\n')}
}

@media (width >= 40rem) {
  :root {
${desktop
  .filter((tok) => toCss(tok.$type, tok.original.$value, tok.$value) !== toCss(tok.$type, mobile.find((m) => m.name === tok.name).original.$value, mobile.find((m) => m.name === tok.name).$value))
  .map((tok) => '  ' + decl(tok))
  .join('\n')}
  }
}

.dark {
${dark.map((tok) => decl(tok)).join('\n')}
}
`

// ---------- Figma ----------
const WEIGHT_STYLE = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold' }
const px = (d) => (d.unit === 'px' ? d.value : d.unit === 'rem' ? d.value * 16 : d.value)
const figmaAlias = (original) => (isRef(original) ? `{${stripColor(refPath(original)).join('.')}}` : null)
const codeSyntax = (tok) => `var(--${cssName(tok.path)})`

const figma = {
  $generated: 'scripts/build-tokens.mjs — do not edit',
  collections: [
    {
      name: 'Primitives',
      modes: ['Value'],
      variables: primitiveColors.map((tok) => ({
        name: figmaName(tok.path),
        type: 'COLOR',
        css: codeSyntax(tok),
        description: tok.$description ?? '',
        values: { Value: toSrgb(tok.$value) },
      })),
    },
    {
      name: 'Color',
      modes: ['Light', 'Dark'],
      variables: light.map((tok) => {
        const d = dark.find((x) => x.name === tok.name)
        return {
          name: figmaName(tok.path),
          type: 'COLOR',
          css: codeSyntax(tok),
          description: tok.$description ?? '',
          values: { Light: figmaAlias(tok.original.$value), Dark: figmaAlias(d.original.$value) },
        }
      }),
    },
    {
      name: 'Scale',
      modes: ['Value'],
      variables: scales
        .filter((tok) => ['radius', 'spacing'].includes(tok.path[0]) && tok.path[1] !== 'base')
        .map((tok) => ({ name: figmaName(tok.path), type: 'FLOAT', css: tok.path[0] === 'spacing' ? `calc(var(--spacing) * ${tok.path[1].replace('_', '.')})` : codeSyntax(tok), description: tok.$description ?? '', values: { Value: px(tok.$value) } })),
    },
    {
      name: 'Typography',
      modes: ['Value'],
      variables: [
        ...scales.filter(is('font')).map((tok) => ({ name: figmaName(tok.path), type: 'STRING', css: codeSyntax(tok), values: { Value: tok.$value[0] } })),
        ...scales.filter(is('font-weight')).map((tok) => ({ name: figmaName(tok.path), type: 'FLOAT', css: codeSyntax(tok), values: { Value: tok.$value } })),
        ...scales.filter(is('text')).map((tok) => ({ name: figmaName(tok.path), type: 'FLOAT', css: codeSyntax(tok), values: { Value: px(tok.$value) } })),
      ],
    },
    {
      name: 'Layout',
      modes: ['Mobile', 'Desktop'],
      variables: mobile.map((tok) => ({
        name: figmaName(tok.path),
        type: 'FLOAT',
        css: codeSyntax(tok),
        description: tok.$description ?? '',
        values: { Mobile: px(tok.$value), Desktop: px(desktop.find((x) => x.name === tok.name).$value) },
      })),
    },
  ],
  textStyles: textStyles.map((tok) => {
    const r = tok.$value
    const o = tok.original.$value
    const size = px(r.fontSize)
    const ext = tok.$extensions?.[EXT] ?? {}
    return {
      name: tok.path.slice(1).join('-'),
      description: tok.$description ?? '',
      css: `text-${tok.path.slice(1).join('-')}`,
      fontFamily: r.fontFamily[0],
      fontStyle: WEIGHT_STYLE[r.fontWeight],
      fontSize: size,
      lineHeightPx: round(size * r.lineHeight, 2),
      letterSpacingPercent: round(r.letterSpacing.value * 100, 2),
      textCase: ext.textCase === 'uppercase' ? 'UPPER' : 'ORIGINAL',
      bind: {
        fontFamily: figmaName(refPath(o.fontFamily)),
        fontSize: isRef(o.fontSize) ? figmaName(refPath(o.fontSize)) : null,
        fontWeight: figmaName(refPath(o.fontWeight)),
      },
    }
  }),
  effectStyles: scales.filter(is('shadow')).map((tok) => ({
    name: `shadow-${tok.path[1]}`,
    css: `shadow-${tok.path[1]}`,
    effects: tok.$value.map((s) => ({
      type: 'DROP_SHADOW',
      color: toSrgb(s.color),
      offset: { x: px(s.offsetX), y: px(s.offsetY) },
      radius: px(s.blur),
      spread: px(s.spread),
    })),
  })),
}

// ---------- flat list for Storybook ----------
const docs = [
  ...[...primitiveColors, ...scales].map((tok) => ({ tier: 'primitive', type: tok.$type, name: tok.path.join('.'), css: `--${cssName(tok.path)}`, figma: figmaName(tok.path), value: toCss(tok.$type, tok.original.$value, tok.$value, { px: tok.path[0] === 'shadow' }), description: tok.$description ?? '' })),
  ...light.map((tok) => {
    const d = dark.find((x) => x.name === tok.name)
    return { tier: 'semantic', type: 'color', name: tok.path.join('.'), css: `--${cssName(tok.path)}`, tailwind: `bg-${cssName(tok.path)} / text-${cssName(tok.path)}`, figma: figmaName(tok.path), value: toCss('color', tok.original.$value, tok.$value), dark: toCss('color', d.original.$value, d.$value), description: tok.$description ?? '' }
  }),
  ...textStyles.map((tok) => ({ tier: 'semantic', type: 'typography', name: tok.path.join('.'), css: `--text-${textStyleName(tok)}`, tailwind: `text-${tok.path.slice(1).join('-')}`, figma: tok.path.slice(1).join('-'), value: figma.textStyles.find((s) => s.name === tok.path.slice(1).join('-')), description: tok.$description ?? '' })),
  ...mobile.map((tok) => ({ tier: 'semantic', type: 'dimension', name: tok.path.join('.'), css: `--${cssName(tok.path)}`, figma: figmaName(tok.path), value: toCss(tok.$type, tok.original.$value, tok.$value), desktop: toCss('dimension', null, desktop.find((x) => x.name === tok.name).$value), description: tok.$description ?? '' })),
]

await mkdir(path.join(root, 'src/styles'), { recursive: true })
await mkdir(path.join(root, 'tokens/build'), { recursive: true })
await writeFile(path.join(root, 'src/styles/tokens.css'), css)
await writeFile(path.join(root, 'tokens/build/figma.json'), JSON.stringify(figma, null, 2) + '\n')
await writeFile(path.join(root, 'tokens/build/tokens.json'), JSON.stringify(docs, null, 2) + '\n')

console.log(`tokens: ${primitiveColors.length} primitive colors, ${scales.length} scale tokens, ${light.length} semantic colors ×2 modes, ${textStyles.length} text styles, ${mobile.length} layout tokens ×2 modes`)
