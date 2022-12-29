import { NextApiRequest, NextApiResponse } from 'next'

import postgraphile from '../../engine/server/postgraphile'
import runMiddleware from '../../engine/server/runMiddleware'

// Endpoint needed for graphiql
const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  await runMiddleware(req, res, postgraphile)
  res.end()
}

export default graphql

export const config = {
  api: {
    bodyParser: false,
  },
}
