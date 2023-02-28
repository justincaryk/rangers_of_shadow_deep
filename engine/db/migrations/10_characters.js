exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.characters (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      user_id uuid REFERENCES public.minions (id),
      name varchar(50) NOT NULL,
      avatar_url text,
      xp smallint default 0,
      level smallint default 0,
      total_heroic_actions smallint default 0,
      total_skill_points smallint default 0,
      total_stat_points smallint default 0,
      total_recruitment_points smallint default 0
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.characters')
}
