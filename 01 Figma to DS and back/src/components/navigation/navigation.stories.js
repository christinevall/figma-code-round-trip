import { Navigation, initNavigation } from './navigation.js';
import { content } from '../../content.js';
import css from './navigation.css?raw';
import js from './navigation.js?raw';

export default {
  title: 'Components/Navigation',
  tags: ['autodocs'],
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = Navigation(args);
    initNavigation(wrapper);
    return wrapper;
  },
  args: content.navigation,
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'navigation.css', code: css },
      { name: 'navigation.js', code: js },
    ],
    docs: {
      description: {
        component:
          'Figma: **Navigation** · 3 breakpoint variants, one component in code. Resize, or pick a viewport in the toolbar.',
      },
    },
  },
};

export const Desktop = { globals: { viewport: { value: 'lg' } } };

export const Tablet = { globals: { viewport: { value: 'md' } } };

export const Mobile = { globals: { viewport: { value: 'sm' } } };

/** Not designed in Figma: the open mobile menu. */
export const MobileOpen = { args: { open: true }, globals: { viewport: { value: 'sm' } } };
