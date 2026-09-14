import { useState } from 'react'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { categories, projects, type Category, type Project } from '@/data/site'
import { useUIState } from '@/lib/ui-state'
import { cn } from '@/lib/utils'

export function Work() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-20">
      <div className="page-container flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Selected work <span className="text-foreground/40">·</span> {visible.length}{' '}
          {visible.length === 1 ? 'project' : 'projects'}
        </p>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Category | 'all')}>
          <TabsList className="w-full sm:w-auto">
            {categories.map((c) => (
              <TabsTrigger key={c.value} value={c.value} className="px-2 sm:px-3">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {visible.map((project, i) => (
        <ProjectRow key={project.slug} project={project} shaded={i % 2 === 1} />
      ))}
    </section>
  )
}

function ProjectRow({ project, shaded }: { project: Project; shaded: boolean }) {
  const { openProject } = useUIState()

  return (
    <article className={cn('py-6 sm:py-6', shaded && 'bg-section')}>
      <div className="page-container grid gap-5 md:grid-cols-2 md:gap-6">
        <Reveal>
          <button
            onClick={() => openProject(project.slug)}
            aria-label={`Open ${project.title}`}
            className="group relative block aspect-video w-full overflow-hidden bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute right-3 bottom-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              View case study <ArrowUpRightIcon className="size-3.5" />
            </span>
          </button>
        </Reveal>

        <Reveal delay={100} className="md:pt-1">
          <h2 className="text-[1.75rem] leading-tight font-bold tracking-tight lg:text-4xl">{project.title}</h2>
          <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-foreground/80">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
          <button
            onClick={() => openProject(project.slug)}
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            find out more
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </article>
  )
}
