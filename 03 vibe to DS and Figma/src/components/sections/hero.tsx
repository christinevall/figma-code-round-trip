import { Fragment } from 'react'
import { Heading } from '@/components/patterns/heading'
import { Reveal } from '@/components/patterns/reveal'
import { StatusPill } from '@/components/patterns/status-pill'
import { Text } from '@/components/patterns/text'

export interface HeroProps {
  name: string
  availability: string
  /** Each entry is one line of the headline. */
  headline: string[]
  onContact: () => void
}

/** Centered intro: availability pill, name, uppercase display headline. */
function Hero({ name, availability, headline, onContact }: HeroProps) {
  return (
    <section data-slot="hero" className="page-container pt-8 pb-12 text-center sm:pt-10 sm:pb-16">
      <Reveal>
        <StatusPill onClick={onContact}>{availability}</StatusPill>
      </Reveal>
      <Reveal delay={80}>
        <Text variant="body-lg" className="mt-6 sm:text-body-xl">
          {name}
        </Text>
      </Reveal>
      <Reveal delay={160}>
        <Heading as="h1" size="display" className="mt-2 sm:mt-3">
          {headline.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </Heading>
      </Reveal>
    </section>
  )
}

export { Hero }
