import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta = {
  title: 'Molecules/Card',
  component: Card,
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'Surface for grouped content (shadcn/ui). Kept in the system but not used by the portfolio today. No Figma component yet.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>moonblocks</CardTitle>
        <CardDescription>Figma blocks for portfolio pages</CardDescription>
      </CardHeader>
      <CardContent>60+ responsive blocks on one 8px grid.</CardContent>
      <CardFooter>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  ),
}
