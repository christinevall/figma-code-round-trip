import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { profile } from '@/data/site'
import { About } from './about'

const meta = {
  title: 'Organisms/About',
  component: About,
  args: { image: profile.portrait, imageAlt: profile.portraitAlt, body: profile.about, onContact: fn() },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Portrait and intro with an `outline-strong` contact `Button`. Image moves above the text below 768px.\n\n**Figma:** component set `About`, property `breakpoint`.' } },
  },
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
