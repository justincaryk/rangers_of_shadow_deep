exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE item_class as enum('weapon', 'armor', 'equipment', 'wondrous');
    CREATE TYPE item_rarity as enum('magic', 'mundane');

    CREATE TABLE ranger.items (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        description text NOT NULL,
        slot_cost smallint default 1,
        entity_limit smallint,
        class item_class NOT NULL,
        rarity item_rarity default 'mundane' NOT NULL
    );

    CREATE POLICY items_policy ON ranger.items 
      FOR SELECT
      TO role_minion
      USING (true);

    GRANT SELECT ON ranger.items TO role_minion;
  `)

exports.down = knex => {
  knex.schema.dropTable('ranger.items')
}
