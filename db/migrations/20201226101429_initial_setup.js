exports.up = function (knex) {
	return knex.schema
		.createTable('sessions', tbl => {
			tbl.text('code', 6).primary();
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
			tbl.text('session_code').notNullable();
			tbl.foreign('session_code').references('code').inTable('sessions');
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
