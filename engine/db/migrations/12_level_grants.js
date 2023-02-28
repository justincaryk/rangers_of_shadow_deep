exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE ranger_grant_type as enum(
      'skills',
      'stats',
      'recruitment_points',
      'heroic_ability'
    );

    CREATE TABLE ranger.level_grants (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      desc text NOT NULL,
      grant_type ranger_grant_type NOT NULL,
      benefit REFERENCES ranger.features (id),
      limit REFERENCES ranger.features (id),
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.level_grants')
}
