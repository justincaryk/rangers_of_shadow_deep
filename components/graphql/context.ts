'use client'

import { createContext } from 'react'
import { GraphQLClient } from 'graphql-request'

export const GraphQLClientContext = createContext<{
  graphQLClient: GraphQLClient
}>({ graphQLClient: new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_HOST || 'http://localhost:3000/api/graphql') })

export default GraphQLClientContext
