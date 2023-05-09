exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE primary_feature_type as enum('level_grant','companion_level_grant','item','injury');
    
    CREATE TYPE level_grant_subtype as enum(
      'skill',
      'heroic_action',
      'stat',
      'recruitment_point'
    );

    CREATE TYPE mechanic_mod_type as enum('rider', 'modifier', 'limit');
    CREATE TYPE rider_subtype as enum('excludes', 'requires');
    
    CREATE TYPE stat_subtype as enum(
      -- stat_type enum **
      'base',
      'extended',
      'modifier'
    );

    CREATE TABLE ranger.features (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        primary_type primary_feature_type NOT NULL,
        level_grant_type level_grant_subtype,
        stat_subtype stat_subtype,
        mechanic_mod mechanic_mod_type NOT NULL,
        rider_subtype rider_subtype,
        item_id uuid REFERENCES ranger.items (id),
        skill_id uuid REFERENCES ranger.skills (id),
        stat_id uuid REFERENCES ranger.stats (id),
        injury_id uuid REFERENCES ranger.injuries (id),
        level_grant_id uuid REFERENCES ranger.level_grants (id),
        -- allow decimals
        value real
    );

    CREATE POLICY features_policy ON ranger.features 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.features TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.features')
}
