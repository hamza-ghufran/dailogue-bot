const sendTextMessage = require('../../utils/send-message');
const logActivity = require('../user/log-activity/api')
const { sessionClient, request } = require('../../utils/sessionclient')

module.exports = (data) => {
	const { user_id, message } = data

	request.queryInput.text.text = message
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