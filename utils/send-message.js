const { FACEBOOK_ACCESS_TOKEN } = process.env;
const request = require('request')

const sendTextMessage = (user_id, text) => {
	let request_body = {
		messaging_type: 'RESPONSE',
		recipient: {
			id: user_id
		},
		message: {
			text
		}
	};

	// Send the HTTP request to the Messenger Platform
	return request({
		uri: "https://graph.facebook.com/v2.6/me/messages",
		qs: {
			"access_token": FACEBOOK_ACCESS_TOKEN
		},
		method: "POST",
		body: JSON.stringify(request_body),
		headers: {
			'content-type': 'application/json',
		}
	}, (err, res, body) => {
		if (err) {
			console.error("Unable to send message:" + err);
		}
	});
}

module.exports = sendTextMessage