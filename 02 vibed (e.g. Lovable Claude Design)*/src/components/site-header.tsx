import { useState } from 'react'
import { MoonIcon, SearchIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CommandMenu } from '@/components/command-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useActiveSection, useScroll } from '@/hooks/use-in-view'
import { comingSoon, useUIState } from '@/lib/ui-state'
import { cn } from '@/lib/utils'

const sectionIds = ['about', 'work', 'skills'] as const

const nav = [
  { href: '#about', id: 'about', label: 'about.' },
  { href: '#work', id: 'work', label: 'work.' },
  { href: '#blog', id: 'blog', label: 'blog.' },
]

export function SiteHeader() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setContactOpen } = useUIState()
  const { y, progress } = useScroll()
  const active = useActiveSection(sectionIds)

  function onNavClick(e: React.MouseEvent, id: string) {
    if (id === 'blog') {
      e.preventDefault()
      comingSoon()
    }
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg transition-colors',
          y > 8 ? 'border-border' : 'border-transparent',
        )}
      >
        <div className="page-container flex h-16 items-center justify-between sm:h-20">
          <a href="#top" aria-label="Back to top" className="group">
            <span className="block size-9 rounded-full bg-brand transition-transform duration-300 group-hover:scale-110 sm:size-10" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => onNavClick(e, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className="relative rounded-md px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300',
                    active === item.id ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            ))}

            <div className="mx-2 flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-lg" onClick={() => setCommandOpen(true)} aria-label="Search">
                    <SearchIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Search <kbd className="ml-1 font-sans opacity-70">⌘K</kbd>
                </TooltipContent>
              </Tooltip>
              <ThemeToggle />
            </div>

            <Button onClick={() => setContactOpen(true)} className="h-11 rounded-md px-6 text-sm font-semibold">
              contact
            </Button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <Button variant="ghost" size="icon-lg" onClick={() => setCommandOpen(true)} aria-label="Search">
              <SearchIcon />
            </Button>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" aria-label="Open menu">
                  <span className="flex w-5 flex-col gap-1.5">
                    <span className="h-0.5 w-full rounded-full bg-foreground" />
                    <span className="h-0.5 w-full rounded-full bg-foreground" />
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-6">
                <SheetHeader className="p-0">
                  <SheetTitle className="flex items-center gap-3">
                    <span className="size-7 rounded-full bg-brand" /> Menu
                  </SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile" className="mt-6 flex flex-col">
                  {nav.map((item) => (
                    <SheetClose asChild key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => onNavClick(e, item.id)}
                        className="border-b py-4 text-3xl font-bold tracking-tight transition-colors hover:text-brand"
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2 text-sm">
                    Appearance <ThemeToggle />
                  </div>
                  <Button
                    className="h-12 text-base font-semibold"
                    onClick={() => {
                      setMenuOpen(false)
                      setContactOpen(true)
                    }}
                  >
                    contact
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="relative"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <SunIcon className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
