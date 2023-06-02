exports.up = knex =>
  knex.schema.raw(`
    CREATE TYPE item_class as enum('WEAPON', 'ARMOR', 'EQUIPMENT', 'WONDROUS');
    CREATE TYPE item_rarity as enum('MAGIC', 'MUNDANE');

    CREATE TABLE ranger.items (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name varchar(50) NOT NULL,
        description text NOT NULL,
        slot_cost smallint default 1 NOT NULL,
        entity_limit smallint,
        class item_class NOT NULL,
        rarity item_rarity default 'MUNDANE' NOT NULL
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
