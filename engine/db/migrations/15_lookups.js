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
      heroic_action_id uuid REFERENCES ranger.heroic_actions (id)
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
      spell_id uuid REFERENCES ranger.spells (id) NOT NULL
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
