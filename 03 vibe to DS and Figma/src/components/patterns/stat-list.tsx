import type * as React from 'react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: string
}

/** A row of key figures in a bordered box, e.g. "60+ Blocks · 3 Breakpoints · 5 min Setup time". */
function StatList({ stats, className, style, ...props }: React.ComponentProps<'dl'> & { stats: Stat[] }) {
  return (
    <dl
      data-slot="stat-list"
      className={cn('grid divide-x rounded-lg border', className)}
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`, ...style }}
      {...props}
    >
      {stats.map((stat) => (
        // dt must come before dd in the DOM; flex-col-reverse shows the value on top.
        <div key={stat.label} className="flex flex-col-reverse px-3 py-4 text-center sm:px-4">
          <dt className="mt-1 text-caption text-muted-foreground">{stat.label}</dt>
          <dd className="text-heading-md sm:text-heading-lg">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { StatList, type Stat }
