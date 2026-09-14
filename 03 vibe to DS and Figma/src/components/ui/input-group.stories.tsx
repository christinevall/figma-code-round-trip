import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
  parameters: {
    docs: {
      description: { component: 'Input with add-ons such as an icon or button (shadcn/ui). Used inside `CommandInput`. No Figma component yet.' },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search projects…" aria-label="Search" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
}
