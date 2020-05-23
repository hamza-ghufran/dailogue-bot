const { PROJECT_ID,
    SESSION_ID,
    LANG_CODE,
} = require('./constant')
const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(PROJECT_ID, SESSION_ID);

const request = {
    session: sessionPath,
    queryInput: {
        text: {
            text: '',
            languageCode: LANG_CODE,
        },
    },
};

module.exports = {
    sessionClient: sessionClient,
    request: request
}