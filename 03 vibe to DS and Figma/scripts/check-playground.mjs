/**
 * Drift guard for src/playground: prototypes may only compose design-system components.
 * Fails on raw colors, arbitrary Tailwind values, inline styles and imports from outside the system.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'src/playground')

const ALLOWED_IMPORTS = [/^react$/, /^lucide-react$/, /^sonner$/, /^next-themes$/, /^@storybook\//, /^@\/components\/(ui|patterns|sections)\//, /^@\/data\//, /^@\/lib\//, /^@\/assets\//, /^\.\//]
const RULES = [
  { name: 'arbitrary Tailwind value', re: /className="[^"]*\w-\[[^\]]+\]/g },
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'inline style', re: /\bstyle=\{\{/g },
  { name: 'Tailwind default palette color', re: /\b(bg|text|border|ring)-(red|blue|green|gray|slate|zinc|neutral|stone|orange|amber|yellow|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g },
]

const problems = []
for (const file of await readdir(dir)) {
  if (!/\.(tsx?|mdx)$/.test(file) || file.endsWith('.mdx')) continue
  const src = await readFile(path.join(dir, file), 'utf8')
  const lines = src.split('\n')
  for (const [, spec] of src.matchAll(/from '([^']+)'/g)) {
    if (!ALLOWED_IMPORTS.some((re) => re.test(spec))) problems.push(`${file}: import from outside the design system: ${spec}`)
  }
  lines.forEach((line, i) => {
    for (const { name, re } of RULES) for (const m of line.matchAll(re)) problems.push(`${file}:${i + 1}: ${name}: ${m[0]}`)
  })
}

if (problems.length) {
  console.error(`playground: ${problems.length} problem(s)\n` + problems.map((p) => `  ${p}`).join('\n'))
  process.exit(1)
}
console.log('playground: only design-system components and layout utilities ✓')
