exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE primary_feature_type as enum('LEVEL_GRANT','FRIEND_LEVEL_GRANT','ITEM','INJURY');
    
    CREATE TYPE level_grant_subtype as enum(
      'SKILL',
      'HEROIC_ACTION',
      'STAT',
      'RECRUITMENT_POINT'
    );

    CREATE TYPE mechanic_mod_type as enum('RIDER', 'MODIFIER', 'LIMIT');
    CREATE TYPE rider_subtype as enum('EXCLUDES', 'REQUIRES');

    CREATE TABLE ranger.features (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        primary_type primary_feature_type NOT NULL,
        level_grant_type level_grant_subtype,
        stat_subtype stat_type,
        mechanic_mod mechanic_mod_type NOT NULL,
        rider_subtype rider_subtype,
        item_id uuid REFERENCES ranger.items (id),
        skill_id uuid REFERENCES ranger.skills (id),
        stat_id uuid REFERENCES ranger.stats (id),
        injury_id uuid REFERENCES ranger.injuries (id),
        level_grant_id uuid REFERENCES ranger.level_grants (id),
        friend_level_grant_id uuid REFERENCES ranger.friend_level_grants (id),
        value real -- allow decimals
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
