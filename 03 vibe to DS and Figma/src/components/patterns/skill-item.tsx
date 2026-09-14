import type * as React from 'react'
import { Heading } from '@/components/patterns/heading'
import { Text } from '@/components/patterns/text'
import { cn } from '@/lib/utils'

/** A titled paragraph under a strong top rule. Used for the three skills. */
function SkillItem({
  heading,
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  heading: string
}) {
  return (
    <div data-slot="skill-item" className={cn('border-t border-border-strong pt-6', className)} {...props}>
      <Heading as="h3" size="sm">
        {heading}
      </Heading>
      <Text variant="prose-sm" tone="prose" className="mt-3">
        {children}
      </Text>
    </div>
  )
}

export { SkillItem }
