import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      'body-xl': 'text-body-xl',
      'body-lg': 'text-body-lg',
      'body-sm': 'text-body-sm',
      'prose-md': 'text-prose-md',
      'prose-sm': 'text-prose-sm',
      'label-md': 'text-label-md',
      'label-strong': 'text-label-strong',
      caption: 'text-caption',
      'caption-strong': 'text-caption-strong',
    },
    tone: {
      default: '',
      prose: 'text-prose',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: { variant: 'prose-md', tone: 'default' },
})

type TextElement = 'p' | 'span' | 'div' | 'dt' | 'dd' | 'li' | 'legend' | 'address'

/** Body copy, labels and captions. `variant` maps 1:1 to a text style token and a Figma text style. */
function Text({
  as: Tag = 'p',
  variant = 'prose-md',
  tone = 'default',
  className,
  ...props
}: React.ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    /** Element to render. Defaults to p. */
    as?: TextElement
  }) {
  return (
    <Tag
      data-slot="text"
      data-variant={variant}
      className={cn(textVariants({ variant, tone }), className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  )
}

export { Text, textVariants }
