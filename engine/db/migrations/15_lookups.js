exports.up = knex =>
  knex.schema.raw(`
    -- items + features
    CREATE TABLE ranger.item_features (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      item_id uuid REFERENCES ranger.items (id),
      feature_id uuid REFERENCES ranger.features (id)
    );

    -- characters/companions + heroic actions 
    CREATE TABLE ranger.member_heroic_actions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      heroic_action_id uuid REFERENCES ranger.heroic_actions (id),
      uses smallint default 1 NOT NULL
    );

    -- characters/companions + stats
    CREATE TABLE ranger.member_stats (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      stat_id uuid REFERENCES ranger.stats (id) NOT NULL,
      value smallint NOT NULL
    );

    -- characters/companions + items
    CREATE TABLE ranger.member_items (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      item_id uuid REFERENCES ranger.items (id) NOT NULL
    );

    -- characters/companions + skills
    CREATE TABLE ranger.member_skills (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      skill_id uuid REFERENCES ranger.skills (id) not null,
      value smallint default 0 not null
    );

    -- characters/companions + spells
    CREATE TABLE ranger.member_spells (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      spell_id uuid REFERENCES ranger.spells (id) NOT NULL,
      uses smallint default 1 NOT NULL
    );

    -- ranger + buildpoints
    CREATE TABLE ranger.character_bp_lookup (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      bp_spent_on_heroic_actions smallint DEFAULT 0 NOT NULL,
      bp_spent_on_skills smallint DEFAULT 0 NOT NULL,
      bp_spent_on_stats smallint DEFAULT 0 NOT NULL,
      bp_spent_on_rp smallint DEFAULT 0 NOT NULL
    );

    -- ranger + level ups
    CREATE TABLE ranger.member_level (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      level_grant_id uuid REFERENCES ranger.level_grants (id),
      companion_leveling_id uuid REFERENCES ranger.companion_leveling (id),
      granted smallint DEFAULT 1 NOT NULL,
      CONSTRAINT check_member_ref_id check (companion_id is not null or character_id is not null),
      CONSTRAINT check_level_grant_id_ref check (companion_leveling_id is not null or level_grant_id is not null),
    );

    -- ranger + injuries
    CREATE TABLE ranger.member_injuries (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      companion_id uuid REFERENCES ranger.character_companions (id),
      injury_id uuid REFERENCES ranger.injuries (id) NOT NULL,
      acquired smallint DEFAULT 1 NOT NULL
    );
  `)

exports.down = knex => {
  //  all of the above tables !
  knex.schema.dropTable('ranger.item_features')
  knex.schema.dropTable('ranger.member_heroic_actions')
  knex.schema.dropTable('ranger.member_stats')
  knex.schema.dropTable('ranger.member_items')
  knex.schema.dropTable('ranger.member_skills')
  knex.schema.dropTable('ranger.member_spells')
}
