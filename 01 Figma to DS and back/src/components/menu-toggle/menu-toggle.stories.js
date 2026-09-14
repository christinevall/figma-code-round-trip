import { MenuToggle } from './menu-toggle.js';
import css from './menu-toggle.css?raw';
import js from './menu-toggle.js?raw';

export default {
  title: 'Components/MenuToggle',
  tags: ['autodocs'],
  render: (args) => MenuToggle(args),
  args: { open: false },
  parameters: {
    code: [
      { name: 'menu-toggle.css', code: css },
      { name: 'menu-toggle.js', code: js },
    ],
    docs: {
      description: {
        component: 'Figma: **Menu** (`Property 1 = close | open`). In code the variant is `aria-expanded`.',
      },
    },
  },
};

export const Closed = {};

export const Open = { args: { open: true } };
