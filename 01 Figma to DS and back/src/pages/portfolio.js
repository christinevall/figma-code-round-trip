import { Navigation } from '../components/navigation/navigation.js';
import { Hero } from '../components/hero/hero.js';
import { ProjectCard } from '../components/project-card/project-card.js';
import { About } from '../components/about/about.js';
import { Skills } from '../components/skills/skills.js';
import { Footer } from '../components/footer/footer.js';
import { content } from '../content.js';

/**
 * The page · Figma: "<1280 (Desktop)", "<800 (Tablet)", ">800 (Mobile)"
 * Three Figma frames, one page in code. Only components, no new styles.
 * Every second project card gets the grey background, like in Figma.
 */
export function Portfolio(data = content) {
  const projects = data.projects
    .map((project, index) => ProjectCard({ ...project, hasBackground: index % 2 === 1 }))
    .join('');

  return `
    ${Navigation(data.navigation)}
    <main>
      ${Hero(data.hero)}
      <div id="work">${projects}</div>
      ${About(data.about)}
      ${Skills(data.skills)}
    </main>
    ${Footer(data.footer)}
  `;
}
