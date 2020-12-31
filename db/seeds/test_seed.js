exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sessions_tracks').del()
    .then(() => { return knex('tracks').del() })
    .then(() => { return knex('sessions').del() })
    .then(function () {
      return knex('sessions').insert([
        { code: 'AAA' },
        { code: 'BBB' },
        { code: 'CCC' }
      ])
    }).then(() => {
      return knex('tracks').insert([
        { id: 1, name: 'Ready to start' },
        { id: 2, name: 'Besame mucho' },
        { id: 3, name: 'Comfortably numb' }
      ])
    }).then(() => {
      return knex('sessions_tracks').insert([
        { session_code: 'AAA', track_id: 1 },
        { session_code: 'AAA', track_id: 2 },
        { session_code: 'AAA', track_id: 3 }
      ])
    });
}
