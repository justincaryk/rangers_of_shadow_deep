exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE primary_feature_type as enum('LEVEL_GRANT','FRIEND_LEVEL_GRANT','ITEM','INJURY', 'MERCENARY');

    CREATE TYPE mechanic_mod_type as enum('RIDER', 'MODIFIER', 'LIMIT', 'PICK');
    CREATE TYPE rider_subtype as enum('EXCLUDES', 'REQUIRES');
    

    CREATE TABLE ranger.features (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name text NOT NULL,
        primary_type primary_feature_type NOT NULL,
        mechanic_class mechanic_class_type,
        mechanic_mod mechanic_mod_type NOT NULL,
        stat_subtype stat_type,
        rider_subtype rider_subtype,
        item_id uuid REFERENCES ranger.items (id),
        skill_id uuid REFERENCES ranger.skills (id),
        stat_id uuid REFERENCES ranger.stats (id),
        injury_id uuid REFERENCES ranger.injuries (id),
        level_grant_id uuid REFERENCES ranger.level_grants (id),
        friend_level_grant_id uuid REFERENCES ranger.friend_level_grants (id),
        mercenary_id uuid REFERENCES ranger.mercenaries (id),
        excludes_item_id uuid REFERENCES ranger.items (id),
        requires_item_id uuid REFERENCES ranger.items(id),
        pick_ids  uuid[],
        count smallint,
        limit_per smallint,
        value real -- allow decimals
    );

    ALTER table ranger.features
      ADD COLUMN feature_id uuid REFERENCES ranger.features(id);

    CREATE POLICY features_policy ON ranger.features 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.features TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.features')
}
