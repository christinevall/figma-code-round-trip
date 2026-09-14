import { UIStateProvider } from '@/lib/ui-state'
import { HomePage } from '@/pages/home-page'

export default function App() {
  return (
    <UIStateProvider>
      <HomePage />
    </UIStateProvider>
  )
}
