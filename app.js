'use strict';
const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();
require('dotenv').config({ path: 'variables.env' });

const {
	processMessage,
	checkAuthentication,
	verifyIncomingWebhook,
	requestUserToRegister
} = require('./modules/index')
const { registerHandler } = require('./utils/helpers')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(80, () => console.log('Bot app listening on port 80'));
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/webhook', (req, res) => {

	if (req.body.object === 'page') {
		req.body.entry.forEach(entry => {
			entry.messaging.forEach(event => {

				if (event.postback) {
					let dataObj = {
						user_id: event.sender.id,
						message: ''
					}

					requestUserToRegister(dataObj, registerHandler)
				}

				else if (event.message && event.message.text) {

					let dataObj = {
						user_id: event.sender.id,
						message: event.message.text
					}

					checkAuthentication(dataObj, (err, response) => {
						if (err) {
							return console.log(err)
						}

						if (response.code === 'VALID_USER') {
							dataObj.user_name = response.user_name
							processMessage(dataObj);
						}
						else {
							requestUserToRegister(dataObj, registerHandler)
						}
					})
				}
			});
		});
		res.status(200).end();
	}
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
	verifyIncomingWebhook(req, res)
});

