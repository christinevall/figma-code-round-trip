import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkillItem } from './skill-item'

const meta = {
  title: 'Molecules/SkillItem',
  component: SkillItem,
  args: {
    heading: 'UX Design',
    children: 'I turn fuzzy problems into clear flows through research, journey mapping and quick prototypes I can put in front of real people.',
  },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
  parameters: {
    docs: { description: { component: 'Titled paragraph under a strong rule. Three of them make the skills section.\n\n**Figma:** component `SkillItem`.' } },
  },
} satisfies Meta<typeof SkillItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
