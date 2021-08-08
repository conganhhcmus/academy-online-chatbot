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
    getProfileById: (sender_psid) => {
        // Send the HTTP request to the Messenger Platform
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: `https://graph.facebook.com/${sender_psid}?fields=name,gender,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
                    method: 'GET',
                },
                (err, res, body) => {
                    if (!err) {
                        console.log('get profile success!');
                        resolve(JSON.parse(body));
                    } else {
                        console.error('Unable to get profile:' + err);
                        reject();
                    }
                }
            );
        });
    },
    removeProfile: () => {
        // Construct the message body
        let request_body = {
            fields: ['get_started'],
        };

        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: 'https://graph.facebook.com/v11.0/me/messenger_profile',
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'DELETE',
                json: request_body,
            },
            (err, res, body) => {
                if (!err) {
                    console.log('remove profile success!');
                } else {
                    console.error('Unable to remove profile:' + err);
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
