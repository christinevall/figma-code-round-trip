import { About } from './about.js';
import { content } from '../../content.js';
import css from './about.css?raw';
import js from './about.js?raw';

export default {
  title: 'Components/About',
  tags: ['autodocs'],
  render: (args) => About(args),
  args: content.about,
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'about.css', code: css },
      { name: 'about.js', code: js },
    ],
    docs: {
      description: {
        component: 'Figma: **About** · `hadButton` → `button`, the `media` slot → `image`.',
      },
    },
  },
};

export const Default = {};

export const WithoutButton = { args: { button: undefined } };

export const Mobile = { globals: { viewport: { value: 'sm' } } };
