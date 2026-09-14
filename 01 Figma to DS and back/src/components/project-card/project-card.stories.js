import { ProjectCard } from './project-card.js';
import { content } from '../../content.js';
import css from './project-card.css?raw';
import js from './project-card.js?raw';

export default {
  title: 'Components/ProjectCard',
  tags: ['autodocs'],
  render: (args) => ProjectCard(args),
  args: { ...content.projects[0], hasBackground: false },
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'project-card.css', code: css },
      { name: 'project-card.js', code: js },
    ],
    docs: {
      description: {
        component:
          'Figma: **ProjectCard** · `hasBG` → `hasBackground`, the `media` slot → `image`. 3 breakpoint variants, one component in code.',
      },
    },
  },
};

export const Default = {};

export const WithBackground = { args: { ...content.projects[1], hasBackground: true } };

export const Mobile = { globals: { viewport: { value: 'sm' } } };
