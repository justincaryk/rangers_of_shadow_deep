exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE stat_type as enum('base', 'extended', 'modifier');

    CREATE TABLE ranger.stats (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        stat_type stat_type default 'base'
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.stats')
}
