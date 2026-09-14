import { SkillItem } from './skill-item.js';
import { content } from '../../content.js';
import css from './skill-item.css?raw';
import js from './skill-item.js?raw';

export default {
  title: 'Components/SkillItem',
  tags: ['autodocs'],
  render: (args) => `<div style="max-width:368px">${SkillItem(args)}</div>`,
  args: content.skills.items[0],
  parameters: {
    code: [
      { name: 'skill-item.css', code: css },
      { name: 'skill-item.js', code: js },
    ],
    docs: { description: { component: 'Figma: **SkillItem** · used three times inside **Skills**.' } },
  },
};

export const Default = {};
