import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandMark } from './brand-mark'

const meta = {
  title: 'Atoms/BrandMark',
  component: BrandMark,
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  parameters: {
    docs: {
      description: { component: 'The orange dot logo. `md` in the header (36px, 40px from 640px), `sm` in the mobile menu title.\n\n**Figma:** component set `BrandMark`, property `size`.' },
    },
  },
} satisfies Meta<typeof BrandMark>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = { args: { size: 'md' } }
export const Small: Story = { args: { size: 'sm' } }
