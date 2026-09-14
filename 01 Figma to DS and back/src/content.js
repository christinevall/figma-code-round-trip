/* Demo content. Fictional person and example.com addresses.
   Images are exported from the Figma file (public/images/*.jpg).
   The illustrated placeholders (public/images/*.svg) are kept for a
   student version without real project screenshots. */

export const content = {
  navigation: {
    links: [
      { label: 'about.', href: '#about' },
      { label: 'work.', href: '#work' },
      { label: 'blog.', href: '#blog' },
    ],
    cta: { label: 'Contact', href: 'mailto:hello@example.com' },
  },

  hero: {
    subtitle: 'Sam Taylor',
    headline: 'UX. UI.<br>Agentic AI.',
  },

  projects: [
    {
      headline: 'moonblocks',
      description:
        'A Figma kit for designer portfolios: variables, text styles and responsive sections you can rearrange like building blocks.',
      image: '/images/project-moonblocks.jpg',
      imageAlt: 'The moonblocks portfolio kit on desktop and mobile, next to its colour and type styles',
    },
    {
      headline: 'Alpine Tracker',
      description:
        'A route explorer for multi-day alpine crossings. Filter by activity, duration, difficulty and country, then open a route for the details.',
      image: '/images/project-alpine.jpg',
      imageAlt: 'The Alpine Tracker app with route filters, route cards and a route detail panel',
    },
    {
      headline: 'Soft Agents',
      description:
        'A small team of AI agents that share one base file: a lead, plus business, voice and design. Each one only pulls in context when it needs it.',
      image: '/images/project-agents.jpg',
      imageAlt: 'Diagram of four AI agents and the context files they draw from',
    },
    {
      headline: 'Web Template',
      description:
        'A free website template built from the same components as this page. Swap the words and pictures, then publish.',
      image: '/images/project-template.jpg',
      imageAlt: 'The Web Template landing page: "Like this website? Use my template."',
    },
  ],

  about: {
    headline: 'About me',
    description:
      "Hi, I'm Sam, a UI designer who likes working close to the code. I design interfaces that are easy to find your way around, pick colours and type with care, and build prototypes early so we test real things instead of pictures.",
    image: '/images/about-portrait.jpg',
    imageAlt: 'Portrait of Sam Taylor',
    button: { label: 'Contact', href: 'mailto:hello@example.com' },
  },

  skills: {
    headline: 'Skills',
    items: [
      {
        headline: 'Interface design',
        content: 'Clear layouts, careful type and colour, and flows that are easy to follow on any screen size.',
      },
      {
        headline: 'Design systems',
        content: 'Variables, components and documentation that designers and developers both use.',
      },
      {
        headline: 'HTML and CSS',
        content: 'A basic understanding of HTML and CSS helps me align design with the code throughout the handoff.',
      },
    ],
  },

  footer: {
    copyright: '© 2026 Sam Taylor',
    links: [
      { label: 'Imprint', href: '#imprint' },
      { label: 'Contact', href: 'mailto:hello@example.com' },
    ],
  },
};
