import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { Text } from '@/components/patterns/text'
import { Badge } from '@/components/ui/badge'
import { BlogFromFigma } from './blog-from-figma'
import { figmaSource } from './blog-from-figma-data'

const meta = {
  title: 'Playground/Blog from Figma',
  component: BlogFromFigma,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {/* Label bar: not part of the page, only marks where this prototype came from */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b bg-muted px-4 py-2">
          <Badge variant="brand">From Figma</Badge>
          <Text as="span" variant="caption-strong">
            {figmaSource.file} · {figmaSource.page} · {figmaSource.frame}
          </Text>
          <Text as="span" variant="caption" tone="muted">
            node {figmaSource.nodeId} · imported {figmaSource.importedOn} ·{' '}
            <a href={figmaSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              open in Figma
            </a>
          </Text>
        </div>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ds: { source: 'playground/blog-from-figma.tsx' },
    docs: {
      story: { inline: false, height: '900px' },
      description: {
        component: [
          `**Imported from Figma.** File *${figmaSource.file}*, page *${figmaSource.page}*, frame *${figmaSource.frame}* (node \`${figmaSource.nodeId}\`), imported ${figmaSource.importedOn}. [Open the frame in Figma](${figmaSource.url}).`,
          'Rebuilt 1:1 from the Figma instances with the same code components. Content is in `src/playground/blog-from-figma-data.ts`. Compare it with **Playground / Blog built in Storybook**, made from code without looking at Figma.',
          '**Where the import can’t match Figma**',
          '- The featured post’s link reads “find out more”: the text is fixed inside `ProjectRow` in code. In Figma it was overridden to “read the post”.',
          '- The second post’s badge says “Figma”, but there is no Figma tab, so that post has no filter category. The tabs are shown but don’t filter, like the static frame.',
          '- Figma drew desktop only. Mobile here is what the components do on their own, not a Figma design.',
          '- Links, search, subscribe and post clicks show a toast: the Figma frame has no behaviour to import.',
        ].join('\n\n'),
      },
    },
  },
} satisfies Meta<typeof BlogFromFigma>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
