import { Reveal } from '@/components/reveal'
import { skills } from '@/data/site'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 pt-6 pb-16 sm:pb-24">
      <div className="page-container">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
        </Reveal>
        <div className="mt-8 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {skills.map((skill, i) => (
            <Reveal key={skill.title} delay={i * 100} className="border-t border-foreground/25 pt-6">
              <h3 className="text-lg font-bold">{skill.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{skill.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
