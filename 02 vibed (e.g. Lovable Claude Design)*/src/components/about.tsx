import portrait from '@/assets/about-portrait.jpg'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { useUIState } from '@/lib/ui-state'

export function About() {
  const { setContactOpen } = useUIState()

  return (
    <section id="about" className="scroll-mt-20 py-14 sm:py-20 md:py-24">
      <div className="page-container grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <Reveal className="md:order-2">
          <div className="overflow-hidden bg-muted">
            <img src={portrait} alt="Portrait of James Jones" loading="lazy" className="aspect-[1105/1038] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100} className="md:px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About me</h2>
          <p className="mt-5 max-w-md leading-relaxed text-foreground/85">
            Welcome to my portfolio! I’m James, a UX and UI designer who loves turning complex ideas into interfaces that feel
            simple. I choose colours and typography that set the right mood and make content easy to read. Lately I spend
            most of my time designing with AI agents, and I believe intuitive design is key to guiding people effortlessly
            through their journey.
          </p>
          <Button
            variant="outline"
            onClick={() => setContactOpen(true)}
            className="mt-7 h-11 rounded-md border-2 border-foreground px-6 dark:border-foreground font-semibold"
          >
            Contact
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
