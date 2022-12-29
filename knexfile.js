require('dotenv').config()

module.exports = {
  development: {
    client: process.env.CLIENT || 'postgres',
    connection: {
      database: process.env.DATABASE || 'dnd',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'test',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.PG_PORT || '5432',
    },
    migrations: {
      directory: __dirname + '/engine/db/migrations',
    },
    seeds: {
      directory: __dirname + '/engine/db/seeds',
    },
  },

  production: {
    client: process.env.CLIENT || 'postgres',
    connection: {
      database: process.env.DATABASE,
      user: process.env.PG_USER,
      host: process.env.DB_HOST,
      password: process.env.PG_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/engine/db/migrations',
    },
    seeds: {
      directory: __dirname + '/engine/db/seeds',
    },
  },
}
