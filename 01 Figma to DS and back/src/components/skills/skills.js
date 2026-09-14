import './skills.css';
import { SkillItem } from '../skill-item/skill-item.js';

/** Skills · Figma: "Skills" (breakpoint = desktop | tablet | mobile). A headline and a row of SkillItems. */
export function Skills({ headline = 'Skills', items = [] } = {}) {
  const list = items.map((item) => `<li>${SkillItem(item)}</li>`).join('');

  return `<section class="skills">
    <div class="skills__container">
      <h2 class="skills__headline">${headline}</h2>
      <ul class="skills__group">${list}</ul>
    </div>
  </section>`;
}
