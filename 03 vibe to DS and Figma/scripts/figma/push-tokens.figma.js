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
const DATA = __DATA__

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
