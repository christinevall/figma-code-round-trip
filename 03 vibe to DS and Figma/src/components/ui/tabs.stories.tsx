import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsList, TabsTrigger } from './tabs'

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  args: { defaultValue: 'all' },
  parameters: {
    docs: {
      description: {
        component:
          'Segmented control (shadcn/ui, Radix). The portfolio uses `TabsList` + `TabsTrigger` without panels, as a filter for the work list.\n\n**Figma:** components `TabsList` and `TabsTrigger` (property `active`).',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const WorkFilter: Story = {
  name: 'In use: work filter',
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        {['All', 'Product', 'Agentic AI', 'Templates'].map((label) => (
          <TabsTrigger key={label} value={label === 'All' ? 'all' : label} className="px-2 sm:px-3">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ),
}

export const Line: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="product">Product</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
