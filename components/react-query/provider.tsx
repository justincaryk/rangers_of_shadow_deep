'use client'

import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function ReactQueryProvider({ children }: PropsWithChildren) {
  //   const [name, setName] = useState('World');
  //   const value = {
  //     state: { name },
  //     actions: { setName },
  //   };

  const ReactQueryClient = new QueryClient()

  return (
    <QueryClientProvider client={ReactQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
