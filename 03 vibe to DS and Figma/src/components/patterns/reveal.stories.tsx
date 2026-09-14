import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './heading'
import { Reveal } from './reveal'

const meta = {
  title: 'Utilities/Reveal',
  component: Reveal,
  args: { delay: 0, children: <Heading>Skills</Heading> },
  argTypes: { children: { control: false } },
  parameters: {
    docs: {
      description: {
        component: 'Motion wrapper: fades and lifts content in once it scrolls into view, using the `--duration-reveal` token. Does nothing visual with reduced motion. Not drawn in Figma.',
      },
    },
  },
} satisfies Meta<typeof Reveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
