import './button.css';

/**
 * Button · Figma: "Button" (variant × state)
 *
 * In Figma, hover / active / focused are variants you pick.
 * In code, the browser sets them when you hover, press or tab.
 * `state` only exists so Storybook can show every state at once.
 * With `href` it renders a link that looks like a button.
 */
export function Button({ label = 'Label', variant = 'primary', href, state = 'default' } = {}) {
  const classes = ['button', `button--${variant}`];
  if (state !== 'default') classes.push(`is-${state}`);

  return href
    ? `<a class="${classes.join(' ')}" href="${href}">${label}</a>`
    : `<button class="${classes.join(' ')}" type="button">${label}</button>`;
}
