import type * as React from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Bulleted list with brand check marks, e.g. project highlights. */
function CheckList({ items, className, ...props }: React.ComponentProps<'ul'> & { items: string[] }) {
  return (
    <ul data-slot="check-list" className={cn('space-y-2.5', className)} {...props}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-body-sm">
          <CheckIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export { CheckList }
