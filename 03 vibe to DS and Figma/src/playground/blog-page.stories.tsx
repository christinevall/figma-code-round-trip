import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'
import { BlogPage } from './blog-page'

const meta = {
  title: 'Playground/Blog built in Storybook',
  component: BlogPage,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '900px' },
      description: {
        component:
          'Prototype: a blog page built only from existing design-system components (SiteHeader, Hero, Tabs, ProjectRow, ProjectMedia, Badge, Heading, Text, ArrowLink, FormField, Input, Button, SiteFooter, BackToTop, ContactDialog). The filter, subscribe form and contact dialog work. Content lives in `src/playground/blog-data.ts`.',
      },
    },
  },
} satisfies Meta<typeof BlogPage>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
