import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { ThemeToggle } from './theme-toggle'

const meta = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Sun/moon icon button that switches light and dark mode through next-themes. In Storybook it changes the whole preview, like the theme toolbar.\n\n**Figma:** component `ThemeToggle`.',
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
