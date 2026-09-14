import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { profile, projects, type Project } from '@/data/site'

interface UIState {
  contactOpen: boolean
  setContactOpen: (open: boolean) => void
  activeProject: Project | null
  openProject: (slug: string | null) => void
}

const UIStateContext = createContext<UIState | null>(null)

function readProjectFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('project')
  return projects.some((p) => p.slug === slug) ? slug : null
}

export function UIStateProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [projectSlug, setProjectSlug] = useState<string | null>(readProjectFromUrl)

  // Keep ?project=slug in the URL so project views are shareable.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (projectSlug) url.searchParams.set('project', projectSlug)
    else url.searchParams.delete('project')
    window.history.replaceState(null, '', url)
  }, [projectSlug])

  const openProject = useCallback((slug: string | null) => setProjectSlug(slug), [])

  const value = useMemo(
    () => ({
      contactOpen,
      setContactOpen,
      activeProject: projects.find((p) => p.slug === projectSlug) ?? null,
      openProject,
    }),
    [contactOpen, projectSlug, openProject],
  )

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>
}

export function useUIState() {
  const ctx = useContext(UIStateContext)
  if (!ctx) throw new Error('useUIState must be used inside UIStateProvider')
  return ctx
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    toast.success('Email copied', { description: profile.email })
  } catch {
    toast.error('Could not copy', { description: profile.email })
  }
}

export function comingSoon() {
  toast('The blog is coming soon', { description: "I'm writing the first posts right now." })
}
