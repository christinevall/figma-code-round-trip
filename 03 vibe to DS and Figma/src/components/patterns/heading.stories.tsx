import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './heading'

const sizes = ['display', '2xl', 'xl', 'lg', 'md', 'sm', 'section', 'title'] as const

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  args: { children: 'About me', as: 'h2', size: 'section' },
  argTypes: {
    size: { control: 'select', options: sizes },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    asChild: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Every heading in the app. `as` is the outline level, `size` is the text style. `section` and `title` are responsive presets built from two text styles.\n\n| size | text style | Figma text style |\n|---|---|---|\n| display | text-display (+ uppercase) | display / display-sm |\n| 2xl | text-heading-2xl | heading-2xl |\n| xl | text-heading-xl | heading-xl |\n| lg | text-heading-lg | heading-lg |\n| md | text-heading-md | heading-md |\n| sm | text-heading-sm | heading-sm |\n| section | heading-xl → heading-2xl at 640px | both |\n| title | heading-xl → heading-2xl at 1024px | both |',
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Scale: Story = {
  render: () => (
    <div className="grid gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-baseline gap-6">
          <code className="w-20 shrink-0 text-caption text-muted-foreground">{size}</code>
          <Heading size={size}>{size === 'display' ? 'UX. UI.' : 'Alpine Tracker'}</Heading>
        </div>
      ))}
    </div>
  ),
}

export const Display: Story = {
  name: 'In use: hero',
  args: { as: 'h1', size: 'display', children: 'UX. UI. Agentic AI.' },
}
