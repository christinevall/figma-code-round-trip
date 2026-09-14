import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckList } from './check-list'

const meta = {
  title: 'Molecules/CheckList',
  component: CheckList,
  args: {
    items: ['Faceted filters for difficulty, duration and season', 'Stage-by-stage breakdown with elevation profile', 'Coded prototype tested with 12 hikers'],
  },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
  parameters: {
    docs: { description: { component: 'List with brand check icons for project highlights.\n\n**Figma:** component `CheckList`.' } },
  },
} satisfies Meta<typeof CheckList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
