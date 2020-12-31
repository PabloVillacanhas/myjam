module.exports = {
	test: {
		client: 'pg',
		connection: {
			host: 'postgres',
			user: 'myjam',
			password: 'myjam',
			database: 'myjam_test'
		},
		migrations: {
			directory: __dirname + '/migrations'
		},
		seeds: {
			directory: __dirname + '/seeds'
		}
	},
	development: {
		client: 'pg',
		connection: {
			host: 'postgres',
			user: 'myjam',
			password: 'myjam',
			database: 'myjam'
		},
		pool: {
			min: 1,
			max: 10
		}
	},
	migrations: {
		directory: __dirname + '/migrations'
	},
	production: { client: 'pg', connection: process.env.DATABASE_URL },
}