const db = require('../db/db')

module.exports = (data, cb) => {
	const { user_id } = data

	return db.findUser({
		user_id: user_id
	})
		.then(function (user) {
			if (user) {
				return cb(null, { code: 'VALID_USER' })
			}

			return cb(null, { code: 'INVALID_USER' })
		})
		.catch(function (error) {
			console.log(error)

			return cb({ code: 'UNKNOWN_ERROR' })
		})
}
