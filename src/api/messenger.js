const request = require('request');
const { PAYLOAD, TYPE, URL } = require('../settings');

let sendMarkReadMessage = (sender_psid) => {
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        sender_action: 'mark_seen',
    };
    request(
        {
            uri: URL.API_MESSENGER + '/me/messages',
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
};
let sendTypingOn = (sender_psid) => {
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        sender_action: 'typing_on',
    };
    request(
        {
            uri: URL.API_MESSENGER + '/me/messages',
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
};

module.exports = {
    callSendAPI: async (sender_psid, response) => {
        // send mark & typing on
        await sendMarkReadMessage(sender_psid);
        await sendTypingOn(sender_psid);

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
                uri: URL.API_MESSENGER + '/me/messages',
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
                uri: URL.API_MESSENGER + '/me/messenger_profile',
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
            whitelisted_domains: [URL.HOMEPAGE],
        };

        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: URL.API_MESSENGER + '/me/messenger_profile',
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
                            type: TYPE.POSTBACK,
                            title: '📚 COURSES',
                            payload: PAYLOAD.CATEGORIES,
                        },
                        {
                            type: TYPE.POSTBACK,
                            title: '🎁 PROMOTIONS',
                            payload: PAYLOAD.PROMOTIONS,
                        },
                        {
                            type: TYPE.WEB_URL,
                            title: '🔥 REGISTER!',
                            url: URL.REGISTER,
                            webview_height_ratio: 'full',
                        },
                        {
                            type: TYPE.POSTBACK,
                            title: '👋 GET STARTED',
                            payload: PAYLOAD.GET_STARTED,
                        },
                    ],
                },
            ],
        };
        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: URL.API_MESSENGER + '/me/messenger_profile',
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
                uri: URL.API_MESSENGER + '/me/messenger_profile',
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
