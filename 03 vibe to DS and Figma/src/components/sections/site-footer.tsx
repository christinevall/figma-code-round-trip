import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export interface SiteFooterProps {
  copyrightHolder: string
  /** Lines shown in the imprint dialog. */
  imprint: string[]
  onContact: () => void
}

/** Dark footer band: copyright, imprint dialog and contact link. */
function SiteFooter({ copyrightHolder, imprint, onContact }: SiteFooterProps) {
  return (
    <footer data-slot="site-footer" className="bg-footer text-footer-foreground">
      <div className="page-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 text-body-sm">
        <span>
          © {new Date().getFullYear()} {copyrightHolder}
        </span>
        <Dialog>
          <DialogTrigger className="underline-offset-4 hover:underline">Imprint</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Imprint</DialogTitle>
              <DialogDescription>Replace this with your legal details.</DialogDescription>
            </DialogHeader>
            <address className="text-prose-sm not-italic">
              {imprint.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </address>
          </DialogContent>
        </Dialog>
        <button type="button" onClick={onContact} className="underline-offset-4 hover:underline">
          Contact
        </button>
      </div>
    </footer>
  )
}

export { SiteFooter }
