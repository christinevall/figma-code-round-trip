import { useEffect } from 'react'
import { ArrowRightIcon, CopyIcon, FolderOpenIcon, MailIcon, MoonIcon, NewspaperIcon, SunIcon, UserIcon, WrenchIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { projects } from '@/data/site'
import { comingSoon, copyEmail, useUIState } from '@/lib/ui-state'

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { resolvedTheme, setTheme } = useTheme()
  const { setContactOpen, openProject } = useUIState()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const run = (action: () => void) => {
    onOpenChange(false)
    action()
  }

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search" description="Jump to a section, project or action">
      <Command>
        <CommandInput placeholder="Search projects, sections, actions…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem key={p.slug} value={`${p.title} ${p.tags.join(' ')}`} onSelect={() => run(() => openProject(p.slug))}>
                <FolderOpenIcon />
                {p.title}
                <CommandShortcut>{p.year}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Sections">
            <CommandItem onSelect={() => run(() => goTo('about'))}>
              <UserIcon /> About me
            </CommandItem>
            <CommandItem onSelect={() => run(() => goTo('work'))}>
              <ArrowRightIcon /> Work
            </CommandItem>
            <CommandItem onSelect={() => run(() => goTo('skills'))}>
              <WrenchIcon /> Skills
            </CommandItem>
            <CommandItem onSelect={() => run(comingSoon)}>
              <NewspaperIcon /> Blog
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => run(() => setContactOpen(true))}>
              <MailIcon /> Send a message
            </CommandItem>
            <CommandItem onSelect={() => run(copyEmail)}>
              <CopyIcon /> Copy email address
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}>
              {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
              Toggle {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
