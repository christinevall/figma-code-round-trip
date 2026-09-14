import { Portfolio } from './portfolio.js';
import { initNavigation } from '../components/navigation/navigation.js';
import pageJs from './portfolio.js?raw';
import contentJs from '../content.js?raw';

export default {
  title: 'Pages/Portfolio',
  tags: ['autodocs'],
  render: () => {
    const page = document.createElement('div');
    page.innerHTML = Portfolio();
    initNavigation(page);
    return page;
  },
  parameters: {
    layout: 'fullscreen',
    code: [
      { name: 'portfolio.js', code: pageJs },
      { name: 'content.js', code: contentJs },
    ],
    docs: {
      description: {
        component: 'The whole page. No CSS of its own: only components, filled with the words and images from `content.js`.',
      },
    },
  },
};

export const Desktop = { globals: { viewport: { value: 'lg' } } };

export const Tablet = { globals: { viewport: { value: 'md' } } };

export const Mobile = { globals: { viewport: { value: 'sm' } } };
