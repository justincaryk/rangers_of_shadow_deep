exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE feature_type as enum('rider', 'modifier');
    CREATE TYPE rider_subtype as enum('excludes', 'requires');
    CREATE TYPE modifier_subtype as enum(
      -- points to skills
      'skill',
      -- stat_type enum **
      'base',
      'extended',
      'modifier'
    );

    CREATE TABLE ranger.features (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        primary_type feature_type NOT NULL,
        rider_subtype rider_subtype,
        modifier_subtype modifier_subtype,
        item_id REFERENCES ranger.items (id),
        skill_id REFERENCES ranger.skills (id),
        stat_id REFERENCES ranger.stats (id),
        value smallint,
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.features')
}
