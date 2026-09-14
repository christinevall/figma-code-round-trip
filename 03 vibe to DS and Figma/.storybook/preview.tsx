import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { Toaster } from '../src/components/ui/sonner'
import { TooltipProvider } from '../src/components/ui/tooltip'
import { ComponentDocsPage } from './docs/component-docs-page'
import { sourceFor } from './docs/sources'
import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      // "Code" panel next to Controls shows the JSX of the current story
      codePanel: true,
      // The code snippet under every story preview on docs pages is open by default
      canvas: { sourceState: 'shown' },
      // A story with no props renders as a bare tag like <BlogPage />. Show the file's real code instead.
      source: {
        transform: (code: string, context: { parameters: Record<string, unknown> }) =>
          /^<\w+\s*\/>$/.test(code.trim()) ? (sourceFor(context.parameters).code ?? code) : code,
      },
      // Every autodocs page also shows the component source and its generated CSS
      page: ComponentDocsPage,
      toc: true,
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Tokens', 'Colors', 'Typography', 'Spacing, radius & shadow'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Pages',
          'Playground',
          ['Introduction', 'Blog built in Storybook', 'Blog from Figma'],
          'Utilities',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <div className="bg-background text-foreground">
          <Story />
        </div>
        <Toaster position="bottom-center" />
      </TooltipProvider>
    ),
    withThemeByClassName({ themes: { light: '', dark: 'dark' }, defaultTheme: 'light' }),
  ],
}

export default preview
