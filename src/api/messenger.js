const request = require('request');
const { PAYLOAD } = require('../settings');

module.exports = {
    callSendAPI: (sender_psid, response) => {
        // Construct the message body
        let request_body = {
            recipient: {
                id: sender_psid,
            },
            message: response,
        };

        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'POST',
                json: request_body,
            },
            (err, res, body) => {
                if (!err) {
                    console.log('message sent!');
                } else {
                    console.error('Unable to send message:' + err);
                }
            }
        );
    },

    setUpProfile: () => {
        // Construct the message body
        let request_body = {
            get_started: {
                payload: PAYLOAD.GET_STARTED,
            },
            whitelisted_domains: [
                'https://academy-online-chatbot.herokuapp.com/',
            ],
        };

        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: 'https://graph.facebook.com/v11.0/me/messenger_profile',
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'POST',
                json: request_body,
            },
            (err, res, body) => {
                if (!err) {
                    console.log('setup profile success!');
                } else {
                    console.error('Unable to setup profile:' + err);
                }
            }
        );
    },
};
