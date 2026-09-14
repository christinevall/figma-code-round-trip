import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from './form-field'

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  args: { id: 'email', label: 'Email', children: <Input type="email" placeholder="alex@studio.com" /> },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          'Label, control, optional hint and error. It sets `id`, `aria-invalid` and `aria-describedby` on the control, so screen readers announce the hint and the error.\n\n**Figma:** component set `FormField`, property `state` (default, invalid).',
      },
    },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithError: Story = { args: { error: 'That email doesn’t look right.' } }
export const WithHint: Story = {
  args: { id: 'message', label: 'Message', hint: '0/500', children: <Textarea rows={5} placeholder="Hi! I’m working on…" className="min-h-28 resize-none" /> },
}
