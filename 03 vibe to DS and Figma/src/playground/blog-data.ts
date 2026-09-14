import agents from '@/assets/project-agents.jpg'
import alpine from '@/assets/project-alpine.jpg'
import moonblocks from '@/assets/project-moonblocks.jpg'
import template from '@/assets/project-template.jpg'

// Prototype content only. Images reuse the portfolio assets until posts have their own.

export type PostCategory = 'design-systems' | 'agentic-ai' | 'ux'

export interface Post {
  slug: string
  title: string
  category: PostCategory
  date: string
  readingTime: string
  image: string
  excerpt: string
  featured?: boolean
}

export const postCategories: { value: PostCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'design-systems', label: 'Design systems' },
  { value: 'agentic-ai', label: 'Agentic AI' },
  { value: 'ux', label: 'UX' },
]

export const categoryLabel = (category: PostCategory) => postCategories.find((c) => c.value === category)?.label ?? category

export const posts: Post[] = [
  {
    slug: 'four-small-agents',
    title: 'How I design with four small AI agents',
    category: 'agentic-ai',
    date: '14 Sep 2026',
    readingTime: '9 min read',
    image: agents,
    excerpt:
      'One lead agent, three specialists and a folder of context files. Why splitting the work made the output sound more like the brand, not less.',
    featured: true,
  },
  {
    slug: 'design-system-from-a-vibe-coded-site',
    title: 'Pulling a design system out of a vibe-coded site',
    category: 'design-systems',
    date: '3 Sep 2026',
    readingTime: '8 min read',
    image: template,
    excerpt: 'Tokens first, then atoms, then the page. What I kept, what I renamed and what I deleted along the way.',
  },
  {
    slug: 'one-token-file',
    title: 'One token file for code and Figma',
    category: 'design-systems',
    date: '21 Aug 2026',
    readingTime: '6 min read',
    image: moonblocks,
    excerpt: 'A single naming rule turns the same JSON into CSS variables, Tailwind classes and Figma variables.',
  },
  {
    slug: 'twelve-hikers',
    title: 'What 12 hikers taught me about filters',
    category: 'ux',
    date: '6 Aug 2026',
    readingTime: '5 min read',
    image: alpine,
    excerpt: 'Testing a coded prototype on real routes showed which filters people actually use before planning a trek.',
  },
  {
    slug: 'prompt-files-are-specs',
    title: 'Prompt files are design specs now',
    category: 'agentic-ai',
    date: '22 Jul 2026',
    readingTime: '7 min read',
    image: agents,
    excerpt: 'Writing voice and brand rules as plain Markdown next to the code, so agents and people read the same thing.',
  },
  {
    slug: 'auto-layout-habits',
    title: 'Auto layout habits that survive the handoff',
    category: 'design-systems',
    date: '9 Jul 2026',
    readingTime: '4 min read',
    image: moonblocks,
    excerpt: 'Fill, hug and gap map straight to flex and grid. Five habits that make a Figma frame read like CSS.',
  },
  {
    slug: 'research-notes-in-markdown',
    title: 'Keeping research notes where the code lives',
    category: 'ux',
    date: '24 Jun 2026',
    readingTime: '5 min read',
    image: alpine,
    excerpt: 'Interview notes, journey maps and decisions in the repo, so the next design change starts from evidence.',
  },
]
