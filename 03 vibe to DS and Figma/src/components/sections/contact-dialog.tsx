import { useState, type FormEvent } from 'react'
import { CopyIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ChoiceChip } from '@/components/patterns/choice-chip'
import { FormField } from '@/components/patterns/form-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const MAX_MESSAGE = 500

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onCopyEmail: () => void
  topics?: string[]
}

/** Contact form in a dialog: topic chips, name, email, message with counter, inline validation, sending state. */
function ContactDialog({ open, onOpenChange, email, onCopyEmail, topics = ['New project', 'Collaboration', 'Just saying hi'] }: ContactDialogProps) {
  const [topic, setTopic] = useState(topics[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const address = String(data.get('email') ?? '').trim()

    const nextErrors: Errors = {}
    if (!name) nextErrors.name = 'Please tell me your name.'
    if (!/^\S+@\S+\.\S+$/.test(address)) nextErrors.email = 'That email doesn’t look right.'
    if (message.trim().length < 10) nextErrors.message = 'A few more words, please (10+ characters).'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    // Swap this timeout for a real request (Formspree, Resend, Supabase…).
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSending(false)
    onOpenChange(false)
    form.reset()
    setMessage('')
    setTopic(topics[0])
    toast.success('Message sent', { description: `Thanks ${name.split(' ')[0]}, I’ll get back to you within 48 hours.` })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setErrors({})
      }}
    >
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-heading-lg">Let’s talk</DialogTitle>
          <DialogDescription>Tell me a little about what you have in mind. I usually reply within two days.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <fieldset className="grid gap-2">
            <legend className="mb-2 text-label-md">What’s it about?</legend>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <ChoiceChip key={t} pressed={topic === t} onClick={() => setTopic(t)}>
                  {t}
                </ChoiceChip>
              ))}
            </div>
            <input type="hidden" name="topic" value={topic} />
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="name" label="Name" error={errors.name}>
              <Input name="name" autoComplete="name" placeholder="Alex Doe" className="h-10" />
            </FormField>
            <FormField id="email" label="Email" error={errors.email}>
              <Input name="email" type="email" autoComplete="email" placeholder="alex@studio.com" className="h-10" />
            </FormField>
          </div>

          <FormField id="message" label="Message" error={errors.message} hint={`${message.length}/${MAX_MESSAGE}`}>
            <Textarea
              name="message"
              rows={5}
              maxLength={MAX_MESSAGE}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I’m working on…"
              className="min-h-28 resize-none"
            />
          </FormField>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="ghost" size="lg" onClick={onCopyEmail} className="text-muted-foreground">
              <CopyIcon /> {email}
            </Button>
            <Button type="submit" size="lg" disabled={sending}>
              {sending ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
              {sending ? 'Sending…' : 'Send message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ContactDialog }
