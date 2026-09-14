import { useEffect, useState } from 'react'
import { Heading, Source, Subheading } from '@storybook/addon-docs/blocks'

/** Every whitespace-separated word inside a string literal in the source. Non-classes simply match no rule. */
function classesIn(source: string) {
  const found = new Set<string>()
  for (const [, literal] of source.matchAll(/["'`]([^"'`]*)["'`]/g)) {
    for (const word of literal.split(/\s+/)) if (word && word.length < 200) found.add(word)
  }
  return found
}

interface Result {
  css: string
  tokens: { name: string; value: string }[]
}

/** Reads the live stylesheet and returns the rules whose leading class selector is used by the component. */
function collect(classes: Set<string>): Result {
  const wanted = new Set([...classes].map((c) => `.${CSS.escape(c)}`))
  const blocks: string[] = []

  const visit = (rules: CSSRuleList, wrap: (css: string) => string) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        const hit = rule.selectorText.split(',').some((part) => {
          const lead = part.trim().match(/^\.(?:\\.|[^\s:>+~.[,()\\])+/)?.[0]
          return lead !== undefined && wanted.has(lead)
        })
        if (hit) blocks.push(wrap(rule.cssText))
      } else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
        const at = rule instanceof CSSMediaRule ? `@media ${rule.conditionText}` : `@supports ${rule.conditionText}`
        visit(rule.cssRules, (css) => wrap(`${at} {\n  ${css.replaceAll('\n', '\n  ')}\n}`))
      } else if ('cssRules' in rule) {
        visit((rule as CSSGroupingRule).cssRules, wrap)
      }
    }
  }

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      visit(sheet.cssRules, (css) => css)
    } catch {
      // cross-origin sheet, skip
    }
  }

  const css = [...new Set(blocks)].join('\n\n')
  const root = getComputedStyle(document.documentElement)
  const names = [...new Set([...css.matchAll(/var\(--([\w-]+)/g)].map((m) => m[1]))].filter((n) => !n.startsWith('tw-')).sort()
  return { css, tokens: names.map((name) => ({ name: `--${name}`, value: root.getPropertyValue(`--${name}`).trim() })) }
}

export function ComponentCss({ source }: { source: string }) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setResult(collect(classesIn(source))))
    return () => cancelAnimationFrame(frame)
  }, [source])

  if (!result) return null

  return (
    <>
      <Heading>CSS</Heading>
      <p>
        The CSS Tailwind generated for the classes in this component, read live from the loaded stylesheet. Switch the
        theme in the toolbar to see dark-mode values.
      </p>
      <Subheading>Design tokens used</Subheading>
      <table>
        <thead>
          <tr>
            <th>Custom property</th>
            <th>Current value</th>
          </tr>
        </thead>
        <tbody>
          {result.tokens.map((t) => (
            <tr key={t.name}>
              <td>
                <code>{t.name}</code>
              </td>
              <td>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  {/^(oklch|rgb|#)/.test(t.value) && (
                    <span style={{ width: 14, height: 14, borderRadius: 3, background: t.value, boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.15)' }} />
                  )}
                  <code>{t.value || '—'}</code>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Subheading>Generated rules</Subheading>
      <Source code={result.css || '/* no matching rules found */'} language="css" dark />
    </>
  )
}
