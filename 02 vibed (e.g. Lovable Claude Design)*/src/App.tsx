import { About } from '@/components/about'
import { ContactDialog } from '@/components/contact-dialog'
import { Hero } from '@/components/hero'
import { ProjectDialog } from '@/components/project-dialog'
import { SiteFooter, BackToTop } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Skills } from '@/components/skills'
import { Work } from '@/components/work'
import { UIStateProvider } from '@/lib/ui-state'

export default function App() {
  return (
    <UIStateProvider>
      <div id="top" className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Work />
          <About />
          <Skills />
        </main>
        <SiteFooter />
      </div>
      <BackToTop />
      <ProjectDialog />
      <ContactDialog />
    </UIStateProvider>
  )
}
