import type * as React from 'react'
import { cn } from '@/lib/utils'

/** A toggle chip for picking one option from a small set (use several inside a fieldset). */
function ChoiceChip({
  pressed = false,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  /** Selected state. Exposed to assistive tech as aria-pressed. */
  pressed?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      data-slot="choice-chip"
      data-pressed={pressed || undefined}
      className={cn(
        'rounded-full border px-3 py-1.5 text-body-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        pressed ? 'border-foreground bg-foreground text-background' : 'hover:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export { ChoiceChip }
