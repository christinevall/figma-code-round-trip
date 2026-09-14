import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ChoiceChip } from './choice-chip'

const meta = {
  title: 'Atoms/ChoiceChip',
  component: ChoiceChip,
  args: { children: 'New project', pressed: false, onClick: fn() },
  parameters: {
    docs: {
      description: {
        component: 'Toggle chip for choosing one topic in the contact form. Uses `aria-pressed`.\n\n**Figma:** component set `ChoiceChip`, property `pressed`.',
      },
    },
  },
} satisfies Meta<typeof ChoiceChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Pressed: Story = { args: { pressed: true } }

export const TopicPicker: Story = {
  name: 'In use: topic picker',
  render: function Render() {
    const topics = ['New project', 'Collaboration', 'Just saying hi']
    const [topic, setTopic] = useState(topics[0])
    return (
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <ChoiceChip key={t} pressed={topic === t} onClick={() => setTopic(t)}>
            {t}
          </ChoiceChip>
        ))}
      </div>
    )
  },
}
