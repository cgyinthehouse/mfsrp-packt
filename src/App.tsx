import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext'

const queryClient = new QueryClient()
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  )
}
