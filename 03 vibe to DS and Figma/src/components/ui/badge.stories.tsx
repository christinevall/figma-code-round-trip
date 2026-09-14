import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const variants = ['default', 'secondary', 'outline', 'subtle', 'brand', 'destructive', 'ghost', 'link'] as const

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: { variant: { control: 'select', options: variants }, asChild: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          'Small status or meta label (shadcn/ui). `brand` marks the project category, `outline` shows year and role, `subtle` is used for tags.\n\n**Figma:** component set `Badge`, property `variant`.',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

export const ProjectMeta: Story = {
  name: 'In use: project meta',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="brand">Templates</Badge>
      <Badge variant="outline">2026</Badge>
      <Badge variant="outline">Design & build</Badge>
    </div>
  ),
}
