const { BaseStats } = require('../../constants')

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('ranger.features')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('ranger.features').insert([
                // ranger level up
                {
                    name: 'level up - skill bonus limit per skill',
                    primary_type: 'LEVEL_GRANT',
                    level_grant_type: 'SKILL',
                    mechanic_mod: 'LIMIT',
                    value: 2,
                },
                {
                    name: 'level up - skill bonus',
                    primary_type: 'LEVEL_GRANT',
                    level_grant_type: 'SKILL',
                    mechanic_mod: 'MODIFIER',
                    value: 5,
                },
                {
                    name: 'level up - heroic action / spell increase',
                    primary_type: 'LEVEL_GRANT',
                    level_grant_type: 'HEROIC_ACTION',
                    mechanic_mod: 'MODIFIER',
                    value: 1,
                },
                {
                    name: 'level up - stat increase',
                    primary_type: 'LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    mechanic_mod: 'MODIFIER',
                    value: 1,
                },
                {
                    name: 'level up - recruitment bonus',
                    primary_type: 'LEVEL_GRANT',
                    level_grant_type: 'RECRUITMENT_POINT',
                    mechanic_mod: 'MODIFIER',
                    value: 10,
                },
                // injuries
                {
                    name: 'toes -> move',
                    primary_type: 'INJURY',
                    mechanic_mod: 'MODIFIER',
                    value: -0.5,
                },
                {
                    name: 'never strong -> health',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                {
                    name: 'lost finger -> shoot',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                {
                    name: 'scars -> will',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                {
                    name: 'leg -> move',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                {
                    name: 'jaw -> leadership',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -3,
                },
                {
                    name: 'eye -> shoot def',
                    primary_type: 'INJURY',
                    stat_subtype: 'EXTENDED',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                {
                    name: 'arm -> fight',
                    primary_type: 'INJURY',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: -1,
                },
                // companion level up features
                {
                    name: 'comp level up - health',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    mechanic_mod: 'MODIFIER',
                    stat_subtype: 'BASE',
                    value: 1,
                },
                {
                    name: 'comp level up - skill',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'SKILL',
                    mechanic_mod: 'MODIFIER',
                    value: 4,
                },
                {
                    name: 'comp level up - will',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: 2,
                },
                {
                    name: 'comp level up - heroic/spell ability',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'HEROIC_ACTION',
                    mechanic_mod: 'MODIFIER',
                    value: 1,
                },
                {
                    name: 'comp level up - choose fight or shoot (shoot)',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: 1,
                },
                {
                    name: 'comp level up - choose fight or shoot (fight)',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'MODIFIER',
                    value: 1,
                },
                {
                    name: 'comp level up - choose fight or shoot (choose)',
                    primary_type: 'FRIEND_LEVEL_GRANT',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'LIMIT',
                    value: 1,
                },
                // equipment
                {
                    name: 'equip > 2 hand weapon > +2 dmg',
                    primary_type: 'ITEM',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'LIMIT',
                    value: 1,
                },
                {
                    name: 'item > light armor > armor +1',
                    primary_type: 'ITEM',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'LIMIT',
                    value: 1,
                },
                {
                    name: 'item > heavy armor > armor +2',
                    primary_type: 'ITEM',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'LIMIT',
                    value: 1,
                },
                {
                    name: 'item > heavy armor > move -1',
                    primary_type: 'ITEM',
                    level_grant_type: 'STAT',
                    stat_subtype: 'BASE',
                    mechanic_mod: 'LIMIT',
                    value: 1,
                },
            ])
        })
}
