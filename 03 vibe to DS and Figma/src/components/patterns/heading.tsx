import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

const headingVariants = cva('', {
  variants: {
    size: {
      display: 'text-display uppercase',
      '2xl': 'text-heading-2xl',
      xl: 'text-heading-xl',
      lg: 'text-heading-lg',
      md: 'text-heading-md',
      sm: 'text-heading-sm',
      /** Section headings: heading-xl on mobile, heading-2xl from 640px. */
      section: 'text-heading-xl sm:text-heading-2xl',
      /** Project titles: heading-xl, heading-2xl from 1024px. */
      title: 'text-heading-xl lg:text-heading-2xl',
    },
  },
  defaultVariants: { size: 'section' },
})

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * A heading. `as` sets the level in the document outline, `size` sets the look.
 * Keep them independent so the outline stays correct when the design wants a smaller or larger heading.
 */
function Heading({
  as: Tag = 'h2',
  size = 'section',
  asChild = false,
  className,
  ...props
}: React.ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & {
    /** Heading level. Defaults to h2. */
    as?: HeadingLevel
    /** Render the child element instead (e.g. a Radix DialogTitle). */
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : Tag

  return <Comp data-slot="heading" data-size={size} className={cn(headingVariants({ size }), className)} {...props} />
}

export { Heading, headingVariants }
