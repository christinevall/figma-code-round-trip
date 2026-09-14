import './about.css';
import { Button } from '../button/button.js';

/**
 * About · Figma: "About" (breakpoint = desktop | tablet | mobile)
 *
 * Figma props → code props
 *   headline, description → headline, description
 *   media (slot)          → image + imageAlt
 *   hadButton             → button (leave it out to hide the button)
 */
export function About({ headline, description, image, imageAlt = '', button } = {}) {
  return `<section class="about" id="about">
    <div class="about__container">
      <div class="about__content">
        <h2 class="about__headline">${headline}</h2>
        <p class="about__description">${description}</p>
        ${button ? Button({ ...button, variant: 'secondary' }) : ''}
      </div>
      <img class="about__media" src="${image}" alt="${imageAlt}" loading="lazy">
    </div>
  </section>`;
}
