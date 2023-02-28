exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.heroic_actions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint default 1,
      desc text
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.heroic_actions')
}
