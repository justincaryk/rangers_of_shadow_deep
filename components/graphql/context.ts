'use client'

import { createContext } from 'react'
import { GraphQLClient } from 'graphql-request'

export const GraphQLClientContext = createContext<{
  graphQLClient: GraphQLClient
}>({ graphQLClient: new GraphQLClient('') })

export default GraphQLClientContext
