import { NextApiRequest, NextApiResponse } from 'next'

import postgraphile from '../../engine/server/postgraphile'
import runMiddleware from '../../engine/server/runMiddleware'

// Graphiql route that handles rendering graphiql
// https://github.com/graphql/graphiql
// An interactive in-browser GraphQL IDE
const graphiql = async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  await runMiddleware(req, res, postgraphile)
  res.end()
}

export default graphiql
