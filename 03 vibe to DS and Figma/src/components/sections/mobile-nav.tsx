import { useState, type MouseEvent } from 'react'
import { BrandMark } from '@/components/patterns/brand-mark'
import { ThemeToggle } from '@/components/patterns/theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { NavItem } from '@/data/site'

export interface MobileNavProps {
  nav: NavItem[]
  onNavigate?: (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => void
  onContact: () => void
  /** Start open (useful in Storybook). */
  defaultOpen?: boolean
}

/** Menu button that opens a right-hand sheet with large nav links, the theme toggle and contact. */
function MobileNav({ nav, onNavigate, onContact, defaultOpen = false }: MobileNavProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" aria-label="Open menu">
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full rounded-full bg-foreground" />
            <span className="h-0.5 w-full rounded-full bg-foreground" />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs p-6">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-3">
            <BrandMark size="sm" /> Menu
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-6 flex flex-col">
          {nav.map((item) => (
            <SheetClose asChild key={item.id}>
              <a
                href={item.href}
                onClick={(e) => onNavigate?.(item, e)}
                className="border-b py-4 text-heading-xl transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2 text-body-sm">
            Appearance <ThemeToggle />
          </div>
          <Button
            size="xl"
            onClick={() => {
              setOpen(false)
              onContact()
            }}
          >
            contact
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
