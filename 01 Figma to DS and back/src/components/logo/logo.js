import './logo.css';

/** Logo · Figma: "Logo". A 48px circle in the accent colour, linking home. */
export function Logo({ href = '#top', label = 'Home' } = {}) {
  return `<a class="logo" href="${href}" aria-label="${label}"></a>`;
}
