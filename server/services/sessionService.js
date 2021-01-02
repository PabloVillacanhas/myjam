'use strict'

const createBaseCRUD = require('./baseCRUD')

const name = 'Session'
const tableName = 'sessions'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
	'id',
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

	return {
		...crud
	}
}