/* Foundations: the tokens, drawn from the live CSS variables.
   Switch the theme in the toolbar and the semantic colours change. */

import tokensCss from '../tokens/tokens.css?raw';
import baseCss from '../base.css?raw';

const styles = `<style>
  .fd { display: grid; gap: 32px; font-family: var(--font-family-sans); color: var(--color-text-default); }
  .fd h2 { font: var(--text-headline-sm); margin: 0 0 12px; }
  .fd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
  .fd-chip { height: 64px; border-radius: var(--radius-md); box-shadow: inset 0 0 0 1px var(--color-border-default); }
  .fd-name { font-size: 13px; line-height: 1.4; margin-top: 6px; }
  .fd-name code { display: block; color: var(--color-text-muted); font-size: 12px; }
  .fd-row { display: grid; grid-template-columns: 220px 1fr; gap: 16px; align-items: center; padding-block: 8px; border-top: 1px solid var(--color-border-default); }
</style>`;

const swatch = (figmaName) => {
  const cssName = `--color-${figmaName.replaceAll('/', '-')}`;
  return `<div>
    <div class="fd-chip" style="background: var(${cssName})"></div>
    <div class="fd-name">${figmaName}<code>${cssName}</code></div>
  </div>`;
};

const group = (title, names) => `<section><h2>${title}</h2><div class="fd-grid">${names.map(swatch).join('')}</div></section>`;

export default {
  title: 'Foundations',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    code: [
      { name: 'tokens.css', code: tokensCss },
      { name: 'base.css', code: baseCss },
    ],
    docs: {
      description: {
        component: 'Every Figma variable and text style as a CSS custom property. Switch the theme in the toolbar to see the semantic colours change.',
      },
    },
  },
};

export const SemanticColors = {
  name: 'Colors · semantic',
  render: () => `${styles}<div class="fd">
    ${group('Text', ['text/default', 'text/muted', 'text/inverse', 'text/accent', 'text/disabled'])}
    ${group('Surface', ['surface/default', 'surface/raised', 'surface/inverse', 'surface/accent-subtle'])}
    ${group('Border', ['border/default', 'border/strong', 'border/accent', 'border/focus'])}
    ${group('Action primary', ['action/primary/default', 'action/primary/hover', 'action/primary/pressed', 'action/primary/disabled', 'action/primary/text'])}
    ${group('Action secondary', ['action/secondary/default', 'action/secondary/hover', 'action/secondary/pressed', 'action/secondary/border', 'action/secondary/text'])}
  </div>`,
};

const steps = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

export const PrimitiveColors = {
  name: 'Colors · primitives',
  render: () => `${styles}<div class="fd">
    ${group('Brand', steps.map((s) => `brand/${s}`))}
    ${group('Neutral', ['000', ...steps, '999'].map((s) => `neutral/${s}`))}
  </div>`,
};

const textStyles = [
  ['font/display/md', 'display-md', 'UX. UI.', 'text-transform: uppercase'],
  ['font/headline/lg', 'headline-lg', 'About me'],
  ['font/headline/md', 'headline-md', 'Trail Journal'],
  ['font/headline/sm', 'headline-sm', 'Design systems'],
  ['font/caption/md', 'caption-md', 'Sam Taylor'],
  ['font/body/md/default', 'body-md', 'A basic understanding of HTML and CSS helps.'],
  ['font/body/md/strong', 'body-md-strong', 'A basic understanding of HTML and CSS helps.'],
  ['font/link/inline', 'link-inline', 'An inline link', 'text-decoration: underline'],
  ['font/link/md', 'link-md', 'find out more →'],
  ['font/button/md', 'button-md', 'Contact'],
  ['font/navigation/md', 'navigation-md', 'about.'],
];

export const Typography = {
  render: () => `${styles}<div class="fd"><section>
    <h2>Text styles · sizes change at 800px and 1280px</h2>
    ${textStyles
      .map(([figma, token, sample, extra = '']) => `<div class="fd-row">
        <div class="fd-name">${figma}<code>--text-${token}</code></div>
        <div style="font: var(--text-${token}); letter-spacing: var(--text-${token}-tracking); ${extra}">${sample}</div>
      </div>`)
      .join('')}
  </section></div>`,
};

export const Spacing = {
  render: () => `${styles}<div class="fd"><section>
    <h2>Space primitives</h2>
    ${steps
      .map((s) => `<div class="fd-row">
        <div class="fd-name">space/${s}<code>--space-${s}</code></div>
        <div style="height: 16px; width: var(--space-${s}); background: var(--color-brand-500); border-radius: 2px"></div>
      </div>`)
      .join('')}
    <div class="fd-row">
      <div class="fd-name">radius/md<code>--radius-md</code></div>
      <div style="height: 48px; width: 96px; border-radius: var(--radius-md); background: var(--color-action-primary-default)"></div>
    </div>
  </section></div>`,
};
