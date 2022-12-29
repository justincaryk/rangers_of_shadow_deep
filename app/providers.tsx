'use client'

import GraphQLProvider from '../components/graphql/provider'
import ReactQueryProvider from '../components/react-query/provider'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <GraphQLProvider>{children}</GraphQLProvider>
    </ReactQueryProvider>
  )
}
