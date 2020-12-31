exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        { id: 1, code: 'AAA' },
        { id: 2, code: 'BBB' },
        { id: 3, code: 'CCC' }
      ]).then(() => knex('tracks').insert([
        { id: 1, code: 'Ready to start' },
        { id: 2, code: 'Besame mucho' },
        { id: 3, code: 'Comfortably numb' }
      ])).then(() => knex('session_tracks').insert([
        { session_id: 1, track_id: 1 },
        { session_id: 1, track_id: 2 },
        { session_id: 1, track_id: 3 }
      ]));
    });
};
