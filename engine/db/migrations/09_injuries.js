exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.injuries (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        desc text,
        modifier REFERENCES ranger.features (id)
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.injuries')
}
