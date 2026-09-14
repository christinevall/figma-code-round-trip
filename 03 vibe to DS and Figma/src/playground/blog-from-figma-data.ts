import agents from '@/assets/project-agents.jpg'
import alpine from '@/assets/project-alpine.jpg'
import moonblocks from '@/assets/project-moonblocks.jpg'
import template from '@/assets/project-template.jpg'

/**
 * Content read from the Figma file "Vibe to DS and Figma", page Playground, frame "Blog · Desktop 1280" (node 5:5972).
 * Every string and image here is copied 1:1 from the Figma instances' properties. Change the Figma frame, re-import.
 */

export const figmaSource = {
  file: 'Vibe to DS and Figma',
  page: 'Playground',
  frame: 'Blog · Desktop 1280',
  nodeId: '5:5972',
  url: 'https://www.figma.com/design/WuQrHTwlnm4eVA5N33sa1w/Vibe-to-DS-and-Figma?node-id=5-5972',
  importedOn: '14 Sep 2026',
}

export const figmaHero = {
  availability: 'New post every month',
  name: 'Journal',
  headline: ['Notes on design.', 'And AI agents.'],
}

export const figmaTabs = ['All', 'Design systems', 'Agentic AI', 'UX']

export const figmaFeatured = {
  title: 'Designing with a team of AI agents',
  image: agents,
  summary:
    'What changed when I stopped writing one giant prompt and gave each agent a single job: business, voice, design. Faster answers, lower cost, and output that finally sounds like the brand.',
  tags: ['Featured', 'Agentic AI', '9 min read'],
}

export interface FigmaPost {
  title: string
  category: string
  image: string
  excerpt: string
  meta: string
}

export const figmaPosts: FigmaPost[] = [
  {
    title: 'From vibe-coded app to design system',
    category: 'Design systems',
    image: template,
    excerpt: 'How I pulled tokens, components and Storybook docs out of a one-page portfolio without rewriting it.',
    meta: '2 Sep 2026 · 8 min read',
  },
  {
    title: 'Tokens that code and Figma both understand',
    category: 'Figma',
    image: moonblocks,
    excerpt: 'One naming rule, one JSON source, and a push script that keeps variables in sync with the CSS.',
    meta: '19 Aug 2026 · 6 min read',
  },
  {
    title: 'Testing a trek planner with 12 hikers',
    category: 'UX',
    image: alpine,
    excerpt: 'What a coded prototype on real routes taught me that a clickable mockup never would have.',
    meta: '28 Jul 2026 · 5 min read',
  },
]

export const figmaNewsletter = {
  heading: 'Get the next post',
  body: 'One email a month with the newest post and what I’m building with AI agents. No spam, unsubscribe any time.',
  placeholder: 'you@studio.com',
  button: 'Subscribe',
  fineprint: 'Your email only goes to the newsletter tool.',
}
