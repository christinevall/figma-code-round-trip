import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'

const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
  args: { defaultOpen: true },
  parameters: {
    docs: {
      story: { inline: false, height: '420px' },
      description: {
        component:
          'Modal container (shadcn/ui, Radix). Focus is trapped, Escape closes. The portfolio builds `ProjectDialog`, `ContactDialog` and the imprint on top of it.\n\n**Figma:** component `DialogContent`.',
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Imprint: Story = {
  name: 'In use: imprint',
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Imprint</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Imprint</DialogTitle>
          <DialogDescription>Replace this with your legal details.</DialogDescription>
        </DialogHeader>
        <address className="text-prose-sm not-italic">
          James Jones
          <br />
          Street 1, 12345 City
        </address>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
}
