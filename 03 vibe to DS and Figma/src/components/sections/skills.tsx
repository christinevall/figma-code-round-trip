import { Heading } from '@/components/patterns/heading'
import { Reveal } from '@/components/patterns/reveal'
import { SkillItem } from '@/components/patterns/skill-item'

export interface SkillsProps {
  skills: { title: string; body: string }[]
}

/** Section heading and a three-column list of skills (stacked below 768px). */
function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" data-slot="skills" className="scroll-mt-20 pt-6 pb-16 sm:pb-24">
      <div className="page-container">
        <Reveal>
          <Heading>Skills</Heading>
        </Reveal>
        <div className="mt-8 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {skills.map((skill, i) => (
            <Reveal key={skill.title} delay={i * 100}>
              <SkillItem heading={skill.title}>{skill.body}</SkillItem>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skills }
