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
        { id: 'keAJT0e6DG', name: 'Ready to start' },
        { id: 'EsBVp6q7Aq', name: 'Besame mucho' },
        { id: 'kKgZnrDOc8', name: 'Comfortably numb' }
      ])
    }).then(() => {
      return knex('sessions_tracks').insert([
        { session_code: 'AAA', track_id: 'keAJT0e6DG' },
        { session_code: 'AAA', track_id: 'EsBVp6q7Aq' },
        { session_code: 'AAA', track_id: 'kKgZnrDOc8' }
      ])
    });
}
