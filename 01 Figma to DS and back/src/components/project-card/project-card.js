import './project-card.css';

/**
 * ProjectCard · Figma: "ProjectCard" (breakpoint = desktop | tablet | mobile)
 *
 * Figma props → code props
 *   headline, description → headline, description
 *   hasBG                 → hasBackground (grey band behind the card)
 *   media (slot)          → image + imageAlt
 */
export function ProjectCard({
  headline,
  description,
  image,
  imageAlt = '',
  linkLabel = 'find out more →',
  href = '#',
  hasBackground = false,
} = {}) {
  return `<article class="project-card${hasBackground ? ' project-card--raised' : ''}">
    <div class="project-card__container">
      <img class="project-card__media" src="${image}" alt="${imageAlt}" loading="lazy">
      <div class="project-card__content">
        <h2 class="project-card__headline">${headline}</h2>
        <p class="project-card__description">${description}</p>
        <a class="project-card__link" href="${href}">${linkLabel}</a>
      </div>
    </div>
  </article>`;
}
