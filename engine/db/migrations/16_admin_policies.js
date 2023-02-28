exports.up = knex =>
    knex.schema.raw(`
        GRANT ALL ON ALL tables IN SCHEMA "public" TO role_wizard;
        GRANT ALL ON ALL tables IN SCHEMA "ranger" TO role_wizard;
  `)

exports.down = knex => { }
