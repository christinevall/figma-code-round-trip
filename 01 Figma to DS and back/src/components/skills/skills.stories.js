import { Skills } from './skills.js';
import { content } from '../../content.js';
import css from './skills.css?raw';
import js from './skills.js?raw';

export default {
  title: 'Components/Skills',
  tags: ['autodocs'],
  render: (args) => Skills(args),
  args: content.skills,
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'skills.css', code: css },
      { name: 'skills.js', code: js },
    ],
    docs: { description: { component: 'Figma: **Skills** · three **SkillItem**s in a row, stacked on mobile.' } },
  },
};

export const Default = {};

export const Mobile = { globals: { viewport: { value: 'sm' } } };
