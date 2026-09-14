import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const brandMarkVariants = cva('block shrink-0 rounded-full bg-brand', {
  variants: {
    size: {
      sm: 'size-7',
      md: 'size-9 sm:size-10',
    },
  },
  defaultVariants: { size: 'md' },
})

/** The orange dot logo. Decorative: give the surrounding link or heading the accessible name. */
function BrandMark({ size = 'md', className, ...props }: React.ComponentProps<'span'> & VariantProps<typeof brandMarkVariants>) {
  return <span aria-hidden data-slot="brand-mark" data-size={size} className={cn(brandMarkVariants({ size }), className)} {...props} />
}

export { BrandMark, brandMarkVariants }
