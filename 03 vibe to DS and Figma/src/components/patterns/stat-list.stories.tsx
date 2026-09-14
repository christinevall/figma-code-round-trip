import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatList } from './stat-list'

const meta = {
  title: 'Molecules/StatList',
  component: StatList,
  args: {
    stats: [
      { label: 'Routes', value: '140' },
      { label: 'Interviews', value: '12' },
      { label: 'Task success', value: '92%' },
    ],
  },
  decorators: [(Story) => <div className="w-[28rem]">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'Key figures in a bordered, divided row. Semantic `dl`: label (`dt`) comes first in the DOM, the value is shown on top.\n\n**Figma:** component `StatList`.',
      },
    },
  },
} satisfies Meta<typeof StatList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
