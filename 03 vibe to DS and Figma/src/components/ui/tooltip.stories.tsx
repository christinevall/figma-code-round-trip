import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  args: { defaultOpen: true },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Short hint on hover or focus (shadcn/ui, Radix). Needs `TooltipProvider` (already in the app root and in Storybook).\n\n**Figma:** component `TooltipContent`.',
      },
    },
  },
  decorators: [(Story) => <div className="p-12">{Story()}</div>],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = {
  name: 'In use: search',
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-lg" aria-label="Search">
          <SearchIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Search <kbd className="ml-1 font-sans opacity-70">⌘K</kbd>
      </TooltipContent>
    </Tooltip>
  ),
}
