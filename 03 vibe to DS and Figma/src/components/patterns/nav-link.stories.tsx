import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavLink } from './nav-link'

const meta = {
  title: 'Molecules/NavLink',
  component: NavLink,
  args: { children: 'work.', href: '#work', active: false },
  parameters: {
    docs: {
      description: { component: 'Header nav link. `active` shows the brand underline for the section in view and sets `aria-current`.\n\n**Figma:** component set `NavLink`, property `active`.' },
    },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Active: Story = { args: { active: true } }

export const Group: Story = {
  render: () => (
    <nav className="flex gap-1">
      <NavLink href="#about" active>
        about.
      </NavLink>
      <NavLink href="#work">work.</NavLink>
      <NavLink href="#blog">blog.</NavLink>
    </nav>
  ),
}
