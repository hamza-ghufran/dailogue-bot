const config = require('./config')

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: config.mysql.host,
			user: config.mysql.user,
			password: config.mysql.password,
			database: config.mysql.database
		},
		seeds: {
			directory: __dirname + '/db/seeds'
		},
	}
}