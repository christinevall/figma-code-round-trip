import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { fn } from 'storybook/test'
import { nav } from '@/data/site'
import { SiteHeader } from './site-header'

const meta = {
  title: 'Organisms/SiteHeader',
  component: SiteHeader,
  args: { nav, onNavigate: fn(), onSearch: fn(), onContact: fn() },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sticky header. From 768px: brand mark, nav links (active section underlined), search with ⌘K tooltip, theme toggle, contact. Below 768px: brand mark, search, menu sheet. The brand progress bar at the bottom follows the scroll.\n\n**Figma:** component set `SiteHeader`, property `breakpoint` (desktop, mobile).',
      },
    },
  },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
}
