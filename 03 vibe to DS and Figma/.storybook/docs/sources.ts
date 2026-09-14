// Raw source of every component, page and playground file, so docs can show the real implementation.
const sources = import.meta.glob(['../../src/{components,pages,playground}/**/*.tsx', '!../../src/**/*.stories.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/**
 * The file a story documents. By convention `button.stories.tsx` documents `button.tsx`.
 * Override with `parameters.ds.source` (path relative to src, e.g. 'components/ui/button.tsx').
 */
export function sourceFor(parameters: Record<string, unknown>): { file: string; code: string | undefined } {
  const override = (parameters.ds as { source?: string } | undefined)?.source
  const storyFile = String(parameters.fileName ?? '')
  const file = override ? `src/${override}` : storyFile.replace(/^\.\//, '').replace(/\.stories\.tsx$/, '.tsx')
  return { file, code: sources[`../../${file}`] }
}
