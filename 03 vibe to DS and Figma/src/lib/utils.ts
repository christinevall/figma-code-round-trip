import { createCn } from 'cn/config'

/** Text styles from tokens/semantic/typography.tokens.json (plus the display clamp bounds). */
const TEXT_STYLES = [
  'display',
  'display-sm',
  'display-min',
  'display-max',
  'heading-2xl',
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'body-xl',
  'body-lg',
  'body-sm',
  'prose-md',
  'prose-sm',
  'label-md',
  'label-strong',
  'caption',
  'caption-strong',
]

/**
 * clsx + tailwind-merge (via the `cn` package), taught about our text styles.
 * A text style owns size, line-height, weight and tracking, so a later `text-heading-xl`
 * removes earlier `text-base leading-none font-medium`. Explicit weight/leading classes
 * placed after it still win.
 */
export const cn = createCn({
  extend: {
    classGroups: { 'text-style': [{ text: TEXT_STYLES }] },
    conflictingClassGroups: {
      'text-style': ['font-size', 'font-weight', 'leading', 'tracking'],
      'font-size': ['text-style'],
    },
  },
})
