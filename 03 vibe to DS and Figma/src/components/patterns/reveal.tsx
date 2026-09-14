import type { ReactNode } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

/** Fades and lifts its children in the first time they scroll into view. No motion with prefers-reduced-motion. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds. */
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-slot="reveal"
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,translate] duration-(--duration-reveal) ease-out motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { Reveal }
