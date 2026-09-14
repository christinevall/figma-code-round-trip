import type { Meta, StoryObj } from '@storybook/react-vite'
import { skills } from '@/data/site'
import { Skills } from './skills'

const meta = {
  title: 'Organisms/Skills',
  component: Skills,
  args: { skills },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Section heading and three `SkillItem`s.\n\n**Figma:** component set `Skills`, property `breakpoint`.' } },
  },
} satisfies Meta<typeof Skills>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
