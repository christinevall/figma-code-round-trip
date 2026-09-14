import { useState, type MouseEvent } from 'react'
import { MailIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ArrowLink } from '@/components/patterns/arrow-link'
import { BackToTop } from '@/components/patterns/back-to-top'
import { Heading } from '@/components/patterns/heading'
import { ProjectMedia } from '@/components/patterns/project-media'
import { Text } from '@/components/patterns/text'
import { ContactDialog } from '@/components/sections/contact-dialog'
import { Hero } from '@/components/sections/hero'
import { ProjectRow } from '@/components/sections/project-row'
import { SiteFooter } from '@/components/sections/site-footer'
import { SiteHeader } from '@/components/sections/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { nav, profile, type NavItem } from '@/data/site'
import { copyEmail } from '@/lib/ui-state'
import { figmaFeatured, figmaHero, figmaNewsletter, figmaPosts, figmaTabs } from './blog-from-figma-data'

const notInFigma = (what: string) => toast(what, { description: 'The Figma frame is static, so this has no behaviour in the import.' })

/**
 * Import of the Figma frame "Blog · Desktop 1280" (page Playground), rebuilt 1:1 with the same design-system
 * components the Figma instances point to. Layout mirrors the Figma auto layout frames: 24px toolbar gap below,
 * 80/96px around the post grid, 32px between cards, 64px around the newsletter.
 */
export function BlogFromFigma() {
  const [tab, setTab] = useState(figmaTabs[0])
  const [contactOpen, setContactOpen] = useState(false)

  function onNavigate(item: NavItem, event: MouseEvent<HTMLAnchorElement>) {
    if (item.id === 'blog') return
    event.preventDefault()
    notInFigma(`“${item.label}” link`)
  }

  return (
    <>
      <div id="top" className="flex min-h-dvh flex-col">
        <SiteHeader nav={nav} onNavigate={onNavigate} onSearch={() => notInFigma('Search')} onContact={() => setContactOpen(true)} />

        <main className="flex-1">
          <Hero name={figmaHero.name} availability={figmaHero.availability} headline={figmaHero.headline} onContact={() => setContactOpen(true)} />

          <section id="blog" aria-label="Posts" className="scroll-mt-20">
            {/* Figma: page-container · horizontal · space-between · gap 12 · padding-bottom 24 */}
            <div className="page-container flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <Text variant="body-sm" tone="muted">
                Journal <span aria-hidden>·</span> {1 + figmaPosts.length} posts
              </Text>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="w-full sm:w-auto">
                  {figmaTabs.map((label) => (
                    <TabsTrigger key={label} value={label} className="px-2 sm:px-3">
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Figma: ProjectRow · breakpoint=desktop, shaded=true */}
            <ProjectRow shaded project={figmaFeatured} onOpen={() => notInFigma(figmaFeatured.title)} />

            {/* Figma: "Latest posts" · padding 80 / 96 · page-container gap 40 */}
            <div className="page-container pt-20 pb-24">
              <Heading>Latest posts</Heading>
              {/* Figma: "post grid" · horizontal · gap 32 · three 336px columns */}
              <ul className="mt-10 grid gap-8 md:grid-cols-3">
                {figmaPosts.map((post) => (
                  <li key={post.title}>
                    {/* Figma: post frame · vertical · gap 12 (+4px spacer after the image) */}
                    <article className="flex flex-col gap-3">
                      <ProjectMedia src={post.image} label={`Read ${post.title}`} hint="Read post" onClick={() => notInFigma(post.title)} />
                      <Badge variant="outline" className="mt-1">
                        {post.category}
                      </Badge>
                      <Heading as="h3" size="md">
                        {post.title}
                      </Heading>
                      <Text variant="prose-sm" tone="prose">
                        {post.excerpt}
                      </Text>
                      <Text variant="caption" tone="muted">
                        {post.meta}
                      </Text>
                      <ArrowLink className="self-start" onClick={() => notInFigma(post.title)}>
                        read the post
                      </ArrowLink>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Figma: "Newsletter" · fill section · padding 64 · page-container gap 16 */}
          <section aria-labelledby="figma-newsletter-heading" className="bg-section py-16">
            <div className="page-container flex flex-col gap-4">
              <Heading id="figma-newsletter-heading">{figmaNewsletter.heading}</Heading>
              <Text tone="prose">{figmaNewsletter.body}</Text>
              <form
                className="flex flex-wrap items-center gap-2 pt-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  notInFigma('Subscribe')
                }}
              >
                <label htmlFor="figma-newsletter-email" className="sr-only">
                  Email
                </label>
                <Input id="figma-newsletter-email" type="email" placeholder={figmaNewsletter.placeholder} className="h-10 w-80" />
                <Button type="submit" size="lg">
                  <MailIcon /> {figmaNewsletter.button}
                </Button>
              </form>
              <Text variant="caption" tone="muted">
                {figmaNewsletter.fineprint}
              </Text>
            </div>
          </section>
        </main>

        <SiteFooter copyrightHolder={profile.copyrightHolder} imprint={[profile.name, ...profile.address, profile.email]} onContact={() => setContactOpen(true)} />
      </div>
      <BackToTop />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} email={profile.email} onCopyEmail={copyEmail} />
    </>
  )
}
