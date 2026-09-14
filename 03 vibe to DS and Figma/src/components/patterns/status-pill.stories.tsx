import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { StatusPill } from './status-pill'

const meta = {
  title: 'Molecules/StatusPill',
  component: StatusPill,
  args: { children: 'Available for new projects', pulse: true, onClick: fn() },
  parameters: {
    docs: {
      description: { component: 'Availability pill above the hero. Clicking it opens the contact dialog.\n\n**Figma:** component `StatusPill`.' },
    },
  },
} satisfies Meta<typeof StatusPill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoPulse: Story = { args: { pulse: false } }
