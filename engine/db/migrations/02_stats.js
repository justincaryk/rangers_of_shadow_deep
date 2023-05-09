exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE stat_type as enum('base', 'extended', 'modifier');

    CREATE TABLE ranger.stats (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      stat_type stat_type default 'base' not null,
      ranger_default int,
      hard_cap int,
      CONSTRAINT if_base_type_default_int
        CHECK ( NOT (stats.stat_type = 'base' AND stats.ranger_default IS NULL) ),
      CONSTRAINT if_base_type_hard_cap
        CHECK ( NOT (stats.stat_type = 'base' AND stats.hard_cap IS NULL) )
  );
    
    CREATE POLICY stats_policy ON ranger.stats 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.stats TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.stats')
}
