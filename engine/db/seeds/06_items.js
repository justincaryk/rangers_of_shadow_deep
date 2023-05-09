exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.items').insert([
        {
          name: 'bow',
          description:
            'The favoured missile weapon of rangers, bows may be loaded and fired in a single action. For game purposes the maximum range of a bow is 24”. Bows have no damage modifier. A figure must also carry a quiver, or some type of magic ammunition, to use a bow.',
          class: 'weapon',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'crossbow',
          description:
            'A common weapon wielded by the forces of the Shadow Deep, crossbows take one action to load and one action to fire. If a figure wishes, he may replace his movement action with a "reload" action. Crossbows have a +2 damage modifier and a maximum range of 24”. It is assumed that all crossbows start the game loaded and ready to fire. A figure must also carry a quiver, or some type of magic ammunition, to use a crossbow.',
          class: 'weapon',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'hand weapon',
          description:
            'Includes all purpose-forged weapons that are commonly wielded in one hand, such as swords, clubs, axes, maces, and even spears. These weapons have no modifiers in combat.',
          class: 'weapon',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'heavy armor',
          description:
            'This represents any type of heavy armour that is mostly constructed out of metal. A figure wearing heavy armour receives +2 to its Armour, but -1 to its Move.',
          class: 'armor',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'light armor',
          description:
            'This represents any type of lighter armour that is mostly constructed out of leather or other non-metal materials. A figure wearing light armour receives +1 to its Armour.',
          class: 'armor',
          rarity: 'mundane',
          slot_cost: 1,
          entity_limit: 1,
        },
        {
          name: 'quiver',
          description:
            'Purpose-built to hold ammunition for a bow or crossbow, a figure must be equipped with a quiver to make normal shooting attacks with these weapons. A figure with a quiver may also carry one piece of magic ammunition (an arrow or crossbow bolt) without that ammunition taking up an item slot.',
          class: 'equipment',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'rope',
          description:
            'Whenever a figure carrying rope is standing at the top of a vertical structure, such as a building or cliff-face, it may spend an action to set a rope. Place a marker next to the figure, and a corresponding one on the ground at the base of the structure, to mark the placement of the rope (or just use a piece of string). Any figure may now use this rope to climb the structure without suffering any movement penalties. A figure may set one rope per game for each rope item carried.',
          class: 'equipment',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'shield',
          description:
            'A figure that is carrying a shield receives +1 to its Armour. It may not, however, also carry a two-handed weapon or a staff.',
          class: 'equipment',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'staff',
          description:
            'The staff is best known for its defensive properties. Staffs have a -1 damage modifier, but also give the opponent a -1 damage modifier in hand-to-hand combat. The staff does not provide this modifier against shooting attacks.',
          class: 'weapon',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'throwing knife',
          description:
            'This includes any kind of small throwing weapon such as knives, axes, and light javelins. A figure may make one shooting attack per game for each knife carried. This attack has a maximum range of 8” and does -1 damage. In a pinch, a throwing weapon can also be used as a back-up melee weapon. A figure carrying an unused throwing knife as his only weapon does not count as unarmed but does suffer a -2 damage modifier in hand-to-hand combat. The first  dagger or throwing knife carried by a ranger does not take up an item slot.',
          class: 'equipment',
          rarity: 'mundane',
          slot_cost: 1,
        },
        {
          name: 'two-handed weapon',
          description:
            'Includes all heavy melee weapons that require two hands to wield, such as two- handed swords, battle axes, various polearms, and large flails. These weapons have a +2 damage modifier. Two-handed weapons carried by rangers take up two items slots.',
          class: 'equipment',
          rarity: 'mundane',
          slot_cost: 2,
        },
        {
          name: 'unarmed',
          description:
            'A figure that is unarmed may still fight as normal, but suffer -2 Fight and -2 Damage. This penalty never applies to creatures that have no weapons listed in their notes.',
          class: 'weapon',
          rarity: 'mundane',
          slot_cost: 0,
        },

        // magic
        {
          name: 'focusing crystal',
          description:
            'If a figure carrying this crystal casts a spell that forces the target to make a Will Roll, the Target Number for that Will Roll is increased by 2. For example, if a ranger casts Hold Creature, the creature will have to make a Will Roll with a Target Number of 18, instead of the normal 16.',
          class: 'wondrous',
          rarity: 'magic',
          slot_cost: 1,
          entity_limit: 1,
        },
        {
          name: 'holy icon',
          description:
            'Whenever a figure carrying a holy icon casts Heal, the target recovers 6 points of Health instead of the normal 5. Whenever it casts Burning Light it makes +4 shooting attacks instead of +3, and whenever it casts Shield of Light all shooting attacks against the target are at -4 instead of -3.',
          class: 'wondrous',
          rarity: 'magic',
          slot_cost: 1,
          entity_limit: 1,
        },
        {
          name: 'spell book',
          description:
            'If a figure is carrying a spellbook, and it reaches the end of a scenario with uncast spells, it may select one of these uncast spells to be "saved" in the spellbook. This spell may then be cast in a future scenario following the normal rules for spellcasting. Once the spell is cast, it is removed from the spellbook. A spellbook can never hold more than one spell at any given time.',
          class: 'wondrous',
          rarity: 'magic',
          slot_cost: 1,
          entity_limit: 1,
        },
        {
          name: 'wand',
          description:
            'While carrying a wand, a figure can add +1 to the roll for any shooting attack generated by a spell it cast. For example, if a figure carrying a wand casts Fireball, then all figures within 2” of the chosen target point will suffer a +4 shooting attack, instead of the normal +3.',
          class: 'wondrous',
          rarity: 'magic',
          slot_cost: 1,
          entity_limit: 1,
        },
        {
          name: 'wizards staff',
          description:
            'This item follows all of the rules for the "staff" weapon, with the following additions. If a figure makes a Will Roll while carrying this staff, it may trade its own Health to increase its roll on a one-for-one basis. For example, if a ranger makes a Will Roll (TN12) and rolls an 8, he may reduce his current Health by 4 in order to increase the Will Roll to a 12. He passed the roll, but it hurt. Additionally, whenever a figure carrying a wizard\'s staff is activated, it may spend one point of Health to make the staff count as a magic weapon until its next activation.',
          class: 'wondrous',
          rarity: 'magic',
          slot_cost: 1,
          entity_limit: 1,
        },
      ])
    })
}
