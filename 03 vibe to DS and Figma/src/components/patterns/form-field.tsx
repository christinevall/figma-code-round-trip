import { cloneElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/patterns/text'
import { cn } from '@/lib/utils'

/**
 * Label + control + hint + error. Wires `id`, `aria-invalid` and `aria-describedby`
 * onto the control so the hint and error are announced.
 */
function FormField({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  /** Passed to the control and used to build the hint and error ids. */
  id: string
  label: ReactNode
  /** Short helper shown right of the label, e.g. a character counter. */
  hint?: ReactNode
  /** Error message. When set, the control is marked invalid. */
  error?: string
  className?: string
  /** A single form control, e.g. <Input /> or <Textarea />. */
  children: ReactElement<HTMLAttributes<HTMLElement>>
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div data-slot="form-field" data-invalid={error ? true : undefined} className={cn('grid gap-2', className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {hint && (
          <Text as="span" id={hintId} variant="caption" tone="muted" className="tabular-nums">
            {hint}
          </Text>
        )}
      </div>
      {cloneElement(children, { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {error && (
        <Text id={errorId} variant="caption" tone="destructive">
          {error}
        </Text>
      )}
    </div>
  )
}

export { FormField }
