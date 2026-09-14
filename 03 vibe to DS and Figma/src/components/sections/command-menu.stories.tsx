import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { projects } from '@/data/site'
import { CommandMenu } from './command-menu'

const meta = {
  title: 'Organisms/CommandMenu',
  component: CommandMenu,
  args: { open: true, onOpenChange: fn(), projects, onOpenProject: fn(), onContact: fn(), onCopyEmail: fn(), onBlog: fn() },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '520px' },
      description: { component: 'The ⌘K palette: projects, sections and actions in a dialog.\n\n**Figma:** component `CommandMenu`.' },
    },
  },
} satisfies Meta<typeof CommandMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
