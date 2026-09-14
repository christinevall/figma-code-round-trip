import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { profile } from '@/data/site'
import { Hero } from './hero'

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  args: { name: profile.name, availability: profile.availability, headline: profile.headline, onContact: fn() },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Centered intro: `StatusPill`, name (`Text`), display `Heading`.\n\n**Figma:** component set `Hero`, property `breakpoint`.' } },
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
