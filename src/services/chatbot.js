const messengerAPI = require('./../api/messenger');
const dialogflowAPI = require('./../api/dialogflow');
const { PAYLOAD, TYPE, URL } = require('../settings');

let GetStarted = async (sender_psid) => {
    let userProfile = await messengerAPI.getProfileById(sender_psid);
    let response = {
        text: `Welcome ${userProfile.name} to Academy Online!`,
    };

    let academyTemplate = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Academy Online!',
                        subtitle:
                            'My Academy helps more people to learn IT with many courses.',
                        image_url: URL.HOMEPAGE_IMG,
                        buttons: [
                            {
                                type: TYPE.WEB_URL,
                                title: '🏠 HOMEPAGE',
                                url: URL.HOMEPAGE,
                                webview_height_ratio: 'full',
                            },
                            {
                                type: TYPE.POSTBACK,
                                title: '🔥 REGISTER!',
                                url: URL.REGISTER,
                                webview_height_ratio: 'full',
                            },
                        ],
                    },
                ],
            },
        },
    };

    // Send the message to acknowledge the postback
    await messengerAPI.callSendAPI(sender_psid, response);
    await messengerAPI.callSendAPI(sender_psid, academyTemplate);
};

module.exports = {
    handleMessage: async (sender_psid, received_message) => {
        let response;

        // Checks if the message contains text
        if (received_message.text) {
            // Create the payload for a basic text message, which
            // will be added to the body of our request to the Send API
            let fullfilMessage = await dialogflowAPI.fullfilMessage(
                received_message.text
            );

            response = {
                text: fullfilMessage,
            };
        } else if (received_message.attachments) {
            // Get the URL of the message attachment
            let attachment_url = received_message.attachments[0].payload.url;
            response = {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: [
                            {
                                title: 'Is this the right picture?',
                                subtitle: 'Tap a button to answer.',
                                image_url: attachment_url,
                                buttons: [
                                    {
                                        type: 'postback',
                                        title: 'Yes!',
                                        payload: 'yes',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'No!',
                                        payload: 'no',
                                    },
                                ],
                            },
                        ],
                    },
                },
            };
        }

        // Sends the response message
        messengerAPI.callSendAPI(sender_psid, response);
    },

    handlePostback: (sender_psid, received_postback) => {
        // Get the payload for the postback
        let payload = received_postback.payload;

        // Set the response based on the postback payload
        switch (payload) {
            case PAYLOAD.GET_STARTED:
                GetStarted(sender_psid);
                break;
            case 'yes':
                response = { text: 'Thanks!' };
                break;
            case 'no':
                response = { text: 'Oops, try sending another image.' };
                break;
            default:
                response = { text: 'Oops!' };
        }
    },
};
