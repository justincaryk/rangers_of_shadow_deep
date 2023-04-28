exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE stat_type as enum('base', 'extended', 'modifier');

    CREATE TABLE ranger.stats (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        stat_type stat_type default 'base'
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
