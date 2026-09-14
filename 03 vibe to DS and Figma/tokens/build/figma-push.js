/**
 * Figma plugin script: push tokens/build/figma.json into the open Figma file.
 * Do not run this file directly. `npm run figma:tokens` inlines the JSON and writes
 * tokens/build/figma-push.js, which is run in Figma through the figma-console MCP
 * (figma_execute) or any "run plugin code" tool.
 *
 * Idempotent upsert by name: creates what is missing, updates values, aliases, scopes,
 * code syntax and descriptions of what exists. Never deletes. Anything in Figma that is
 * not in the JSON is reported as `extra` so a person can decide.
 */
const DATA = {"collections":[{"name":"Primitives","modes":["Value"],"variables":[{"name":"neutral/0","type":"COLOR","css":"var(--neutral-0)","description":"","values":{"Value":{"r":1,"g":1,"b":1,"a":1}}},{"name":"neutral/50","type":"COLOR","css":"var(--neutral-50)","description":"","values":{"Value":{"r":0.980256,"g":0.980256,"b":0.980256,"a":1}}},{"name":"neutral/100","type":"COLOR","css":"var(--neutral-100)","description":"","values":{"Value":{"r":0.960587,"g":0.960587,"b":0.960587,"a":1}}},{"name":"neutral/200","type":"COLOR","css":"var(--neutral-200)","description":"","values":{"Value":{"r":0.898161,"g":0.898161,"b":0.898161,"a":1}}},{"name":"neutral/300","type":"COLOR","css":"var(--neutral-300)","description":"","values":{"Value":{"r":0.831444,"g":0.831444,"b":0.831444,"a":1}}},{"name":"neutral/400","type":"COLOR","css":"var(--neutral-400)","description":"","values":{"Value":{"r":0.630163,"g":0.630163,"b":0.630163,"a":1}}},{"name":"neutral/500","type":"COLOR","css":"var(--neutral-500)","description":"","values":{"Value":{"r":0.451519,"g":0.451519,"b":0.451519,"a":1}}},{"name":"neutral/600","type":"COLOR","css":"var(--neutral-600)","description":"","values":{"Value":{"r":0.321993,"g":0.321993,"b":0.321993,"a":1}}},{"name":"neutral/700","type":"COLOR","css":"var(--neutral-700)","description":"","values":{"Value":{"r":0.250471,"g":0.250471,"b":0.250471,"a":1}}},{"name":"neutral/800","type":"COLOR","css":"var(--neutral-800)","description":"","values":{"Value":{"r":0.149382,"g":0.149382,"b":0.149382,"a":1}}},{"name":"neutral/900","type":"COLOR","css":"var(--neutral-900)","description":"","values":{"Value":{"r":0.090527,"g":0.090527,"b":0.090527,"a":1}}},{"name":"neutral/925","type":"COLOR","css":"var(--neutral-925)","description":"Only used by the dark-mode shaded section.","values":{"Value":{"r":0.073002,"g":0.073002,"b":0.073002,"a":1}}},{"name":"neutral/950","type":"COLOR","css":"var(--neutral-950)","description":"","values":{"Value":{"r":0.039388,"g":0.039388,"b":0.039388,"a":1}}},{"name":"neutral/975","type":"COLOR","css":"var(--neutral-975)","description":"Only used by the dark-mode footer.","values":{"Value":{"r":0.01292,"g":0.01292,"b":0.01292,"a":1}}},{"name":"black","type":"COLOR","css":"var(--black)","description":"","values":{"Value":{"r":0,"g":0,"b":0,"a":1}}},{"name":"orange/500","type":"COLOR","css":"var(--orange-500)","description":"The brand orange from the original app (#ff6431).","values":{"Value":{"r":1,"g":0.3922,"b":0.1922,"a":1}}},{"name":"red/400","type":"COLOR","css":"var(--red-400)","description":"","values":{"Value":{"r":1,"g":0.391153,"b":0.403857,"a":1}}},{"name":"red/600","type":"COLOR","css":"var(--red-600)","description":"","values":{"Value":{"r":0.906458,"g":0,"b":0.042215,"a":1}}},{"name":"neutral-950-alpha/25","type":"COLOR","css":"var(--neutral-950-alpha-25)","description":"","values":{"Value":{"r":0.039388,"g":0.039388,"b":0.039388,"a":0.25}}},{"name":"neutral-950-alpha/80","type":"COLOR","css":"var(--neutral-950-alpha-80)","description":"","values":{"Value":{"r":0.039388,"g":0.039388,"b":0.039388,"a":0.8}}},{"name":"neutral-50-alpha/25","type":"COLOR","css":"var(--neutral-50-alpha-25)","description":"","values":{"Value":{"r":0.980256,"g":0.980256,"b":0.980256,"a":0.25}}},{"name":"neutral-50-alpha/80","type":"COLOR","css":"var(--neutral-50-alpha-80)","description":"","values":{"Value":{"r":0.980256,"g":0.980256,"b":0.980256,"a":0.8}}},{"name":"white-alpha/10","type":"COLOR","css":"var(--white-alpha-10)","description":"","values":{"Value":{"r":1,"g":1,"b":1,"a":0.1}}},{"name":"white-alpha/15","type":"COLOR","css":"var(--white-alpha-15)","description":"","values":{"Value":{"r":1,"g":1,"b":1,"a":0.15}}},{"name":"black-alpha/10","type":"COLOR","css":"var(--black-alpha-10)","description":"","values":{"Value":{"r":0,"g":0,"b":0,"a":0.1}}}]},{"name":"Color","modes":["Light","Dark"],"variables":[{"name":"background","type":"COLOR","css":"var(--background)","description":"Page background.","values":{"Light":"{neutral.0}","Dark":"{neutral.950}"}},{"name":"foreground","type":"COLOR","css":"var(--foreground)","description":"Default text and icons on background.","values":{"Light":"{neutral.950}","Dark":"{neutral.50}"}},{"name":"card","type":"COLOR","css":"var(--card)","description":"Card surface.","values":{"Light":"{neutral.0}","Dark":"{neutral.900}"}},{"name":"card-foreground","type":"COLOR","css":"var(--card-foreground)","description":"Text on card.","values":{"Light":"{neutral.950}","Dark":"{neutral.50}"}},{"name":"popover","type":"COLOR","css":"var(--popover)","description":"Dialogs, sheets, command menu, toasts.","values":{"Light":"{neutral.0}","Dark":"{neutral.900}"}},{"name":"popover-foreground","type":"COLOR","css":"var(--popover-foreground)","description":"Text on popover.","values":{"Light":"{neutral.950}","Dark":"{neutral.50}"}},{"name":"primary","type":"COLOR","css":"var(--primary)","description":"Primary action background (contact button).","values":{"Light":"{neutral.900}","Dark":"{neutral.200}"}},{"name":"primary-foreground","type":"COLOR","css":"var(--primary-foreground)","description":"Text on primary.","values":{"Light":"{neutral.50}","Dark":"{neutral.900}"}},{"name":"secondary","type":"COLOR","css":"var(--secondary)","description":"Secondary action background.","values":{"Light":"{neutral.100}","Dark":"{neutral.800}"}},{"name":"secondary-foreground","type":"COLOR","css":"var(--secondary-foreground)","description":"Text on secondary.","values":{"Light":"{neutral.900}","Dark":"{neutral.50}"}},{"name":"muted","type":"COLOR","css":"var(--muted)","description":"Subtle fills: hover backgrounds, tab list, image placeholders.","values":{"Light":"{neutral.100}","Dark":"{neutral.800}"}},{"name":"muted-foreground","type":"COLOR","css":"var(--muted-foreground)","description":"Secondary text: meta, hints, placeholders.","values":{"Light":"{neutral.500}","Dark":"{neutral.400}"}},{"name":"destructive","type":"COLOR","css":"var(--destructive)","description":"Errors and destructive actions.","values":{"Light":"{red.600}","Dark":"{red.400}"}},{"name":"border","type":"COLOR","css":"var(--border)","description":"Default hairline borders and separators.","values":{"Light":"{neutral.200}","Dark":"{white-alpha.10}"}},{"name":"border-strong","type":"COLOR","css":"var(--border-strong)","description":"Stronger rule above skill items; hover border on the status pill.","values":{"Light":"{neutral-950-alpha.25}","Dark":"{neutral-50-alpha.25}"}},{"name":"input","type":"COLOR","css":"var(--input)","description":"Form control borders.","values":{"Light":"{neutral.200}","Dark":"{white-alpha.15}"}},{"name":"ring","type":"COLOR","css":"var(--ring)","description":"Focus ring (used at 50% opacity).","values":{"Light":"{neutral.400}","Dark":"{neutral.500}"}},{"name":"prose","type":"COLOR","css":"var(--prose)","description":"Long-form body copy. Slightly softer than foreground.","values":{"Light":"{neutral-950-alpha.80}","Dark":"{neutral-50-alpha.80}"}},{"name":"brand","type":"COLOR","css":"var(--brand)","description":"Brand accent: logo mark, active nav underline, scroll progress, highlight checks.","values":{"Light":"{orange.500}","Dark":"{orange.500}"}},{"name":"brand-foreground","type":"COLOR","css":"var(--brand-foreground)","description":"Text on brand. Warning: white on #ff6431 is 2.9:1, below WCAG AA for small text.","values":{"Light":"{neutral.0}","Dark":"{neutral.0}"}},{"name":"section","type":"COLOR","css":"var(--section)","description":"Alternating shaded page band (every second project row).","values":{"Light":"{neutral.100}","Dark":"{neutral.925}"}},{"name":"footer","type":"COLOR","css":"var(--footer)","description":"Footer band.","values":{"Light":"{neutral.900}","Dark":"{neutral.975}"}},{"name":"footer-foreground","type":"COLOR","css":"var(--footer-foreground)","description":"Text on footer.","values":{"Light":"{neutral.0}","Dark":"{neutral.0}"}}]},{"name":"Scale","modes":["Value"],"variables":[{"name":"radius/sm","type":"FLOAT","css":"var(--radius-sm)","description":"","values":{"Value":4}},{"name":"radius/md","type":"FLOAT","css":"var(--radius-md)","description":"","values":{"Value":6}},{"name":"radius/lg","type":"FLOAT","css":"var(--radius-lg)","description":"","values":{"Value":8}},{"name":"radius/xl","type":"FLOAT","css":"var(--radius-xl)","description":"","values":{"Value":12}},{"name":"radius/2xl","type":"FLOAT","css":"var(--radius-2xl)","description":"","values":{"Value":16}},{"name":"radius/3xl","type":"FLOAT","css":"var(--radius-3xl)","description":"","values":{"Value":20}},{"name":"radius/4xl","type":"FLOAT","css":"var(--radius-4xl)","description":"","values":{"Value":24}},{"name":"spacing/1","type":"FLOAT","css":"calc(var(--spacing) * 1)","description":"","values":{"Value":4}},{"name":"spacing/2","type":"FLOAT","css":"calc(var(--spacing) * 2)","description":"","values":{"Value":8}},{"name":"spacing/3","type":"FLOAT","css":"calc(var(--spacing) * 3)","description":"","values":{"Value":12}},{"name":"spacing/4","type":"FLOAT","css":"calc(var(--spacing) * 4)","description":"","values":{"Value":16}},{"name":"spacing/5","type":"FLOAT","css":"calc(var(--spacing) * 5)","description":"","values":{"Value":20}},{"name":"spacing/6","type":"FLOAT","css":"calc(var(--spacing) * 6)","description":"","values":{"Value":24}},{"name":"spacing/7","type":"FLOAT","css":"calc(var(--spacing) * 7)","description":"","values":{"Value":28}},{"name":"spacing/8","type":"FLOAT","css":"calc(var(--spacing) * 8)","description":"","values":{"Value":32}},{"name":"spacing/10","type":"FLOAT","css":"calc(var(--spacing) * 10)","description":"","values":{"Value":40}},{"name":"spacing/12","type":"FLOAT","css":"calc(var(--spacing) * 12)","description":"","values":{"Value":48}},{"name":"spacing/14","type":"FLOAT","css":"calc(var(--spacing) * 14)","description":"","values":{"Value":56}},{"name":"spacing/16","type":"FLOAT","css":"calc(var(--spacing) * 16)","description":"","values":{"Value":64}},{"name":"spacing/20","type":"FLOAT","css":"calc(var(--spacing) * 20)","description":"","values":{"Value":80}},{"name":"spacing/24","type":"FLOAT","css":"calc(var(--spacing) * 24)","description":"","values":{"Value":96}},{"name":"spacing/0_5","type":"FLOAT","css":"calc(var(--spacing) * 0.5)","description":"","values":{"Value":2}},{"name":"spacing/1_5","type":"FLOAT","css":"calc(var(--spacing) * 1.5)","description":"","values":{"Value":6}},{"name":"spacing/2_5","type":"FLOAT","css":"calc(var(--spacing) * 2.5)","description":"","values":{"Value":10}}]},{"name":"Typography","modes":["Value"],"variables":[{"name":"font/sans","type":"STRING","css":"var(--font-sans)","values":{"Value":"Poppins"}},{"name":"font-weight/normal","type":"FLOAT","css":"var(--font-weight-normal)","values":{"Value":400}},{"name":"font-weight/medium","type":"FLOAT","css":"var(--font-weight-medium)","values":{"Value":500}},{"name":"font-weight/semibold","type":"FLOAT","css":"var(--font-weight-semibold)","values":{"Value":600}},{"name":"font-weight/bold","type":"FLOAT","css":"var(--font-weight-bold)","values":{"Value":700}},{"name":"font-weight/extrabold","type":"FLOAT","css":"var(--font-weight-extrabold)","values":{"Value":800}},{"name":"text/xs","type":"FLOAT","css":"var(--text-xs)","values":{"Value":12}},{"name":"text/sm","type":"FLOAT","css":"var(--text-sm)","values":{"Value":14}},{"name":"text/base","type":"FLOAT","css":"var(--text-base)","values":{"Value":16}},{"name":"text/lg","type":"FLOAT","css":"var(--text-lg)","values":{"Value":18}},{"name":"text/xl","type":"FLOAT","css":"var(--text-xl)","values":{"Value":20}},{"name":"text/2xl","type":"FLOAT","css":"var(--text-2xl)","values":{"Value":24}},{"name":"text/3xl","type":"FLOAT","css":"var(--text-3xl)","values":{"Value":30}},{"name":"text/4xl","type":"FLOAT","css":"var(--text-4xl)","values":{"Value":36}},{"name":"text/display-min","type":"FLOAT","css":"var(--text-display-min)","values":{"Value":41.6}},{"name":"text/display-max","type":"FLOAT","css":"var(--text-display-max)","values":{"Value":84}}]},{"name":"Layout","modes":["Mobile","Desktop"],"variables":[{"name":"layout/container-max","type":"FLOAT","css":"var(--layout-container-max)","description":"Max width of page-container (70rem).","values":{"Mobile":1120,"Desktop":1120}},{"name":"layout/gutter","type":"FLOAT","css":"var(--layout-gutter)","description":"Horizontal page padding.","values":{"Mobile":20,"Desktop":24}},{"name":"layout/header-height","type":"FLOAT","css":"var(--layout-header-height)","description":"Sticky header height.","values":{"Mobile":64,"Desktop":80}}]}],"textStyles":[{"name":"display","description":"Hero headline. Fluid: clamp(2.6rem, 9vw, 5.25rem). Uppercase.","css":"text-display","fontFamily":"Poppins","fontStyle":"ExtraBold","fontSize":84,"lineHeightPx":88.2,"letterSpacingPercent":-2.5,"textCase":"UPPER","bind":{"fontFamily":"font/sans","fontSize":"text/display-max","fontWeight":"font-weight/extrabold"}},{"name":"display-sm","description":"Hero headline at its smallest (mobile). Figma only — in CSS the display clamp covers it.","css":"text-display-sm","fontFamily":"Poppins","fontStyle":"ExtraBold","fontSize":41.6,"lineHeightPx":43.68,"letterSpacingPercent":-2.5,"textCase":"UPPER","bind":{"fontFamily":"font/sans","fontSize":"text/display-min","fontWeight":"font-weight/extrabold"}},{"name":"heading-2xl","description":"Section headings ≥640px, project title ≥1024px, project dialog title ≥640px.","css":"text-heading-2xl","fontFamily":"Poppins","fontStyle":"Bold","fontSize":36,"lineHeightPx":40,"letterSpacingPercent":-2.5,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/4xl","fontWeight":"font-weight/bold"}},{"name":"heading-xl","description":"Section headings on mobile, project titles, mobile menu links.","css":"text-heading-xl","fontFamily":"Poppins","fontStyle":"Bold","fontSize":30,"lineHeightPx":36,"letterSpacingPercent":-2.5,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/3xl","fontWeight":"font-weight/bold"}},{"name":"heading-lg","description":"Dialog titles, stat values ≥640px.","css":"text-heading-lg","fontFamily":"Poppins","fontStyle":"Bold","fontSize":24,"lineHeightPx":32,"letterSpacingPercent":-2.5,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/2xl","fontWeight":"font-weight/bold"}},{"name":"heading-md","description":"Stat values on mobile.","css":"text-heading-md","fontFamily":"Poppins","fontStyle":"Bold","fontSize":20,"lineHeightPx":28,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/xl","fontWeight":"font-weight/bold"}},{"name":"heading-sm","description":"Skill titles.","css":"text-heading-sm","fontFamily":"Poppins","fontStyle":"Bold","fontSize":18,"lineHeightPx":28,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/lg","fontWeight":"font-weight/bold"}},{"name":"body-xl","description":"Hero name ≥640px.","css":"text-body-xl","fontFamily":"Poppins","fontStyle":"Regular","fontSize":20,"lineHeightPx":28,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/xl","fontWeight":"font-weight/normal"}},{"name":"body-lg","description":"Hero name on mobile.","css":"text-body-lg","fontFamily":"Poppins","fontStyle":"Regular","fontSize":18,"lineHeightPx":28,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/lg","fontWeight":"font-weight/normal"}},{"name":"body-sm","description":"Single-line UI text: meta lines, footer, list items.","css":"text-body-sm","fontFamily":"Poppins","fontStyle":"Regular","fontSize":14,"lineHeightPx":20,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/sm","fontWeight":"font-weight/normal"}},{"name":"prose-md","description":"Paragraphs: about text, project summaries, dialog lead.","css":"text-prose-md","fontFamily":"Poppins","fontStyle":"Regular","fontSize":16,"lineHeightPx":26,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/base","fontWeight":"font-weight/normal"}},{"name":"prose-sm","description":"Small paragraphs: skill descriptions, case-study body.","css":"text-prose-sm","fontFamily":"Poppins","fontStyle":"Regular","fontSize":14,"lineHeightPx":22.75,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/sm","fontWeight":"font-weight/normal"}},{"name":"label-md","description":"Buttons, tabs, form labels.","css":"text-label-md","fontFamily":"Poppins","fontStyle":"Medium","fontSize":14,"lineHeightPx":20,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/sm","fontWeight":"font-weight/medium"}},{"name":"label-strong","description":"Nav links, large buttons, arrow links, small headings.","css":"text-label-strong","fontFamily":"Poppins","fontStyle":"SemiBold","fontSize":14,"lineHeightPx":20,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/sm","fontWeight":"font-weight/semibold"}},{"name":"caption","description":"Tags, hints, error messages, stat labels.","css":"text-caption","fontFamily":"Poppins","fontStyle":"Regular","fontSize":12,"lineHeightPx":16,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/xs","fontWeight":"font-weight/normal"}},{"name":"caption-strong","description":"Badges, status pill, hover chips.","css":"text-caption-strong","fontFamily":"Poppins","fontStyle":"Medium","fontSize":12,"lineHeightPx":16,"letterSpacingPercent":0,"textCase":"ORIGINAL","bind":{"fontFamily":"font/sans","fontSize":"text/xs","fontWeight":"font-weight/medium"}}],"effectStyles":[{"name":"shadow-sm","css":"shadow-sm","effects":[{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.1},"offset":{"x":0,"y":1},"radius":3,"spread":0},{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.1},"offset":{"x":0,"y":1},"radius":2,"spread":-1}]},{"name":"shadow-lg","css":"shadow-lg","effects":[{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.1},"offset":{"x":0,"y":10},"radius":15,"spread":-3},{"type":"DROP_SHADOW","color":{"r":0,"g":0,"b":0,"a":0.1},"offset":{"x":0,"y":4},"radius":6,"spread":-4}]}]}

// Which pickers a variable shows up in. Primitives are hidden: designers pick semantic tokens.
const FILL = ['FRAME_FILL', 'SHAPE_FILL']
const INK = ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR'] // text and lucide icons (strokes)
function scopesFor(collection, name) {
  if (collection === 'Primitives') return name.startsWith('black-alpha') ? ['EFFECT_COLOR'] : []
  if (collection === 'Color') {
    if (name === 'foreground') return [...FILL, 'TEXT_FILL', 'STROKE_COLOR'] // also bg of tooltip and pressed chip
    if (name === 'background') return [...FILL, 'TEXT_FILL'] // also text on tooltip and pressed chip
    if (name.endsWith('-foreground') || name === 'prose') return INK
    if (name === 'border' || name === 'border-strong') return ['STROKE_COLOR', ...FILL] // separator is a filled 1px box
    if (name === 'input') return ['STROKE_COLOR', ...FILL]
    if (name === 'ring') return ['STROKE_COLOR', 'EFFECT_COLOR'] // focus ring is a box-shadow in code
    if (name === 'brand' || name === 'destructive') return [...FILL, ...INK]
    return FILL
  }
  if (collection === 'Scale') return name.startsWith('radius/') ? ['CORNER_RADIUS'] : ['GAP', 'WIDTH_HEIGHT']
  if (collection === 'Typography') {
    if (name.startsWith('font/')) return ['FONT_FAMILY']
    if (name.startsWith('font-weight/')) return ['FONT_WEIGHT']
    return ['FONT_SIZE']
  }
  if (collection === 'Layout') return name === 'layout/gutter' ? ['GAP'] : ['WIDTH_HEIGHT']
  return []
}

const report = { collections: {}, created: 0, updated: 0, extra: [], warnings: [], textStyles: 0, effectStyles: 0 }

const existingCollections = await figma.variables.getLocalVariableCollectionsAsync()
const existingVars = await figma.variables.getLocalVariablesAsync()
const byKey = new Map() // "Collection::name" -> Variable
const collectionById = new Map(existingCollections.map((c) => [c.id, c]))
for (const v of existingVars) byKey.set(`${collectionById.get(v.variableCollectionId)?.name}::${v.name}`, v)

// Pass 1: collections, modes, variables, literal values. Pass 2: aliases (targets exist by then).
const pending = []
for (const spec of DATA.collections) {
  let coll = existingCollections.find((c) => c.name === spec.name)
  if (!coll) coll = figma.variables.createVariableCollection(spec.name)
  spec.modes.forEach((modeName, i) => {
    if (coll.modes.some((m) => m.name === modeName)) return
    if (i === 0 && coll.modes.length === 1 && !spec.modes.includes(coll.modes[0].name)) coll.renameMode(coll.modes[0].modeId, modeName)
    else coll.addMode(modeName)
  })
  const modeId = Object.fromEntries(coll.modes.map((m) => [m.name, m.modeId]))
  report.collections[spec.name] = { id: coll.id, variables: spec.variables.length }

  const wanted = new Set(spec.variables.map((v) => v.name))
  for (const v of existingVars) if (v.variableCollectionId === coll.id && !wanted.has(v.name)) report.extra.push(`${spec.name}/${v.name}`)

  for (const tok of spec.variables) {
    const key = `${spec.name}::${tok.name}`
    let variable = byKey.get(key)
    if (!variable) {
      variable = figma.variables.createVariable(tok.name, coll, tok.type)
      byKey.set(key, variable)
      report.created++
    } else report.updated++
    variable.description = tok.description ?? ''
    variable.scopes = [...new Set(scopesFor(spec.name, tok.name))]
    variable.setVariableCodeSyntax('WEB', tok.css)
    for (const [mode, value] of Object.entries(tok.values)) {
      if (typeof value === 'string' && /^\{.+\}$/.test(value)) pending.push({ variable, modeId: modeId[mode], ref: value.slice(1, -1).split('.').join('/') })
      else if (tok.type === 'COLOR') variable.setValueForMode(modeId[mode], { r: value.r, g: value.g, b: value.b, a: value.a })
      else variable.setValueForMode(modeId[mode], value)
    }
  }
}
for (const { variable, modeId, ref } of pending) {
  const target = byKey.get(`Primitives::${ref}`)
  if (!target) report.warnings.push(`${variable.name}: alias target ${ref} not found`)
  else variable.setValueForMode(modeId, figma.variables.createVariableAlias(target))
}

// Text styles, with family, size and weight bound to the Typography variables.
// Load every weight once up front: loading fonts is the slow part (~9s for Poppins) and
// figma_execute stops waiting after 30s while the script keeps running. If a run times out,
// check the file before re-running, or the second run can create duplicates.
const fonts = [...new Set(DATA.textStyles.map((s) => JSON.stringify({ family: s.fontFamily, style: s.fontStyle })))]
await Promise.all(fonts.map((f) => figma.loadFontAsync(JSON.parse(f))))
const textStyles = await figma.getLocalTextStylesAsync()
for (const s of DATA.textStyles) {
  const fontName = { family: s.fontFamily, style: s.fontStyle }
  let style = textStyles.find((t) => t.name === s.name)
  if (!style) style = figma.createTextStyle()
  style.name = s.name
  style.description = `${s.description}\nCode: ${s.css}`
  style.fontName = fontName
  style.fontSize = s.fontSize
  style.lineHeight = { value: s.lineHeightPx, unit: 'PIXELS' }
  style.letterSpacing = { value: s.letterSpacingPercent, unit: 'PERCENT' }
  style.textCase = s.textCase
  for (const [field, name] of Object.entries(s.bind)) {
    if (!name) continue
    const v = byKey.get(`Typography::${name}`)
    try {
      if (v) style.setBoundVariable(field, v)
    } catch (e) {
      report.warnings.push(`text style ${s.name}: could not bind ${field} (${e.message})`)
    }
  }
  report.textStyles++
}

// Effect styles, shadow color bound to the primitive it comes from.
const effectStyles = await figma.getLocalEffectStylesAsync()
const shadowColor = byKey.get('Primitives::black-alpha/10')
for (const s of DATA.effectStyles) {
  let style = effectStyles.find((t) => t.name === s.name)
  if (!style) style = figma.createEffectStyle()
  style.name = s.name
  style.description = `Code: ${s.css}`
  style.effects = s.effects.map((e) => {
    const effect = { type: e.type, color: e.color, offset: e.offset, radius: e.radius, spread: e.spread, visible: true, blendMode: 'NORMAL' }
    return shadowColor ? figma.variables.setBoundVariableForEffect(effect, 'color', shadowColor) : effect
  })
  report.effectStyles++
}

return report
