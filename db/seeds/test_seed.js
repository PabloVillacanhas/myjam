exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        { id: 1, code: 'AAA' },
        { id: 2, code: 'BBB' },
        { id: 3, code: 'CCC' }
      ]);
    });
};
