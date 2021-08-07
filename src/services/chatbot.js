const messengerAPI = require('./../api/messenger');
const dialogflowAPI = require('./../api/dialogflow');

module.exports = {
    handleMessage: async (sender_psid, received_message) => {
        // Check if the message contains text
        // if (received_message.text) {
        //     // Create the payload for a basic text message
        //     response = {
        //         text: `You sent the message: "${received_message.text}". Now send me an image!`,
        //     };
        // }

        let response = await dialogflowAPI.fullfilMessage(
            sender_psid,
            received_message.text
        );
        const message = {
            text: response,
        };
        console.log(response);

        // Sends the response message
        messengerAPI.callSendAPI(sender_psid, message);
    },
};