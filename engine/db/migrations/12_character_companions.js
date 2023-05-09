exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.character_companions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      user_id uuid REFERENCES public.minions (id),
      companion_id uuid REFERENCES ranger.companions (id),
      name varchar(50) NOT NULL,
      progression_points smallint default 0,
      bonus_skill uuid REFERENCES ranger.skills (id)
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.character_companions')
}
