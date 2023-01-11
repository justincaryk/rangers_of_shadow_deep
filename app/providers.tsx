'use client'

import AuthProvider from '../components/auth/provider'
import GraphQLProvider from '../components/graphql/provider'
import ReactQueryProvider from '../components/react-query/provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <GraphQLProvider>{children}</GraphQLProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
