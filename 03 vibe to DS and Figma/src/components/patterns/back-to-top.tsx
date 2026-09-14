import { useEffect, useState } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScroll } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

/** Floating round button that appears after scrolling down `threshold` pixels. */
function BackToTop({ threshold = 800, className }: { threshold?: number; className?: string }) {
  const { y } = useScroll()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const visible = mounted && y > threshold

  return (
    <Button
      size="icon-xl"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      data-slot="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-4 bottom-4 z-30 rounded-full shadow-lg transition-all duration-(--duration-slow) sm:right-6 sm:bottom-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        className,
      )}
    >
      <ArrowUpIcon />
    </Button>
  )
}

export { BackToTop }
