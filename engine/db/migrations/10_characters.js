exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.characters (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      user_id uuid REFERENCES public.minions (id),
      name varchar(50) NOT NULL,
      avatar_url text,
      xp smallint default 0 NOT NULL,
      level smallint default 0 NOT NULL,
      total_heroic_actions smallint default 0 NOT NULL,
      total_skill_points smallint default 0 NOT NULL,
      total_stat_points smallint default 0 NOT NULL,
      total_recruitment_points smallint default 0 NOT NULL
    );
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.characters')
}
