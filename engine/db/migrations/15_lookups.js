exports.up = knex =>
  knex.schema.raw(`
    -- items + features
    CREATE TABLE ranger.item_features (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      item_id uuid REFERENCES ranger.items (id),
      feature_id uuid REFERENCES ranger.features (id)
    );

    -- characters/friends + heroic actions 
    CREATE TABLE ranger.member_heroic_actions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
      heroic_action_id uuid REFERENCES ranger.heroic_actions (id),
      uses smallint default 1 NOT NULL
    );

    -- characters/friends + stats
    CREATE TABLE ranger.member_stats (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
      stat_id uuid REFERENCES ranger.stats (id) NOT NULL,
      value smallint NOT NULL
    );

    -- characters/friends + items
    CREATE TABLE ranger.member_items (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
      item_id uuid REFERENCES ranger.items (id) NOT NULL
    );

    -- characters/friends + skills
    CREATE TABLE ranger.member_skills (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
      skill_id uuid REFERENCES ranger.skills (id) not null,
      value smallint default 0 not null
    );

    -- characters/friends + spells
    CREATE TABLE ranger.member_spells (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
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
    CREATE TABLE ranger.member_levels (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
      level_grant_id uuid REFERENCES ranger.level_grants (id),
      friend_level_grant_id uuid REFERENCES ranger.friend_level_grants (id),
      times_granted smallint DEFAULT 1 NOT NULL,
      CONSTRAINT check_field_refs_match_type 
	      CHECK ((friend_id IS NULL AND friend_level_grant_id IS NULL) <> (character_id IS NULL AND level_grant_id IS NULL)),
	    CONSTRAINT check_member_type_is_valid
	      CHECK ((friend_id IS NULL) <> (character_id IS NULL)),
	    CONSTRAINT check_level_type_is_valid
	      check ((friend_level_grant_id IS NULL) <> (level_grant_id IS NULL))
    );
    comment on constraint check_field_refs_match_type on ranger.member_levels is 'Both a member ref and level grant ref are required';
    comment on constraint check_member_type_is_valid on ranger.member_levels is 'Cannot insert a character ref and friend ref';
    comment on constraint check_field_refs_match_type on ranger.member_levels is 'Cannot insert a character level grant ref and friend level grant ref';

    -- ranger + injuries
    CREATE TABLE ranger.member_injuries (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id uuid REFERENCES ranger.characters (id),
      friend_id uuid REFERENCES ranger.friends (id),
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
