## Welcome...

## Application Overview:

This is a [Next.js](https://nextjs.org/) project bootstrapped with the beta `app/` architecture.
See this link for documentation: https://beta.nextjs.org/docs

The `engine` directory is meant to handle setting up the backend.
The `pages` directory is where all of the routes are built. These files should primarily be SSR.
The `app` directory should only be used for API creations.
The `components` directory is for shared resources and the first place to put components that must be rendered client side.
The `graphql` directory provides schema typings. Any queries or mutations not generated automatically by postgraphile can be added in here to be typed.

## Getting Started

1. create `.env.local` in root and add the values from `.env.example`.
2. Run `yarn`.
3. [Follow steps in Knex section](#knex).
4. [Follow steps in Schema & Types section](#schema--types-generation).
5. [Follow steps in Hooks (optional)](#hooks-optional).
5. Run `yarn dev`.
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Graphiql and Graphql Endpoints

In development, the graphiql endpoint is located at http://localhost:3000/api/graphiql and the graphql query endpoint is at http://localhost:3000/api/graphql.

## Knex

This package will assist in setting up postgres.
To setup:

1. Install postgres
2. Spin up a postgres instance (Docker recommended)
3. Create a database using your preferred DBMS
4. Create a `.env` file and add the contents from `.env.example`. (Note: `.env.local` will not work for this)
5. Run `yarn migrate:latest`
6. Run `yarn seed:run`

## Schema & Types Generation

This starter repo autogenerates types from the schema. In order to access typed queries/mutations, simply look in `[root]/graphql`. The majority of queries should be provided by postgraphile; however, if you need to add custom queries, you can add them in here for automatic type generation. 

**NOTE: TYPES NEED TO BE MANUALLY GENERATED ON && UPDATED BY FOLLOWING THE STEPS BELOW**

1. Run `yarn dev`
2. Open a new terminal window
3. Run `yarn codegen`
4. Stop both terminals.

## Hooks (optional)

This repo supports auto-formatting and auto-linting. To set up, simply run `yarn husky.init`
