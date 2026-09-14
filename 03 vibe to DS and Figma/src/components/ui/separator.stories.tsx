import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator'

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
  decorators: [(Story) => <div className="flex h-24 w-64 items-center justify-center">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'Hairline divider in `border` color (shadcn/ui). Kept in the system but not used by the portfolio today.\n\n**Figma:** component set `Separator`, property `orientation`.',
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}
export const Vertical: Story = { args: { orientation: 'vertical' } }
