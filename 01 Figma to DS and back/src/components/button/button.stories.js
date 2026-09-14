import { Button } from './button.js';
import css from './button.css?raw';
import js from './button.js?raw';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  args: { label: 'Label', variant: 'primary', state: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'active', 'focused'],
      description: 'Preview only. On a real page the browser sets the state.',
    },
    href: { control: 'text', description: 'Makes it a link that looks like a button.' },
  },
  parameters: {
    code: [
      { name: 'button.css', code: css },
      { name: 'button.js', code: js },
    ],
    docs: {
      description: {
        component: 'Figma: **Button** · 2 variants × 4 states = 8 Figma variants, one component in code.',
      },
    },
  },
};

export const Primary = {};

export const Secondary = { args: { variant: 'secondary' } };

/** The same grid as the Figma component set: variants across, states down. */
export const AllStates = {
  render: () => {
    const states = ['default', 'hover', 'active', 'focused'];
    const cells = states
      .map((state) => ['primary', 'secondary'].map((variant) => Button({ label: 'Label', variant, state })).join(''))
      .join('');
    return `<div style="display:grid;grid-template-columns:repeat(2,max-content);gap:24px 48px">${cells}</div>`;
  },
};
