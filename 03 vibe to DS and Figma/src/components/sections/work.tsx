import { useState } from 'react'
import { Text } from '@/components/patterns/text'
import { ProjectRow } from '@/components/sections/project-row'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Category, Project } from '@/data/site'

export interface WorkProps {
  projects: Project[]
  categories: { value: Category | 'all'; label: string }[]
  onOpenProject: (slug: string) => void
}

/** Project list with a category filter. Rows alternate between plain and shaded backgrounds. */
function Work({ projects, categories, onOpenProject }: WorkProps) {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" aria-label="Selected work" data-slot="work" className="scroll-mt-20">
      <div className="page-container flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <Text variant="body-sm" tone="muted">
          Selected work <span aria-hidden>·</span> {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </Text>
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
        <ProjectRow key={project.slug} project={project} shaded={i % 2 === 1} onOpen={() => onOpenProject(project.slug)} />
      ))}
    </section>
  )
}

export { Work }
