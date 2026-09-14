import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkIcon, SearchIcon, SendIcon } from 'lucide-react'
import { fn } from 'storybook/test'
import { Button } from './button'

const variants = ['default', 'outline', 'outline-strong', 'secondary', 'ghost', 'destructive', 'link'] as const
const sizes = ['xs', 'sm', 'default', 'lg', 'xl'] as const
const iconSizes = ['icon-xs', 'icon-sm', 'icon', 'icon-lg', 'icon-xl'] as const

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: [...sizes, ...iconSizes] },
    asChild: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The one clickable action (shadcn/ui). `variant` sets emphasis, `size` sets height. In the portfolio: `xl` for contact CTAs, `lg` inside dialogs, `icon-lg` in the header, `icon-xl` for back-to-top. Use `asChild` to render a link that looks like a button.\n\n**Figma:** component set `Button`, properties `variant` × `size`.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-3">
      {iconSizes.map((size) => (
        <Button key={size} {...args} variant="outline" size={size} aria-label="Search">
          <SearchIcon />
        </Button>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <SendIcon /> Send message
      </>
    ),
  },
}

export const HeaderContact: Story = {
  name: 'In use: header contact',
  args: { size: 'xl', children: 'contact' },
}

export const AboutContact: Story = {
  name: 'In use: about contact',
  args: { variant: 'outline-strong', size: 'xl', children: 'Contact' },
}

export const CopyLink: Story = {
  name: 'In use: copy link',
  args: {
    variant: 'outline',
    size: 'lg',
    children: (
      <>
        <LinkIcon /> Copy link
      </>
    ),
  },
}

export const Disabled: Story = {
  args: { disabled: true, size: 'lg', children: 'Sending…' },
}
