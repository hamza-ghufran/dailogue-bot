var auth_latch = false
const validator = require('./validate')
const { mysql } = require('../../../utils/knex')
const { listRequirements } = require('../../../utils/helpers')

/**
 * email
 * name
 * password
 * dob
 * user_id
 */
let user_details = []

const requestUserToRegister = (data, cb) => {
	const { user_id, message } = data

	if (!auth_latch) {
		auth_latch = true
		listRequirements(user_id)

		return cb(null, { code: "NEW_USER", user_id: user_id })
	}

	user_details.push(message)

	if (user_details.length === 4) {
		user_details.push(user_id)

		createNewUser(user_details, (err, res) => {
			if (err) {
				return cb(null)
			}

			return cb(null, res)
		})
	}
}

const createNewUser = (data, cb) => {
	const user = mysql('user')
	const email = data[0],
		name = data[1],
		password = data[2],
		dob = data[3],
		user_id = data[4];

	let errors = validator({ email, dob })

	if (errors.length) {
		user_details.length = 0
		listRequirements(user_id)

		return cb(null, { code: 'INVALID ARGUMENTS', user_id: user_id, message: errors.toString() })
	}

	user
		.insert({
			email,
			name,
			password,
			dob,
			user_id,
		})
		.then((user) => {
			return cb(null, { code: 'USER_CREATED', user_id: user_id })
		})
		.catch((error) => {
			console.log(error)
			return cb({ code: 'DB_INSERT_ERROR', user_id: user_id })
		})
}

module.exports = {
	requestUserToRegister: requestUserToRegister,
	createNewUser: createNewUser,
}