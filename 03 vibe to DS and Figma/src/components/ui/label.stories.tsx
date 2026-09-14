import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  args: { children: 'Email', htmlFor: 'email' },
  parameters: {
    docs: { description: { component: 'Form label (shadcn/ui, Radix). Usually rendered for you by `FormField`.\n\n**Figma:** component `Label`.' } },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
