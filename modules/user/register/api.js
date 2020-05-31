const db = require('../db/db')
const validator = require('./validate')
const cache = require('../../cache/api').cache
const { listRequirements } = require('../../../utils/helpers')

const requestUserToRegister = (data, cb) => {
	const { user_id, message } = data

	cache.exists(user_id, (err, user) => {
		if (err) {
			return cb({ code: err })
		}

		if (!user) {
			listRequirements(user_id)

			cache.push(user_id, user_id)

			return cb(null, { code: "NEW_USER", user_id: user_id })
		}

		storeUserInfo(data, cb)
	})
}


const storeUserInfo = (data, cb) => {
	const { user_id, message } = data

	cache.push(user_id, message)
		.then(() => {
			cache.list(user_id, (err, list) => {
				if (err) {
					return cb({ code: err })
				}

				if (list.length !== 5) return

				let dataObj = {
					dob: list[4],
					name: list[2],
					email: list[1],
					user_id: list[0],
					password: list[3],
				}

				createNewUser(dataObj, (err, res) => {
					if (err) {
						return cb(null)
					}

					return cb(null, res)
				})
			})
		})
		.catch((err) => {
			console.log(err)
		})
}

const createNewUser = (data, cb) => {
	let errors = validator({
		email: data.email,
		dob: data.dob
	})

	if (errors.length) {
		cache.deleteList(data.user_id)
			.then(() => {
				cache.push(data.user_id, data.user_id)
				listRequirements(data.user_id)
			})

		return cb(null, { code: 'INVALID ARGUMENTS', user_id: data.user_id, message: errors.toString() })
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
	createNewUser: createNewUser,
	requestUserToRegister: requestUserToRegister,
}