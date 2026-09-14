import portrait from '@/assets/about-portrait.jpg'
import agents from '@/assets/project-agents.jpg'
import alpine from '@/assets/project-alpine.jpg'
import moonblocks from '@/assets/project-moonblocks.jpg'
import template from '@/assets/project-template.jpg'

export const profile = {
  name: 'James Jones',
  email: 'hello@example.com',
  availability: 'Available for new projects',
  headline: ['UX. UI.', 'Agentic AI.'],
  portrait,
  portraitAlt: 'Portrait of James Jones',
  about:
    'Welcome to my portfolio! I’m James, a UX and UI designer who loves turning complex ideas into interfaces that feel simple. I choose colours and typography that set the right mood and make content easy to read. Lately I spend most of my time designing with AI agents, and I believe intuitive design is key to guiding people effortlessly through their journey.',
  copyrightHolder: 'James Jones',
  address: ['Street 1, 12345 City'],
}

export interface NavItem {
  id: string
  href: string
  label: string
}

export const nav: NavItem[] = [
  { href: '#about', id: 'about', label: 'about.' },
  { href: '#work', id: 'work', label: 'work.' },
  { href: '#blog', id: 'blog', label: 'blog.' },
]

export type Category = 'product' | 'ai' | 'template'

export const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'product', label: 'Product' },
  { value: 'ai', label: 'Agentic AI' },
  { value: 'template', label: 'Templates' },
]

export interface Project {
  slug: string
  title: string
  category: Category
  year: string
  role: string
  image: string
  summary: string
  description: string[]
  highlights: string[]
  stats: { label: string; value: string }[]
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'moonblocks',
    title: 'moonblocks',
    category: 'template',
    year: '2026',
    role: 'Design & build',
    image: moonblocks,
    summary:
      'A library of ready-made Figma blocks for portfolio and landing pages. I designed every block to snap together, so you go from blank canvas to a working layout in minutes.',
    description: [
      'Most people get stuck at the blank canvas. moonblocks gives you a head start: headers, project grids, about sections and footers that already follow a shared spacing and type scale.',
      'Every block uses auto layout and variables, so swapping colours, fonts or content never breaks the layout.',
    ],
    highlights: [
      'More than 60 responsive blocks built on one 8px grid',
      'Light and dark modes driven by Figma variables',
      'Blocks map 1:1 to React components for the handoff',
    ],
    stats: [
      { label: 'Blocks', value: '60+' },
      { label: 'Breakpoints', value: '3' },
      { label: 'Setup time', value: '5 min' },
    ],
    tags: ['Figma', 'Design system', 'Auto layout'],
  },
  {
    slug: 'alpine-tracker',
    title: 'Alpine Tracker',
    category: 'product',
    year: '2026',
    role: 'UX, UI & prototype',
    image: alpine,
    summary:
      'A route planner for multi-day hut treks in the Alps. I designed the filters, route cards and stage breakdowns so hikers can compare treks like Chamonix to Zermatt at a glance.',
    description: [
      'Planning a hut trek usually means ten browser tabs, a PDF and a spreadsheet. Alpine Tracker puts distance, elevation, difficulty and huts into one searchable view.',
      'I started with interviews with trekkers, mapped their planning journey and then prototyped the whole flow in code to test it on real routes.',
    ],
    highlights: [
      'Faceted filters for difficulty, duration and season',
      'Stage-by-stage breakdown with elevation profile',
      'Coded prototype tested with 12 hikers',
    ],
    stats: [
      { label: 'Routes', value: '140' },
      { label: 'Interviews', value: '12' },
      { label: 'Task success', value: '92%' },
    ],
    tags: ['UX research', 'Product design', 'React'],
  },
  {
    slug: 'soft-agents',
    title: 'Soft Agents',
    category: 'ai',
    year: '2026',
    role: 'Concept & system design',
    image: agents,
    summary:
      'A small team of AI agents that work alongside Claude. Each agent owns one area, like business, voice or design, and only pulls in the context files it needs.',
    description: [
      'Instead of one giant prompt, Soft Agents splits the work into focused roles. A lead agent routes the request, and specialists read only the brand, voice or design-system files that matter.',
      'The result is faster answers, lower cost and output that actually sounds like the brand.',
    ],
    highlights: [
      'Lead agent routes work to four specialists',
      'Context files loaded only when needed',
      'Everything lives in plain Markdown next to the code',
    ],
    stats: [
      { label: 'Agents', value: '4' },
      { label: 'Context files', value: '5' },
      { label: 'Token savings', value: '~40%' },
    ],
    tags: ['Claude', 'Agentic AI', 'Prompt design'],
  },
  {
    slug: 'web-template',
    title: 'Web Template',
    category: 'template',
    year: '2025',
    role: 'Design & front end',
    image: template,
    summary:
      'A free one-page portfolio template, the one you are looking at right now. I built it so designers can publish a clean site without fighting the code.',
    description: [
      'The template ships as a Figma file and as a React app with Tailwind and shadcn/ui. Change the content in one data file and the whole site updates.',
      'It is fully responsive, supports dark mode and comes with a contact form, project detail views and a command menu.',
    ],
    highlights: [
      'One data file controls all content',
      'Responsive from 320px to widescreen',
      'Dark mode, command menu and deep-linkable projects',
    ],
    stats: [
      { label: 'Price', value: 'Free' },
      { label: 'Sections', value: '5' },
      { label: 'Lighthouse', value: '100' },
    ],
    tags: ['React', 'Tailwind', 'shadcn/ui'],
  },
]

export const skills = [
  {
    title: 'UX Design',
    body: 'I turn fuzzy problems into clear flows through research, journey mapping and quick prototypes I can put in front of real people.',
  },
  {
    title: 'UI & Design Systems',
    body: 'I design interfaces on solid foundations: tokens, components and auto layout that scale from one screen to a whole product.',
  },
  {
    title: 'Front End & Agentic AI',
    body: 'A working knowledge of HTML, CSS and React plus AI agents helps me align design with the code and ship faster.',
  },
]
