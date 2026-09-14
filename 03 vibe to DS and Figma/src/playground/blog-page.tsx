import { useState, type FormEvent, type MouseEvent } from 'react'
import { MailIcon } from 'lucide-react'
import { toast } from 'sonner'
import { ArrowLink } from '@/components/patterns/arrow-link'
import { BackToTop } from '@/components/patterns/back-to-top'
import { FormField } from '@/components/patterns/form-field'
import { Heading } from '@/components/patterns/heading'
import { ProjectMedia } from '@/components/patterns/project-media'
import { Reveal } from '@/components/patterns/reveal'
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
import { categoryLabel, postCategories, posts, type Post, type PostCategory } from './blog-data'

const openPost = (post: Post) => toast(post.title, { description: 'Post pages are the next prototype step.' })

/**
 * Playground prototype: a blog page assembled only from existing design-system components.
 * Layout comes from Tailwind utilities on the spacing scale; no new styles, colors or components.
 */
export function BlogPage() {
  const [filter, setFilter] = useState<PostCategory | 'all'>('all')
  const [contactOpen, setContactOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()

  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured && (filter === 'all' || p.category === filter))
  const showFeatured = featured && (filter === 'all' || featured.category === filter)
  const count = rest.length + (showFeatured ? 1 : 0)

  function onNavigate(item: NavItem, event: MouseEvent<HTMLAnchorElement>) {
    if (item.id === 'blog') return
    event.preventDefault()
    toast('Only the blog exists in this prototype', { description: `“${item.label}” lives on the home page.` })
  }

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError('That email doesn’t look right.')
      return
    }
    setEmailError(undefined)
    setEmail('')
    toast.success('You’re subscribed', { description: 'The next note lands in your inbox.' })
  }

  return (
    <>
      <div id="top" className="flex min-h-dvh flex-col">
        <SiteHeader
          nav={nav}
          onNavigate={onNavigate}
          onSearch={() => toast('Search isn’t part of this prototype')}
          onContact={() => setContactOpen(true)}
        />

        <main className="flex-1">
          <Hero
            name="Journal"
            availability="New note every other week"
            headline={['Field notes', 'on design & AI.']}
            onContact={() => setContactOpen(true)}
          />

          <section id="blog" aria-label="Posts" className="scroll-mt-20">
            <div className="page-container flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <Text variant="body-sm" tone="muted">
                Notes <span aria-hidden>·</span> {count} {count === 1 ? 'post' : 'posts'}
              </Text>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as PostCategory | 'all')}>
                <TabsList className="w-full sm:w-auto">
                  {postCategories.map((c) => (
                    <TabsTrigger key={c.value} value={c.value} className="px-2 sm:px-3">
                      {c.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {showFeatured && (
              <ProjectRow
                shaded
                project={{
                  title: featured.title,
                  image: featured.image,
                  summary: featured.excerpt,
                  tags: [categoryLabel(featured.category), featured.date, featured.readingTime],
                }}
                onOpen={() => openPost(featured)}
              />
            )}

            <div className="page-container py-16 sm:py-20">
              <Heading>{filter === 'all' ? 'Latest notes' : categoryLabel(filter)}</Heading>
              {rest.length ? (
                <ul className="mt-8 grid gap-x-8 gap-y-12 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <li key={post.slug}>
                      <Reveal delay={i * 80}>
                        <article className="flex flex-col gap-3">
                          <ProjectMedia src={post.image} label={`Read ${post.title}`} hint="Read post" onClick={() => openPost(post)} />
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <Badge variant="outline">{categoryLabel(post.category)}</Badge>
                            <Text as="span" variant="caption" tone="muted">
                              {post.date} <span aria-hidden>·</span> {post.readingTime}
                            </Text>
                          </div>
                          <Heading as="h3" size="md">
                            {post.title}
                          </Heading>
                          <Text variant="prose-sm" tone="prose">
                            {post.excerpt}
                          </Text>
                          <ArrowLink className="self-start" onClick={() => openPost(post)}>
                            read the note
                          </ArrowLink>
                        </article>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text tone="muted" className="mt-6">
                  The featured note is the only one in this category so far.
                </Text>
              )}
            </div>
          </section>

          <section aria-labelledby="newsletter-heading" className="bg-section py-14 sm:py-20">
            <div className="page-container grid gap-8 md:grid-cols-2 md:items-end md:gap-12">
              <div>
                <Heading id="newsletter-heading">Get the next note</Heading>
                <Text tone="prose" className="mt-4 max-w-md">
                  One short email when a new note is out: design systems, research and working with AI agents. Unsubscribe any time.
                </Text>
              </div>
              <form onSubmit={onSubscribe} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <FormField id="newsletter-email" label="Email" error={emailError} className="flex-1">
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10"
                  />
                </FormField>
                <Button type="submit" size="lg" className="sm:mt-7">
                  <MailIcon /> Subscribe
                </Button>
              </form>
            </div>
          </section>
        </main>

        <SiteFooter
          copyrightHolder={profile.copyrightHolder}
          imprint={[profile.name, ...profile.address, profile.email]}
          onContact={() => setContactOpen(true)}
        />
      </div>
      <BackToTop />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} email={profile.email} onCopyEmail={copyEmail} />
    </>
  )
}
