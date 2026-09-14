import type * as React from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A 16:9 project image that opens the case study. Zooms slightly and shows a chip on hover or focus. */
function ProjectMedia({
  src,
  label,
  hint = 'View case study',
  className,
  ...props
}: Omit<React.ComponentProps<'button'>, 'children'> & {
  src: string
  /** Accessible name, e.g. "Open moonblocks". */
  label: string
  /** Chip text shown on hover and focus. */
  hint?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-slot="project-media"
      className={cn(
        'group relative block aspect-video w-full overflow-hidden bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="size-full object-cover transition-transform duration-(--duration-reveal) ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute right-3 bottom-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-caption-strong opacity-0 shadow-sm backdrop-blur transition-all duration-(--duration-slow) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {hint} <ArrowUpRightIcon aria-hidden className="size-3.5" />
      </span>
    </button>
  )
}

export { ProjectMedia }
