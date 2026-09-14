import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ContactDialog } from './contact-dialog'

const meta = {
  title: 'Organisms/ContactDialog',
  component: ContactDialog,
  args: { open: true, onOpenChange: fn(), email: 'hello@example.com', onCopyEmail: fn() },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '720px' },
      description: {
        component:
          'Contact form: `ChoiceChip` topics, `FormField` + `Input`/`Textarea`, validation on submit, sending state, success toast. Submit empty to see the error states.\n\n**Figma:** component set `ContactDialog`, property `state` (default, invalid).',
      },
    },
  },
} satisfies Meta<typeof ContactDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
