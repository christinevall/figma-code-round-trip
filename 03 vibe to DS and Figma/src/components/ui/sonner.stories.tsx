import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './sonner'

const meta = {
  title: 'Organisms/Toaster',
  component: Toaster,
  parameters: {
    docs: {
      story: { inline: false, height: '240px' },
      description: {
        component:
          'Toast notifications (shadcn/ui wrapper around sonner), styled with the popover tokens. Mounted once at the app root; call `toast()` anywhere. Not drawn in Figma.',
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success('Email copied', { description: 'hello@example.com' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast('The blog is coming soon', { description: "I'm writing the first posts right now." })}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.error('Could not copy', { description: 'hello@example.com' })}>
        Error
      </Button>
    </div>
  ),
}
