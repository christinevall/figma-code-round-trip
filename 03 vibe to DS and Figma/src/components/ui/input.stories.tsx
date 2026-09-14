import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: { placeholder: 'alex@studio.com', type: 'email', 'aria-label': 'Email' },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text field (shadcn/ui). Wrap it in `FormField` for a label, hint and error. Set `aria-invalid` for the error style.\n\n**Figma:** component set `Input`, property `state` (default, invalid, disabled).',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'alex@studio.com' } }
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'alex@' } }
export const Disabled: Story = { args: { disabled: true } }
