import type * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/** A wrapping list of subtle badges, e.g. the tools used on a project. */
function TagList({ tags, className, ...props }: React.ComponentProps<'ul'> & { tags: string[] }) {
  return (
    <ul aria-label="Tags" data-slot="tag-list" className={cn('flex flex-wrap gap-1.5', className)} {...props}>
      {tags.map((tag) => (
        <li key={tag} className="flex">
          <Badge variant="subtle">{tag}</Badge>
        </li>
      ))}
    </ul>
  )
}

export { TagList }
