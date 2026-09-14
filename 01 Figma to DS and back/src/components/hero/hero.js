import './hero.css';

/** Hero · Figma: "Hero" (breakpoint = desktop | tablet | mobile) */
export function Hero({ subtitle, headline } = {}) {
  return `<section class="hero">
    <div class="hero__container">
      <p class="hero__subtitle">${subtitle}</p>
      <h1 class="hero__headline">${headline}</h1>
    </div>
  </section>`;
}
