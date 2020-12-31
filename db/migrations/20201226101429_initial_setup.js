exports.up = function (knex) {
	return knex.schema
		.createTable('sessions', tbl => {
			tbl.increments('id')
			tbl.text('code', 6).notNullable();
			tbl.timestamp("created_at").defaultTo(knex.fn.now());
			tbl.timestamp("updated_at").defaultTo(knex.fn.now());
			tbl.timestamp("deleted_at");
		}).createTable('tracks', tbl => {
			tbl.integer('id').primary()
			tbl.text('name', 6).notNullable();
		}).createTable('artists', tbl => {
			tbl.integer('id').primary()
			tbl.text('name', 6).unique().notNullable();
		}).createTable('sessions_tracks', tbl => {
			tbl.integer('session_id').unsigned().notNullable();
			tbl.foreign('session_id').references('id').inTable('sessions');
			tbl.integer('track_id').unsigned().notNullable();
			tbl.foreign('track_id').references('id').inTable('tracks');
			tbl.integer('votes').defaultTo(0);
		})
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('sessions')
		.dropTableIfExists('tracks')
		.dropTableIfExists('artists')
		.dropTableIfExists('sessions_tracks')
};
