import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { profile } from '@/data/site'
import { SiteFooter } from './site-footer'

const meta = {
  title: 'Organisms/SiteFooter',
  component: SiteFooter,
  args: { copyrightHolder: profile.copyrightHolder, imprint: [profile.name, ...profile.address, profile.email], onContact: fn() },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Footer band in `footer` / `footer-foreground` colors with copyright, imprint dialog and contact.\n\n**Figma:** component `SiteFooter`.' } },
  },
} satisfies Meta<typeof SiteFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
