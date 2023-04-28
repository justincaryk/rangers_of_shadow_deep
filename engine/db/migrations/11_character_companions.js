exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.character_companions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.companions (id),
      name varchar(50) NOT NULL,
      progression_points smallint default 0
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.character_companions')
}
