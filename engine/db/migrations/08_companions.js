exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.companions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint NOT NULL,
      desc text NOT NULL,
      subtype varchar(50)
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.companions')
}
