import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Hi! I’m working on…', rows: 5, 'aria-label': 'Message' },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text field (shadcn/ui). Grows with its content (`field-sizing: content`).\n\n**Figma:** component set `Textarea`, property `state`.',
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'Hi' } }
export const Disabled: Story = { args: { disabled: true } }
