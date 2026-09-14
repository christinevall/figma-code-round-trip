import type * as React from 'react'
import { cn } from '@/lib/utils'

/** Pill-shaped button with a live status dot, e.g. "Available for new projects". */
function StatusPill({
  pulse = true,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  /** Animate the dot. Always off when the user prefers reduced motion. */
  pulse?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="status-pill"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-caption-strong text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground',
        className,
      )}
      {...props}
    >
      <span aria-hidden className="relative flex size-2">
        {pulse && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
        )}
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      {children}
    </button>
  )
}

export { StatusPill }
