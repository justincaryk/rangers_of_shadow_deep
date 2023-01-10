'use client'

import { PropsWithChildren, useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import GraphQLClientContext from './context'

function GraphQLProvider({ children }: PropsWithChildren) {
  const [ graphQLClient ] = useState(
    new GraphQLClient(
      process.env.NEXT_PUBLIC_GRAPHQL_HOST ||
        'http://localhost:3000/api/graphql'
      // {
      //   // headers: {
      //   //   Authorization: `Bearer ${process.env.API_KEY}`
      //   // }
      // }
    )
  )

  return (
    <GraphQLClientContext.Provider value={{ graphQLClient }}>
      {children}
    </GraphQLClientContext.Provider>
  )
}

export default GraphQLProvider
