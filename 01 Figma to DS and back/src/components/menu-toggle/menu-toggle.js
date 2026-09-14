import './menu-toggle.css';

/**
 * MenuToggle · Figma: "Menu" (Property 1 = close | open)
 *
 * The burger button for small screens. In code the variant becomes
 * aria-expanded: screen readers hear "expanded / collapsed",
 * and the CSS draws two lines or an X from the same attribute.
 */
export function MenuToggle({ open = false, controls } = {}) {
  const label = open ? 'Close menu' : 'Open menu';
  const controlsAttr = controls ? ` aria-controls="${controls}"` : '';

  return `<button class="menu-toggle" type="button" aria-expanded="${open}" aria-label="${label}"${controlsAttr}>
    <span class="menu-toggle__line"></span>
    <span class="menu-toggle__line"></span>
  </button>`;
}
