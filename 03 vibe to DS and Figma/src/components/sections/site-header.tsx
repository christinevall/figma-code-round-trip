import { useMemo, type MouseEvent } from 'react'
import { SearchIcon } from 'lucide-react'
import { BrandMark } from '@/components/patterns/brand-mark'
import { NavLink } from '@/components/patterns/nav-link'
import { ScrollProgress } from '@/components/patterns/scroll-progress'
import { ThemeToggle } from '@/components/patterns/theme-toggle'
import { MobileNav } from '@/components/sections/mobile-nav'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { NavItem } from '@/data/site'
import { useActiveSection, useScroll } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

export interface SiteHeaderProps {
  nav: NavItem[]
  /** Called on every nav click. Call event.preventDefault() to stop the jump (e.g. for a "coming soon" link). */
  onNavigate?: (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => void
  onSearch: () => void
  onContact: () => void
}

/** Sticky header: brand mark, section nav with active underline, search, theme toggle, contact and scroll progress. Collapses to a sheet below 768px. */
function SiteHeader({ nav, onNavigate, onSearch, onContact }: SiteHeaderProps) {
  const { y, progress } = useScroll()
  const ids = useMemo(() => nav.map((item) => item.id), [nav])
  const active = useActiveSection(ids)

  return (
    <header
      data-slot="site-header"
      className={cn(
        'sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg transition-colors',
        y > 8 ? 'border-border' : 'border-transparent',
      )}
    >
      <div className="page-container flex h-(--layout-header-height) items-center justify-between">
        <a href="#top" aria-label="Back to top" className="group">
          <BrandMark className="transition-transform duration-(--duration-slow) group-hover:scale-110" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink key={item.id} href={item.href} active={active === item.id} onClick={(e) => onNavigate?.(item, e)}>
              {item.label}
            </NavLink>
          ))}

          <div className="mx-2 flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-lg" onClick={onSearch} aria-label="Search">
                  <SearchIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Search <kbd className="ml-1 font-sans opacity-70">⌘K</kbd>
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </div>

          <Button size="xl" onClick={onContact}>
            contact
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon-lg" onClick={onSearch} aria-label="Search">
            <SearchIcon />
          </Button>
          <MobileNav nav={nav} onNavigate={onNavigate} onContact={onContact} />
        </div>
      </div>
      <ScrollProgress value={progress} />
    </header>
  )
}

export { SiteHeader }
