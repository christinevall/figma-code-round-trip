import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { categories, projects } from '@/data/site'
import { Work } from './work'

const meta = {
  title: 'Organisms/Work',
  component: Work,
  args: { projects, categories, onOpenProject: fn() },
  argTypes: { projects: { control: false }, categories: { control: false } },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Count + category `Tabs`, then one `ProjectRow` per project with alternating shading.\n\n**Figma:** component `Work` (desktop) built from `ProjectRow` instances.' } },
  },
} satisfies Meta<typeof Work>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
