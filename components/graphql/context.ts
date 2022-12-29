'use client'

import { createContext } from 'react'
import { GraphQLClient } from 'graphql-request'

export const GraphQLClientContext = createContext<{ graphQLClient: GraphQLClient | null }>({ graphQLClient: null })

export default GraphQLClientContext
