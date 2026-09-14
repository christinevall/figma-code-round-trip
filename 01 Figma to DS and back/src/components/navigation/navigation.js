import './navigation.css';
import { Button } from '../button/button.js';
import { Logo } from '../logo/logo.js';
import { MenuToggle } from '../menu-toggle/menu-toggle.js';

/**
 * Navigation · Figma: "Navigation" (breakpoint = desktop | tablet | mobile)
 *
 * Three Figma variants, one component: below 800px the links hide
 * behind the menu toggle. Uses Logo, Button and MenuToggle inside,
 * just like the Figma component uses their instances.
 */
export function Navigation({ links = [], cta, open = false } = {}) {
  const items = links
    .map((link) => `<li><a class="navigation__link" href="${link.href}">${link.label}</a></li>`)
    .join('');

  return `<header class="navigation"${open ? ' data-open' : ''}>
    ${Logo()}
    ${MenuToggle({ open, controls: 'navigation-menu' })}
    <nav class="navigation__menu" id="navigation-menu" aria-label="Main">
      <ul class="navigation__links">${items}</ul>
      ${cta ? Button({ label: cta.label, href: cta.href }) : ''}
    </nav>
  </header>`;
}

/** Makes the menu toggle work. Call it once the HTML is on the page. */
export function initNavigation(root = document) {
  root.querySelectorAll('.navigation').forEach((nav) => {
    const toggle = nav.querySelector('.menu-toggle');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.toggleAttribute('data-open', open);
    });
  });
}
