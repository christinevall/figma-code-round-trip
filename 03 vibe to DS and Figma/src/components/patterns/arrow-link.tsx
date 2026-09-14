import type * as React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Text action with a trailing arrow that nudges right on hover, e.g. "find out more →". */
function ArrowLink({ className, children, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="arrow-link"
      className={cn('group/arrow-link inline-flex items-center gap-1.5 text-label-strong', className)}
      {...props}
    >
      {children}
      <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover/arrow-link:translate-x-1" />
    </button>
  )
}

export { ArrowLink }
