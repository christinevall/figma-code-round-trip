import { Reveal } from '@/components/reveal'
import { profile } from '@/data/site'
import { useUIState } from '@/lib/ui-state'

export function Hero() {
  const { setContactOpen } = useUIState()

  return (
    <section className="page-container pt-8 pb-12 text-center sm:pt-10 sm:pb-16">
      <Reveal>
        <button
          onClick={() => setContactOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {profile.availability}
        </button>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 text-lg sm:text-xl">{profile.name}</p>
      </Reveal>
      <Reveal delay={160}>
        <h1 className="mt-2 text-[clamp(2.6rem,9vw,5.25rem)] leading-[1.05] font-extrabold tracking-tight uppercase sm:mt-3">
          UX. UI.
          <br />
          Agentic AI.
        </h1>
      </Reveal>
    </section>
  )
}
