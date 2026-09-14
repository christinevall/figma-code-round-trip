import type { Meta, StoryObj } from '@storybook/react-vite'
import { FolderOpenIcon, MailIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './command'

const meta = {
  title: 'Organisms/Command',
  component: Command,
  decorators: [(Story) => <div className="w-96 rounded-xl ring-1 ring-foreground/10">{Story()}</div>],
  parameters: {
    docs: { description: { component: 'Searchable command list (shadcn/ui on cmdk). `CommandMenu` puts it in a dialog. No separate Figma component; see `CommandMenu`.' } },
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  render: (args) => (
    <Command {...args}>
      <CommandInput placeholder="Search projects, sections, actions…" />
      <CommandList>
        <CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem>
            <FolderOpenIcon /> moonblocks <CommandShortcut>2026</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FolderOpenIcon /> Alpine Tracker <CommandShortcut>2026</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <MailIcon /> Send a message
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
