import './footer.css';

/** Footer · Figma: "Footer" (breakpoint = desktop | tablet | mobile) */
export function Footer({ copyright, links = [] } = {}) {
  const items = links
    .map((link) => `<li><a class="footer__link" href="${link.href}">${link.label}</a></li>`)
    .join('');

  return `<footer class="footer">
    <p class="footer__copyright">${copyright}</p>
    <ul class="footer__links">${items}</ul>
  </footer>`;
}
