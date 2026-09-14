import { Heading } from '@/components/patterns/heading'
import { Reveal } from '@/components/patterns/reveal'
import { Text } from '@/components/patterns/text'
import { Button } from '@/components/ui/button'

export interface AboutProps {
  image: string
  imageAlt: string
  body: string
  onContact: () => void
}

/** Portrait and intro text side by side (image on the right from 768px) with a contact button. */
function About({ image, imageAlt, body, onContact }: AboutProps) {
  return (
    <section id="about" data-slot="about" className="scroll-mt-20 py-14 sm:py-20 md:py-24">
      <div className="page-container grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <Reveal className="md:order-2">
          <div className="overflow-hidden bg-muted">
            <img src={image} alt={imageAlt} loading="lazy" className="aspect-[1105/1038] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100} className="md:px-4">
          <Heading>About me</Heading>
          <Text tone="prose" className="mt-5 max-w-md">
            {body}
          </Text>
          <Button variant="outline-strong" size="xl" className="mt-7" onClick={onContact}>
            Contact
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export { About }
