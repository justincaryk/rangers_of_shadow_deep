'use client'

import { PropsWithChildren, useMemo, useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import GraphQLClientContext from './context'
import { useAtom } from 'jotai'
import { useCurrentUser } from '../auth/atoms/current-user'

function GraphQLProvider({ children }: PropsWithChildren) {
  const [ currentUser ] = useAtom(useCurrentUser)

  const headers = useMemo(() => {
    let headers = new Headers()

    if (currentUser?.jwt) {
      console.log('jwt:::', currentUser?.jwt)
      headers.append('Authorization', `Bearer ${currentUser?.jwt}`)
    }

    return headers
  }, [ currentUser ])

  const [ graphQLClient ] = useState(
    new GraphQLClient(
      process.env.NEXT_PUBLIC_GRAPHQL_HOST ||
        'http://localhost:3000/api/graphql',
      {
        headers,
      }
    )
  )

  return (
    <GraphQLClientContext.Provider value={{ graphQLClient }}>
      {children}
    </GraphQLClientContext.Provider>
  )
}

export default GraphQLProvider
