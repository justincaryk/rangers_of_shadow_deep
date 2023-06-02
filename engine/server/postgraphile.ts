import { config } from './config'
import { Pool } from 'pg'
import { postgraphile } from 'postgraphile'

const pool = new Pool({
  database: config.DATABASE,
  host: config.DB_HOST,
  port: config.PG_PORT,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
})

export { pool as pg }

export default postgraphile(pool, [ 'public', ...config.PG_SCHEMA ], {
  // watchPg: true, // Need extension for this to work properly
  jwtSecret: config.JWT_SECRET,
  jwtPgTypeIdentifier: 'public.jwt_token',
  graphiql: true,
  enhanceGraphiql: true,
  dynamicJson: true,
  pgDefaultRole: 'anonymous_user',
  graphqlRoute: '/api/graphql',
  graphiqlRoute: '/api/graphiql',
  retryOnInitFail: true,
  ownerConnectionString: config.OWNER_CONNECTION_STRING,
})
