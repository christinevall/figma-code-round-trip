import { Footer } from './footer.js';
import { content } from '../../content.js';
import css from './footer.css?raw';
import js from './footer.js?raw';

export default {
  title: 'Components/Footer',
  tags: ['autodocs'],
  render: (args) => Footer(args),
  args: content.footer,
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'footer.css', code: css },
      { name: 'footer.js', code: js },
    ],
    docs: { description: { component: 'Figma: **Footer** · one row from tablet up, stacked on mobile.' } },
  },
};

export const Default = {};

export const Mobile = { globals: { viewport: { value: 'sm' } } };
