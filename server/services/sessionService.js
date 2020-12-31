'use strict'

const createGuts = require('../helpers/model-guts')

const name = 'Session'
const tableName = 'session'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
	'id',
	'code',
	'updated_at',
	'created_at'
]

// Always perform this logic before saving to db. This includes always hashing
// the password field prior to writing so it is never saved in plain text.
const beforeSave = user => {
	console.log('NO before action implemented');
}

module.exports = knex => {
	const guts = createGuts({
		knex,
		name,
		tableName,
		selectableProps
	})

	// Augment default `create` function to include custom `beforeSave` logic.
	const create = props => beforeSave(props)
		.then(session => guts.create(session))

	return {
		...guts,
		create
	}
}