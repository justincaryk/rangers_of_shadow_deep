exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ranger.skills')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ranger.skills').insert([
        {
          name: 'acrobatics',
          cost: 1,
          desc: "A measure of the ranger's ability to control his own body in difficult situations, such as jumping, walking along narrow paths, and swinging from ropes. It does not include climbing, which is a separate Skill.",
        },
        {
          name: 'ancient lore',
          cost: 1,
          desc: 'Knowledge of myth, legend, and ancient history, including all that is known about the Shadow Deep.',
        },
        {
          name: 'armory',
          cost: 1,
          desc: 'The study of weaponry, including how to make and repair weapons, how to improvise weapons in the field, and how to identify magic weapons. If a ranger has an Armoury Skill of +4 or more, he is always treated as armed with a dagger, even if unarmed.',
        },
        {
          name: 'climb',
          cost: 1,
          desc: "Measures the ranger's ability to climb difficult surfaces.",
        },
        {
          name: 'leadership',
          cost: 1,
          desc: 'The skill of leading others, it also includes diplomacy. A Ranger may add his Leadership Skill to his Total Recruitment Points before each mission.',
        },
        {
          name: 'navigation',
          cost: 1,
          desc: 'Using the natural world to determine direction and location and to keep from getting lost.',
        },
        {
          name: 'pick lock',
          cost: 1,
          desc: 'Encompasses knowledge of all kinds of lock and locking mechanisms, including doors, chests, and even secret doors.',
        },
        {
          name: 'read runes',
          cost: 1,
          desc: 'The knowledge of ancient written languages, including the languages of magic.',
        },
        {
          name: 'stealth',
          cost: 1,
          desc: 'Moving silently to avoid detection and skill in choosing and maintaining hiding places.',
        },
        {
          name: 'strength',
          cost: 1,
          desc: 'The training in the application of strength to achieve maximum results, useful for lifting, breaking down doors, and escaping from bonds.',
        },
        {
          name: 'survival',
          cost: 1,
          desc: 'Includes foraging for food and herbs, hunting, cooking, basic first-aid, and knowledge of the dangers inherent in specific types of terrain.',
        },
        {
          name: 'swim',
          cost: 1,
          desc: 'Movement through water, or any water-like substance.',
        },
        {
          name: 'track',
          cost: 1,
          desc: 'The ability to read the signs of the land to gain information about those that have preceded them, such as their direction of travel, distance ahead, and if they are wounded or carrying prisoners. Also includes knowledge of how to throw off pursuers.',
        },
        {
          name: 'traps',
          cost: 1,
          desc: 'Knowledge of traps, including how to set them and how to disable them.',
        },
        {
          name: 'perception',
          cost: 1,
          desc: "The general awareness of one's surroundings, including noticing small, but important details.",
        },
      ])
    })
}
