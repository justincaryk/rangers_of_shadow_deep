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

    CREATE OR REPLACE FUNCTION ranger.hydrate_ranger (uuid) RETURNS void AS $$ 
      BEGIN 
        INSERT INTO ranger.member_skills (skill_id, value, character_id) 
          (SELECT id,0,$1
            FROM ranger.skills);
                        
        INSERT INTO ranger.member_stats (stat_id, value, character_id) 
          (SELECT id, ranger_default,$1
            FROM ranger.stats 
            WHERE stat_type = 'base');

      END 
    $$ 
    LANGUAGE plpgsql;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.characters')
}
