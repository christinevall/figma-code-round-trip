import { useState, type FormEvent } from 'react'
import { CopyIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/data/site'
import { copyEmail, useUIState } from '@/lib/ui-state'
import { cn } from '@/lib/utils'

const topics = ['New project', 'Collaboration', 'Just saying hi']
const MAX_MESSAGE = 500

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactDialog() {
  const { contactOpen, setContactOpen } = useUIState()
  const [topic, setTopic] = useState(topics[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    const nextErrors: Errors = {}
    if (!name) nextErrors.name = 'Please tell me your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'That email doesn’t look right.'
    if (message.trim().length < 10) nextErrors.message = 'A few more words, please (10+ characters).'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    // Swap this timeout for a real request (Formspree, Resend, Supabase…).
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSending(false)
    setContactOpen(false)
    form.reset()
    setMessage('')
    setTopic(topics[0])
    toast.success('Message sent', { description: `Thanks ${name.split(' ')[0]}, I’ll get back to you within 48 hours.` })
  }

  return (
    <Dialog
      open={contactOpen}
      onOpenChange={(open) => {
        setContactOpen(open)
        if (!open) setErrors({})
      }}
    >
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">Let’s talk</DialogTitle>
          <DialogDescription>Tell me a little about what you have in mind. I usually reply within two days.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <fieldset className="grid gap-2">
            <legend className="mb-2 text-sm font-medium">What’s it about?</legend>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    topic === t ? 'border-foreground bg-foreground text-background' : 'hover:bg-muted',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <input type="hidden" name="topic" value={topic} />
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Name" error={errors.name}>
              <Input id="name" name="name" autoComplete="name" placeholder="Alex Doe" aria-invalid={!!errors.name} className="h-10" />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@studio.com"
                aria-invalid={!!errors.email}
                className="h-10"
              />
            </Field>
          </div>

          <Field id="message" label="Message" error={errors.message} hint={`${message.length}/${MAX_MESSAGE}`}>
            <Textarea
              id="message"
              name="message"
              rows={5}
              maxLength={MAX_MESSAGE}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I’m working on…"
              aria-invalid={!!errors.message}
              className="min-h-28 resize-none"
            />
          </Field>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="ghost" onClick={copyEmail} className="h-10 text-muted-foreground">
              <CopyIcon /> {profile.email}
            </Button>
            <Button type="submit" disabled={sending} className="h-10 px-5">
              {sending ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
              {sending ? 'Sending…' : 'Send message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {hint && <span className="text-xs text-muted-foreground tabular-nums">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
