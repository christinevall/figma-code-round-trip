import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ArrowLink } from './arrow-link'

const meta = {
  title: 'Molecules/ArrowLink',
  component: ArrowLink,
  args: { children: 'find out more', onClick: fn() },
  parameters: {
    docs: { description: { component: 'Text action with a trailing arrow. Opens a project from the work list.\n\n**Figma:** component `ArrowLink`.' } },
  },
} satisfies Meta<typeof ArrowLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
