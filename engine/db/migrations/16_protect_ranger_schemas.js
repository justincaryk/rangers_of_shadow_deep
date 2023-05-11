exports.up = knex =>
  knex.schema.raw(`
        ALTER TABLE ranger.friends ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.characters ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.friend_level_grants ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.mercenaries ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.features ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.heroic_actions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.injuries ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.item_features ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.items ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.level_grants ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_heroic_actions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_items ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_skills ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_spells ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_stats ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_injuries ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.character_bp_lookup ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.member_levels ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.ranger_level_cost ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.skills ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.spells ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.stats ENABLE ROW LEVEL SECURITY;
    `)

exports.down = knex => {}
