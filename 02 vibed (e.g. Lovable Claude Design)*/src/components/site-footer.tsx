import { useEffect, useState } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { profile } from '@/data/site'
import { useScroll } from '@/hooks/use-in-view'
import { useUIState } from '@/lib/ui-state'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  const { setContactOpen } = useUIState()

  return (
    <footer className="bg-footer text-white">
      <div className="page-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 text-sm">
        <span>© {new Date().getFullYear()} James Jones</span>
        <Dialog>
          <DialogTrigger className="underline-offset-4 hover:underline">Imprint</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Imprint</DialogTitle>
              <DialogDescription>Replace this with your legal details.</DialogDescription>
            </DialogHeader>
            <address className="text-sm leading-relaxed not-italic">
              {profile.name}
              <br />
              Street 1, 12345 City
              <br />
              {profile.email}
            </address>
          </DialogContent>
        </Dialog>
        <button onClick={() => setContactOpen(true)} className="underline-offset-4 hover:underline">
          Contact
        </button>
      </div>
    </footer>
  )
}

export function BackToTop() {
  const { y } = useScroll()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const visible = mounted && y > 800

  return (
    <Button
      size="icon-lg"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-4 bottom-4 z-30 size-11 rounded-full shadow-lg transition-all duration-300 sm:right-6 sm:bottom-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUpIcon />
    </Button>
  )
}
