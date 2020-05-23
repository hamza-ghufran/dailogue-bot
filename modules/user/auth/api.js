const { mysql } = require('../../../utils/knex')

module.exports = (data, cb) => {
	const { user_id } = data

	let query = mysql('user')

	return query
		.where('user_id', user_id)
		.then(function (user) {
			if (user.length) {
				return cb(null, { code: 'VALID_USER', user_name: user[0].name })
			}

			return cb(null, { code: 'INVALID_USER' })
		})
		.catch(function (error) {
			console.log(error)

			return cb({ code: 'UNKNOWN_ERROR' })
		})
}
