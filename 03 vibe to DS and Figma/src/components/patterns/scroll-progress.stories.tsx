import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollProgress } from './scroll-progress'

const meta = {
  title: 'Atoms/ScrollProgress',
  component: ScrollProgress,
  args: { value: 0.4 },
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } } },
  decorators: [(Story) => <div className="relative h-12 w-96 border-b">{Story()}</div>],
  parameters: {
    docs: { description: { component: 'Brand bar under the header showing how far the page is scrolled. Needs a positioned parent.\n\n**Figma:** component `ScrollProgress`.' } },
  },
} satisfies Meta<typeof ScrollProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
