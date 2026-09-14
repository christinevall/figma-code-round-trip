import { Hero } from './hero.js';
import { content } from '../../content.js';
import css from './hero.css?raw';
import js from './hero.js?raw';

export default {
  title: 'Components/Hero',
  tags: ['autodocs'],
  render: (args) => Hero(args),
  args: content.hero,
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'hero.css', code: css },
      { name: 'hero.js', code: js },
    ],
    docs: {
      description: {
        component: 'Figma: **Hero** · the headline uses the text style `font/display/md`, which is uppercase in Figma.',
      },
    },
  },
};

export const Default = {};

export const Mobile = { globals: { viewport: { value: 'sm' } } };
