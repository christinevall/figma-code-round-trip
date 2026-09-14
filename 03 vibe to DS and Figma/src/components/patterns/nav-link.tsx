import type * as React from 'react'
import { cn } from '@/lib/utils'

/** Header navigation link with the brand underline for the section in view. */
function NavLink({
  active = false,
  className,
  children,
  ...props
}: React.ComponentProps<'a'> & {
  /** The linked section is currently in view. */
  active?: boolean
}) {
  return (
    <a
      data-slot="nav-link"
      aria-current={active ? 'true' : undefined}
      className={cn('relative rounded-md px-4 py-2 text-label-strong transition-colors hover:bg-muted', className)}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-(--duration-slow)',
          active ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </a>
  )
}

export { NavLink }
