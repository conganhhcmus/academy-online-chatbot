const messengerAPI = require('./../api/messenger');
const dialogflowAPI = require('./../api/dialogflow');
const { PAYLOAD } = require('../settings');

module.exports = {
    handleMessage: async (sender_psid, received_message) => {
        let response;

        // Checks if the message contains text
        if (received_message.text) {
            // Create the payload for a basic text message, which
            // will be added to the body of our request to the Send API
            response = {
                text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
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
        let response;

        // Get the payload for the postback
        let payload = received_postback.payload;

        // Set the response based on the postback payload
        switch (payload) {
            case PAYLOAD.GET_STARTED:
                response = { text: 'Welcome to Academy Online Learning!' };
                break;
            case 'yes':
                response = { text: 'Thanks!' };
                break;
            case 'no':
                response = { text: 'Oops, try sending another image.' };
                break;
        }
        // Send the message to acknowledge the postback
        messengerAPI.callSendAPI(sender_psid, response);
    },
};
