exports.up = knex =>
    knex.schema.raw(`
        ALTER TABLE ranger.character_companions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.characters ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.companion_leveling ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.companions ENABLE ROW LEVEL SECURITY;
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
        ALTER TABLE ranger.ranger_level_cost ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.skills ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.spells ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ranger.stats ENABLE ROW LEVEL SECURITY;
    `)

exports.down = knex => { }
