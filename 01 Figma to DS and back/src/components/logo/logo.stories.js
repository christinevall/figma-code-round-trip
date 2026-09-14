import { Logo } from './logo.js';
import css from './logo.css?raw';
import js from './logo.js?raw';

export default {
  title: 'Components/Logo',
  tags: ['autodocs'],
  render: (args) => Logo(args),
  args: { href: '#top', label: 'Home' },
  parameters: {
    code: [
      { name: 'logo.css', code: css },
      { name: 'logo.js', code: js },
    ],
    docs: { description: { component: 'Figma: **Logo** · colour `text/accent`.' } },
  },
};

export const Default = {};
