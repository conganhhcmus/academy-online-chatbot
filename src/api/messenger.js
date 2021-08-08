const request = require('request');
const { PAYLOAD, TYPE, URL } = require('../settings');

module.exports = {
    callSendAPI: async (sender_psid, response) => {
        // Construct the message body
        let request_body = {
            recipient: {
                id: sender_psid,
            },
            message: response,
        };

        // Send the HTTP request to the Messenger Platform
        await request(
            {
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'POST',
                json: request_body,
            },
            (err, res, body) => {
                if (!err) {
                    console.log('message sent!');
                    console.log(body);
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
    setupPersistentMenu: () => {
        let request_body = {
            persistent_menu: [
                {
                    locale: 'default',
                    composer_input_disabled: false,
                    call_to_actions: [
                        {
                            type: TYPE.WEB_URL,
                            title: '🏠 HOMEPAGE',
                            url: URL.HOMEPAGE,
                            webview_height_ratio: 'full',
                        },
                        {
                            type: TYPE.WEB_URL,
                            title: '🔥 REGISTER!',
                            url: URL.REGISTER,
                            webview_height_ratio: 'full',
                        },
                        {
                            type: TYPE.POSTBACK,
                            title: 'RESTARTED!',
                            payload: PAYLOAD.GET_STARTED,
                        },
                    ],
                },
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
                    console.log('setup persistent menu success!');
                    console.log(body);
                } else {
                    console.error('Unable to setup persistent menu:' + err);
                }
            }
        );
    },
    removePersistentMenu: () => {
        let request_body = {
            persistent_menu: [
                {
                    locale: 'default',
                    composer_input_disabled: false,
                },
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
                    console.log('remove persistent menu success!');
                    console.log(body);
                } else {
                    console.error('Unable to remove persistent menu:' + err);
                }
            }
        );
    },
};
