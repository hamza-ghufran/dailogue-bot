const sendTextMessage = require('../../utils/send-message');
const logActivity = require('../user/log-activity/api')
const { sessionClient, request } = require('../../utils/sessionclient')
const async = require('async').auto
const { mysql } = require('../../utils/knex')

module.exports = (data) => {
	const { user_id, message, user_name } = data

	request.queryInput.text.text = message


	// let query = mysql('user_chat')

	// query
	//     .orderBy('created_at', 'desc')
	//     .first('created_at')

	//     .then((chat_created_at) => {
	//         console.log(chat_created_at[0].chat_created_at)

	//         if (chat_created_at[0].chat_created_at){

	//         }
	//     })
	//     .catch((error) => {
	//         console.log(error)
	//     })

	// var ONE_HOUR = 60 * 60 * 1000; /* ms */

	// new Date().getTime() - new Date('2020-05-23T02:23:51.000Z') > ONE_HOUR

	sessionClient
		.detectIntent(request)
		.then(responses => {
			const result = responses[0].queryResult;

			let dataObj = {
				user_id: user_id,
				request: message,
				response: result.fulfillmentText
			}

			logActivity(dataObj, (err, res) => {
				if (err) {
					console.log(err)
				}
			})

			return sendTextMessage(user_id, result.fulfillmentText);
		})
		.catch(err => {
			console.error('ERROR:', err);
		});
}