import type { CSSProperties, ReactNode } from 'react'
import tokens from '../../tokens/build/tokens.json'

interface Token {
  tier: 'primitive' | 'semantic'
  type: string
  name: string
  css: string
  figma: string
  tailwind?: string
  value: unknown
  dark?: string
  desktop?: string
  description: string
}

const all = tokens as Token[]

const cell: CSSProperties = { padding: '8px 12px', borderBottom: '1px solid rgb(0 0 0 / 0.08)', verticalAlign: 'middle', textAlign: 'left' }
const code = (s?: string) => (s ? <code style={{ fontSize: 12 }}>{s}</code> : null)

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} style={{ ...cell, fontWeight: 600 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const swatch = (background: string): CSSProperties => ({
  display: 'inline-block',
  width: 40,
  height: 28,
  borderRadius: 6,
  background,
  boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.12)',
})

/** Semantic colors with a light and a dark swatch. The dark swatch sits inside `.dark`, so it resolves the real dark value. */
export function SemanticColors() {
  return (
    <Table head={['Light', 'Dark', 'Name (Figma)', 'CSS / Tailwind', 'Light → Dark', 'Use']}>
      {all
        .filter((t) => t.tier === 'semantic' && t.type === 'color')
        .map((t) => (
          <tr key={t.name}>
            <td style={cell}>
              <span style={swatch(`var(${t.css})`)} />
            </td>
            <td style={cell}>
              <span className="dark" style={{ display: 'inline-block' }}>
                <span style={swatch(`var(${t.css})`)} />
              </span>
            </td>
            <td style={cell}>{code(t.figma)}</td>
            <td style={cell}>
              {code(t.css)}
              <br />
              {code(t.tailwind)}
            </td>
            <td style={cell}>
              {code(String(t.value))}
              <br />
              {code(t.dark)}
            </td>
            <td style={cell}>{t.description}</td>
          </tr>
        ))}
    </Table>
  )
}

export function PrimitiveColors() {
  return (
    <Table head={['', 'Name (Figma)', 'CSS', 'Value']}>
      {all
        .filter((t) => t.tier === 'primitive' && t.type === 'color')
        .map((t) => (
          <tr key={t.name}>
            <td style={cell}>
              <span style={swatch(`var(${t.css})`)} />
            </td>
            <td style={cell}>{code(t.figma)}</td>
            <td style={cell}>{code(t.css)}</td>
            <td style={cell}>{code(String(t.value))}</td>
          </tr>
        ))}
    </Table>
  )
}

interface TextStyleValue {
  fontSize: number
  lineHeightPx: number
  fontStyle: string
  letterSpacingPercent: number
  textCase: string
}

export function TextStyles() {
  return (
    <Table head={['Sample', 'Name (Figma text style)', 'Tailwind', 'Size / line / weight / tracking', 'Use']}>
      {all
        .filter((t) => t.type === 'typography')
        .map((t) => {
          const v = t.value as TextStyleValue
          return (
            <tr key={t.name}>
              <td style={{ ...cell, maxWidth: 420 }}>
                <span className={`${t.tailwind} ${v.textCase === 'UPPER' ? 'uppercase' : ''}`} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.figma.startsWith('display') ? 'UX. UI.' : 'Alpine Tracker'}
                </span>
              </td>
              <td style={cell}>{code(t.figma)}</td>
              <td style={cell}>{code(t.tailwind)}</td>
              <td style={cell}>
                {code(`${v.fontSize}px / ${v.lineHeightPx}px / ${v.fontStyle} / ${v.letterSpacingPercent}%`)}
              </td>
              <td style={cell}>{t.description}</td>
            </tr>
          )
        })}
    </Table>
  )
}

export function ScaleTokens({ group }: { group: 'spacing' | 'radius' | 'shadow' | 'text' | 'font-weight' | 'leading' | 'tracking' | 'duration' | 'ease' | 'layout' }) {
  const list = all.filter((t) => t.name.split('.')[0] === group && !(group === 'spacing' && t.name === 'spacing.base'))
  return (
    <Table head={['Preview', 'Name (Figma)', 'CSS', 'Value', 'Note']}>
      {list.map((t) => (
        <tr key={t.name}>
          <td style={{ ...cell, width: 180 }}>
            {group === 'spacing' && <span style={{ display: 'inline-block', height: 12, width: `calc(var(--spacing) * ${t.figma.split('/')[1].replace('_', '.')})`, background: 'var(--brand)' }} />}
            {group === 'radius' && <span style={{ ...swatch('var(--muted)'), width: 56, height: 40, borderRadius: `var(${t.css})` }} />}
            {group === 'shadow' && <span style={{ ...swatch('var(--background)'), width: 72, height: 40, boxShadow: `var(${t.css})` }} />}
          </td>
          <td style={cell}>{code(t.figma)}</td>
          <td style={cell}>{code(group === 'spacing' ? `p-${t.figma.split('/')[1].replace('_', '.')}` : t.css)}</td>
          <td style={cell}>
            {code(String(t.value))}
            {t.desktop && (
              <>
                {' → '}
                {code(t.desktop)}
                {' from 640px'}
              </>
            )}
          </td>
          <td style={cell}>{t.description}</td>
        </tr>
      ))}
    </Table>
  )
}
