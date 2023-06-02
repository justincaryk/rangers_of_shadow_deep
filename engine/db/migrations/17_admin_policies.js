exports.up = knex =>
  knex.schema.raw(`
      -- __________ RANGER __________
      CREATE POLICY wiz_access_policy_cc on ranger.friends
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_char on ranger.characters
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_cl on ranger.friend_level_grants
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_comp on ranger.mercenaries
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_feat on ranger.features
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_ha on ranger.heroic_actions
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_inj on ranger.injuries
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_if on ranger.item_features
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_items on ranger.items
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_lg on ranger.level_grants
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_mha on ranger.member_heroic_actions
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_mi on ranger.member_items
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_msk on ranger.member_skills
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_msp on ranger.member_spells
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_mst on ranger.member_stats
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_cbp on ranger.character_bp_lookup
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_mlvl on ranger.member_levels
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_minjuries on ranger.member_injuries
        TO role_wizard USING (true) WITH CHECK (true);
        
      CREATE POLICY wiz_access_policy_rlc on ranger.ranger_level_cost
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_sk on ranger.skills
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_sp on ranger.spells
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_st on ranger.stats
        TO role_wizard USING (true) WITH CHECK (true);

      GRANT ALL on schema ranger to role_wizard;
      
      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ranger TO role_wizard;
      
      -- __________ PUBLIC __________
      CREATE POLICY wiz_access_policy_st on public.minions
        TO role_wizard USING (true) WITH CHECK (true);

      CREATE POLICY wiz_access_policy_st on public.wizards
        TO role_wizard USING (true) WITH CHECK (true);

      GRANT ALL on schema public to role_wizard;
      
      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO role_wizard;
  `)

exports.down = knex => {}
