exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.injuries (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        description text,
        hard_cap smallint default 1 not null
    );
    
    CREATE POLICY injuries_policy ON ranger.injuries 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.injuries TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.injuries')
}
