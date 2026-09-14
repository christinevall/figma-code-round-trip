import { useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CheckList } from '@/components/patterns/check-list'
import { StatList } from '@/components/patterns/stat-list'
import { Text } from '@/components/patterns/text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Category, Project } from '@/data/site'

export interface ProjectDialogProps {
  /** The open project, or null when closed. */
  project: Project | null
  /** All projects, for previous/next. */
  projects: Project[]
  categories: { value: Category | 'all'; label: string }[]
  /** Open another project, or pass null to close. */
  onNavigate: (slug: string | null) => void
  onContact: () => void
}

/** Case-study dialog: image, badges, title, stats, description, highlights, actions, and previous/next (also ← →). */
function ProjectDialog({ project, projects, categories, onNavigate, onContact }: ProjectDialogProps) {
  const index = project ? projects.indexOf(project) : -1
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    if (!project) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate(next.slug)
      if (e.key === 'ArrowLeft') onNavigate(prev.slug)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [project, prev, next, onNavigate])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied', { description: 'Share this project with anyone.' })
    } catch {
      toast.error('Could not copy the link')
    }
  }

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onNavigate(null)}>
      <DialogContent className="flex max-h-[92dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        {project && (
          <>
            <div className="overflow-y-auto">
              <img key={project.slug} src={project.image} alt="" className="aspect-video w-full animate-in object-cover fade-in" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">{categories.find((c) => c.value === project.category)?.label}</Badge>
                  <Badge variant="outline">{project.year}</Badge>
                  <Badge variant="outline">{project.role}</Badge>
                </div>

                <DialogHeader className="mt-4 gap-2 text-left">
                  <DialogTitle className="text-heading-xl sm:text-heading-2xl">{project.title}</DialogTitle>
                  <DialogDescription className="text-prose-md">{project.summary}</DialogDescription>
                </DialogHeader>

                <StatList stats={project.stats} className="mt-6" />

                <div className="mt-6 grid gap-8 sm:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-3">
                    {project.description.map((paragraph) => (
                      <Text key={paragraph} variant="prose-sm" tone="prose">
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                  <div>
                    <Text as="div" variant="label-strong" role="heading" aria-level={3}>
                      Highlights
                    </Text>
                    <CheckList items={project.highlights} className="mt-3" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Button size="lg" onClick={onContact}>
                    Start a similar project
                  </Button>
                  <Button variant="outline" size="lg" onClick={copyLink}>
                    <LinkIcon /> Copy link
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t bg-muted/50 px-4 py-3">
              <Button variant="ghost" onClick={() => onNavigate(prev.slug)} className="max-w-[45%]">
                <ChevronLeftIcon /> <span className="truncate">{prev.title}</span>
              </Button>
              <Text as="span" variant="caption" tone="muted" className="hidden sm:block">
                {index + 1} / {projects.length}
              </Text>
              <Button variant="ghost" onClick={() => onNavigate(next.slug)} className="max-w-[45%]">
                <span className="truncate">{next.title}</span> <ChevronRightIcon />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { ProjectDialog }
