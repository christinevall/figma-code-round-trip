import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './text'

const variants = ['body-xl', 'body-lg', 'body-sm', 'prose-md', 'prose-sm', 'label-md', 'label-strong', 'caption', 'caption-strong'] as const

const meta = {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'A route planner for multi-day hut treks in the Alps. I designed the filters, route cards and stage breakdowns.',
    variant: 'prose-md',
    tone: 'default',
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    tone: { control: 'inline-radio', options: ['default', 'prose', 'muted', 'destructive'] },
    as: { control: 'select', options: ['p', 'span', 'div', 'dt', 'dd', 'li', 'legend', 'address'] },
  },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          'Body copy, labels and captions. `variant` is the text style (same name in CSS and Figma), `tone` is the color role: `prose` for paragraphs, `muted` for meta, `destructive` for errors.',
      },
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Scale: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {variants.map((variant) => (
        <div key={variant} className="grid gap-1">
          <code className="text-caption text-muted-foreground">{variant}</code>
          <Text {...args} variant={variant}>
            Selected work · 4 projects
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Tones: Story = {
  render: (args) => (
    <div className="grid gap-2">
      {(['default', 'prose', 'muted', 'destructive'] as const).map((tone) => (
        <Text key={tone} {...args} variant="body-sm" tone={tone}>
          {tone}: That email doesn’t look right.
        </Text>
      ))}
    </div>
  ),
}
