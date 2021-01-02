'use strict'

const createBaseCRUD = require('./baseCRUD')

const name = 'Track'
const tableName = 'tracks'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
	'id',
	'name',
	'updated_at',
	'created_at'
]

module.exports = knex => {
	const crud = createBaseCRUD({
		knex,
		name,
		tableName,
		selectableProps
	})

	// Augment default `create` function to include custom `beforeSave` logic.
	const create = props => crud.create(props)

	return {
		...guts,
		create
	}
}