// You can find your project ID in your Dialogflow agent settings
const projectId = 'newagent-mivp'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    },
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

module.exports = {
    fullfilMessage: (userId, message) => {
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: languageCode,
                },
            },
        };

        sessionClient
            .detectIntent(request)
            .then((responses) => {
                const result = responses[0].queryResult;
                console.log(userId, result.fulfillmentText);
            })
            .catch((err) => {
                console.error('ERROR:', err);
            });
    },
};
