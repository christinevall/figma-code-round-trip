import type * as React from 'react'
import { cn } from '@/lib/utils'

/** Thin brand bar along the bottom of its (positioned) parent. `value` runs from 0 to 1. */
function ScrollProgress({ value, className, style, ...props }: React.ComponentProps<'div'> & { value: number }) {
  return (
    <div
      aria-hidden
      data-slot="scroll-progress"
      className={cn('absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand', className)}
      style={{ transform: `scaleX(${value})`, ...style }}
      {...props}
    />
  )
}

export { ScrollProgress }
