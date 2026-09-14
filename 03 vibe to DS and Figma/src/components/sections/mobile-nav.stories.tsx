import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { fn } from 'storybook/test'
import { nav } from '@/data/site'
import { MobileNav } from './mobile-nav'

const meta = {
  title: 'Organisms/MobileNav',
  component: MobileNav,
  args: { nav, onNavigate: fn(), onContact: fn(), defaultOpen: true },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      story: { inline: false, height: '640px' },
      description: { component: 'Menu button plus right-hand sheet with big nav links, theme toggle and contact. Used by `SiteHeader` below 768px.\n\n**Figma:** component `MobileNav`.' },
    },
  },
} satisfies Meta<typeof MobileNav>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const Closed: Story = { args: { defaultOpen: false } }
