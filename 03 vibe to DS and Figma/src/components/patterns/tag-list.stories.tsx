import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagList } from './tag-list'

const meta = {
  title: 'Molecules/TagList',
  component: TagList,
  args: { tags: ['UX research', 'Product design', 'React'] },
  parameters: {
    docs: { description: { component: 'Wrapping list of `Badge variant="subtle"`. Shows the tools behind a project.\n\n**Figma:** component `TagList` (instances of `Badge`).' } },
  },
} satisfies Meta<typeof TagList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
