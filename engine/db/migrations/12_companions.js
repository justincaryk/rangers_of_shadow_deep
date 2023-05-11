const { BaseStats } = require('../../constants')

exports.up = knex =>
  knex.schema.raw(`
    CREATE TABLE ranger.companions (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      name varchar(50) NOT NULL,
      cost smallint NOT NULL,
      description text NOT NULL,
      subtype varchar(50),
      ${Object.keys(BaseStats)
        .map(key => `${BaseStats[key]} smallint`)
        .join(' ,')},
      notes text
    );

    CREATE POLICY companions_policy ON ranger.companions 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.companions TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.companions')
}
