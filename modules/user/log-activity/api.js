const { mysql } = require('../../../utils/knex')

module.exports = (data, cb) => {
	let user_chat = mysql('user_chat').returning('id')

	return user_chat
		.insert({
			user_id: data.user_id,
			request: data.request,
			response: data.response,
			created_at: new Date()
		})
		.then((user_chat) => {
			return cb(null, { code: 'ACTIVITY_LOGGED' })
		})
		.catch((error) => {
			console.log(error)
			return cb({ code: 'DB_INSERT_ERROR' })
		})
}