import { useEffect } from 'react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { categories, projects } from '@/data/site'
import { useUIState } from '@/lib/ui-state'

export function ProjectDialog() {
  const { activeProject: project, openProject, setContactOpen } = useUIState()
  const index = project ? projects.indexOf(project) : -1
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    if (!project) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') openProject(next.slug)
      if (e.key === 'ArrowLeft') openProject(prev.slug)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [project, prev, next, openProject])

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied', { description: 'Share this project with anyone.' })
  }

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && openProject(null)}>
      <DialogContent className="flex max-h-[92dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        {project && (
          <>
            <div className="overflow-y-auto">
              <img key={project.slug} src={project.image} alt="" className="aspect-video w-full animate-in object-cover fade-in" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-brand text-brand-foreground">
                    {categories.find((c) => c.value === project.category)?.label}
                  </Badge>
                  <Badge variant="outline">{project.year}</Badge>
                  <Badge variant="outline">{project.role}</Badge>
                </div>

                <DialogHeader className="mt-4 gap-2 text-left">
                  <DialogTitle className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed">{project.summary}</DialogDescription>
                </DialogHeader>

                <dl className="mt-6 grid grid-cols-3 divide-x rounded-lg border">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="px-3 py-4 text-center sm:px-4">
                      <dd className="text-xl font-bold sm:text-2xl">{stat.value}</dd>
                      <dt className="mt-1 text-xs text-muted-foreground">{stat.label}</dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 grid gap-8 sm:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
                    {project.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Highlights</h3>
                    <ul className="mt-3 space-y-2.5">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-snug">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Button
                    className="h-10 px-5"
                    onClick={() => {
                      openProject(null)
                      setContactOpen(true)
                    }}
                  >
                    Start a similar project
                  </Button>
                  <Button variant="outline" className="h-10 px-4" onClick={copyLink}>
                    <LinkIcon /> Copy link
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t bg-muted/40 px-4 py-3">
              <Button variant="ghost" onClick={() => openProject(prev.slug)} className="max-w-[45%]">
                <ChevronLeftIcon /> <span className="truncate">{prev.title}</span>
              </Button>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {index + 1} / {projects.length}
              </span>
              <Button variant="ghost" onClick={() => openProject(next.slug)} className="max-w-[45%]">
                <span className="truncate">{next.title}</span> <ChevronRightIcon />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
