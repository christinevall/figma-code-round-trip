import './skill-item.css';

/** SkillItem · Figma: "SkillItem" (props: headline, content) */
export function SkillItem({ headline, content } = {}) {
  return `<div class="skill-item">
    <h3 class="skill-item__headline">${headline}</h3>
    <p class="skill-item__content">${content}</p>
  </div>`;
}
