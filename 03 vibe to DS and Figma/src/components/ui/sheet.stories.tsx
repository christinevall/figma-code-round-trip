import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

const meta = {
  title: 'Organisms/Sheet',
  component: Sheet,
  args: { defaultOpen: true },
  parameters: {
    docs: {
      story: { inline: false, height: '480px' },
      description: { component: 'Panel that slides in from an edge (shadcn/ui, Radix dialog). `MobileNav` uses it from the right. No separate Figma component; see `MobileNav`.' },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Site navigation</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
