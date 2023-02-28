exports.up = knex =>
  knex.schema.raw(`
    // items + features
    CREATE TABLE ranger.item_features (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      item_id REFERENCES ranger.items (id),
      feature_id REFERENCES ranger.features (id)
    );

    // characters/companions + heroic actions 
    CREATE TABLE ranger.member_heroic_actions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id REFERENCES ranger.characters (id),
      companion_id REFERENCES ranger.character_companions (id),
      heroic_action_id REFERENCES ranger.heroic_actions (id)
    );

    // characters/companions + stats
    CREATE TABLE ranger.member_stats (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id REFERENCES ranger.characters (id),
      companion_id REFERENCES ranger.character_companions (id),
      stats_id REFERENCES ranger.stats (id),
      value smallint NOT NULL
    );

    // characters/companions + items
    CREATE TABLE ranger.member_items (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id REFERENCES ranger.characters (id),
      companion_id REFERENCES ranger.character_companions (id),
      item_id REFERENCES ranger.items (id)
    );

    // characters/companions + skills
    CREATE TABLE ranger.member_skills (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id REFERENCES ranger.characters (id),
      companion_id REFERENCES ranger.character_companions (id),
      skill_id REFERENCES ranger.skills (id),
      value smallint default 0
    );

    // characters/companions + spells
    CREATE TABLE ranger.member_spells (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      character_id REFERENCES ranger.characters (id),
      companion_id REFERENCES ranger.character_companions (id),
      spell_id REFERENCES ranger.spells (id)
    );
  `)

exports.down = knex => {
  // all of the above tables !
  knex.schema.dropTable('item_features')
  knex.schema.dropTable('member_heroic_actions')
  knex.schema.dropTable('member_stats')
  knex.schema.dropTable('member_items')
  knex.schema.dropTable('member_skills')
  knex.schema.dropTable('member_spells')
}
