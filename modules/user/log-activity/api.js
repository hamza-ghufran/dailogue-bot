const db = require('../db/db')

module.exports = (data, cb) => {
	db.logUserChat({
		user_id: data.user_id,
		request: data.request,
		response: data.response,
		created_at: new Date()
	})
		.then(() => {
			return cb(null, { code: 'ACTIVITY_LOGGED' })
		})
		.catch((err) => {
			return cb({ code: 'DB_INSERT_ERROR' })
		})
}