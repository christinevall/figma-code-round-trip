import { useState, type MouseEvent } from 'react'
import { BackToTop } from '@/components/patterns/back-to-top'
import { About } from '@/components/sections/about'
import { CommandMenu } from '@/components/sections/command-menu'
import { ContactDialog } from '@/components/sections/contact-dialog'
import { Hero } from '@/components/sections/hero'
import { ProjectDialog } from '@/components/sections/project-dialog'
import { SiteFooter } from '@/components/sections/site-footer'
import { SiteHeader } from '@/components/sections/site-header'
import { Skills } from '@/components/sections/skills'
import { Work } from '@/components/sections/work'
import { categories, nav, profile, projects, skills, type NavItem } from '@/data/site'
import { comingSoon, copyEmail, useUIState } from '@/lib/ui-state'

/** The one-page portfolio. The only place that knows about data and app state; every section below is props-only. */
export function HomePage() {
  const { contactOpen, setContactOpen, activeProject, openProject } = useUIState()
  const [commandOpen, setCommandOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  function onNavigate(item: NavItem, event: MouseEvent<HTMLAnchorElement>) {
    if (item.id === 'blog') {
      event.preventDefault()
      comingSoon()
    }
  }

  return (
    <>
      <div id="top" className="flex min-h-dvh flex-col">
        <SiteHeader nav={nav} onNavigate={onNavigate} onSearch={() => setCommandOpen(true)} onContact={openContact} />
        <main className="flex-1">
          <Hero name={profile.name} availability={profile.availability} headline={profile.headline} onContact={openContact} />
          <Work projects={projects} categories={categories} onOpenProject={openProject} />
          <About image={profile.portrait} imageAlt={profile.portraitAlt} body={profile.about} onContact={openContact} />
          <Skills skills={skills} />
        </main>
        <SiteFooter copyrightHolder={profile.copyrightHolder} imprint={[profile.name, ...profile.address, profile.email]} onContact={openContact} />
      </div>
      <BackToTop />
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        projects={projects}
        onOpenProject={openProject}
        onContact={openContact}
        onCopyEmail={copyEmail}
        onBlog={comingSoon}
      />
      <ProjectDialog
        project={activeProject}
        projects={projects}
        categories={categories}
        onNavigate={openProject}
        onContact={() => {
          openProject(null)
          openContact()
        }}
      />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} email={profile.email} onCopyEmail={copyEmail} />
    </>
  )
}
