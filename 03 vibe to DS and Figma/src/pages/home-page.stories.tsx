import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { UIStateProvider } from '@/lib/ui-state'
import { HomePage } from './home-page'

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <UIStateProvider>{Story()}</UIStateProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '900px' },
      description: {
        component:
          'The whole portfolio, assembled only from organisms. This is the one place that reads `src/data/site.ts` and app state.\n\n**Figma:** page `Home` → frames `Home / Desktop` and `Home / Mobile`, built from component instances.',
      },
    },
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
