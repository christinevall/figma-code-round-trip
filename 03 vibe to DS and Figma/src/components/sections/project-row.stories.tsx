import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { projects } from '@/data/site'
import { ProjectRow } from './project-row'

const meta = {
  title: 'Organisms/ProjectRow',
  component: ProjectRow,
  args: { project: projects[1], shaded: false, onOpen: fn() },
  argTypes: { project: { control: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'One project: `ProjectMedia`, title `Heading`, summary `Text`, `TagList`, `ArrowLink`. `shaded` switches to the section background.\n\n**Figma:** component set `ProjectRow`, properties `shaded` and `breakpoint`.',
      },
    },
  },
} satisfies Meta<typeof ProjectRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Shaded: Story = { args: { shaded: true } }
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
