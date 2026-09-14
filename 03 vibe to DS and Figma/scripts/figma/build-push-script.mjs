/**
 * Writes tokens/build/figma-push.js: the Figma plugin script from push-tokens.figma.js
 * with tokens/build/figma.json inlined. Run `npm run figma:tokens`, then ask Claude
 * (figma-console MCP) to run tokens/build/figma-push.js in the Figma file.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const template = await readFile(path.join(root, 'scripts/figma/push-tokens.figma.js'), 'utf8')
const data = JSON.parse(await readFile(path.join(root, 'tokens/build/figma.json'), 'utf8'))

// Hex strings are for people reading the JSON; Figma only needs r/g/b/a.
const compact = JSON.stringify(data, (key, value) => (key === 'hex' || key === '$generated' ? undefined : value))
const out = path.join(root, 'tokens/build/figma-push.js')
await writeFile(out, template.replace('__DATA__', compact))
console.log(`figma: wrote ${path.relative(root, out)} (${Math.round(compact.length / 1024)} KB of token data)`)
