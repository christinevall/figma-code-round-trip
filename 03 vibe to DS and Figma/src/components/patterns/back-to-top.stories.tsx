import type { Meta, StoryObj } from '@storybook/react-vite'
import { BackToTop } from './back-to-top'

const meta = {
  title: 'Molecules/BackToTop',
  component: BackToTop,
  args: { threshold: -1 },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '160px' },
      description: {
        component: 'Round floating button, fixed bottom right. Appears after scrolling past `threshold` (800px in the app; -1 here so it is always visible).\n\n**Figma:** component `BackToTop`.',
      },
    },
  },
} satisfies Meta<typeof BackToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
