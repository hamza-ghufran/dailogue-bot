var auth_latch = false
const validator = require('./validate')
const { listRequirements } = require('../../../utils/helpers')
const db = require('../db/db')
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

		let dataObj = {
			dob: user_details[3],
			name: user_details[1],
			email: user_details[0],
			user_id: user_details[4],
			password: user_details[2],
		}

		createNewUser(dataObj, (err, res) => {
			if (err) {
				return cb(null)
			}

			return cb(null, res)
		})
	}
}

const createNewUser = (data, cb) => {
	let errors = validator({
		email: data.email,
		dob: data.dob
	})

	if (errors) {
		user_details.length = 0
		listRequirements(data.user_id)

		return cb(null, { code: 'INVALID ARGUMENTS', user_id: user_id, message: errors.toString() })
	}

	db.createUser({
		dob: data.dob,
		name: data.name,
		email: data.email,
		user_id: data.user_id,
		password: data.password,
	})
		.then(() => {
			return cb(null, { code: 'USER_CREATED', user_id: data.user_id })
		})
		.catch((err) => {
			return cb({ code: 'DB_INSERT_ERROR', user_id: data.user_id })
		})
}

module.exports = {
	requestUserToRegister: requestUserToRegister,
	createNewUser: createNewUser,
}