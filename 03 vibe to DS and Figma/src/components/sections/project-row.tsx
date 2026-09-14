import { ArrowLink } from '@/components/patterns/arrow-link'
import { Heading } from '@/components/patterns/heading'
import { ProjectMedia } from '@/components/patterns/project-media'
import { Reveal } from '@/components/patterns/reveal'
import { TagList } from '@/components/patterns/tag-list'
import { Text } from '@/components/patterns/text'
import type { Project } from '@/data/site'
import { cn } from '@/lib/utils'

export interface ProjectRowProps {
  project: Pick<Project, 'title' | 'image' | 'summary' | 'tags'>
  /** Use the shaded section background (every second row). */
  shaded?: boolean
  onOpen: () => void
}

/** One project in the work list: image left, title, summary, tags and "find out more" right. Stacks below 768px. */
function ProjectRow({ project, shaded = false, onOpen }: ProjectRowProps) {
  return (
    <article data-slot="project-row" className={cn('py-6', shaded && 'bg-section')}>
      <div className="page-container grid gap-5 md:grid-cols-2 md:gap-6">
        <Reveal>
          <ProjectMedia src={project.image} label={`Open ${project.title}`} onClick={onOpen} />
        </Reveal>
        <Reveal delay={100} className="md:pt-1">
          <Heading size="title">{project.title}</Heading>
          <Text tone="prose" className="mt-3 max-w-prose">
            {project.summary}
          </Text>
          <TagList tags={project.tags} className="mt-4" />
          <ArrowLink className="mt-5" onClick={onOpen}>
            find out more
          </ArrowLink>
        </Reveal>
      </div>
    </article>
  )
}

export { ProjectRow }
