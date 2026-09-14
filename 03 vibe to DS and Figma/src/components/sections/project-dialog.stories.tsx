import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { categories, projects } from '@/data/site'
import { ProjectDialog } from './project-dialog'

const meta = {
  title: 'Organisms/ProjectDialog',
  component: ProjectDialog,
  args: { project: projects[1], projects, categories, onNavigate: fn(), onContact: fn() },
  argTypes: { project: { control: false }, projects: { control: false }, categories: { control: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '900px' },
      description: {
        component: 'Case study in a dialog: image, `Badge`s, title, `StatList`, description, `CheckList`, actions, previous/next. Arrow keys switch projects.\n\n**Figma:** component `ProjectDialog`.',
      },
    },
  },
} satisfies Meta<typeof ProjectDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
