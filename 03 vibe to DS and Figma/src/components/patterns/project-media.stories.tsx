import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import alpine from '@/assets/project-alpine.jpg'
import { ProjectMedia } from './project-media'

const meta = {
  title: 'Molecules/ProjectMedia',
  component: ProjectMedia,
  args: { src: alpine, label: 'Open Alpine Tracker', onClick: fn() },
  decorators: [(Story) => <div className="w-[32rem]">{Story()}</div>],
  parameters: {
    docs: {
      description: { component: '16:9 project image button. Hover or keyboard focus zooms the image and reveals the "View case study" chip.\n\n**Figma:** component `ProjectMedia`.' },
    },
  },
} satisfies Meta<typeof ProjectMedia>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hover: Story = { parameters: { pseudo: { hover: true } }, args: { className: 'group [&>img]:scale-[1.04] [&>span]:translate-y-0 [&>span]:opacity-100' } }
