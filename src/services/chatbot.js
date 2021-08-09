const messengerAPI = require('./../api/messenger');
const dialogflowAPI = require('./../api/dialogflow');
const academyAPI = require('./../api/academy');
const { PAYLOAD, TYPE, URL } = require('../settings');
const convert = require('./../utils/convert');

let GetStarted = async (sender_psid) => {
    let userProfile = await messengerAPI.getProfileById(sender_psid);
    let response = {
        text: `Welcome ${userProfile.name} to Academy Online!`,
    };

    let getStartedTemplate = {
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
                                title: '📚 COURSES',
                                payload: PAYLOAD.CATEGORIES,
                            },
                            {
                                type: TYPE.POSTBACK,
                                title: '🎁 PROMOTIONS',
                                payload: PAYLOAD.PROMOTIONS,
                            },
                        ],
                    },
                ],
            },
        },
    };

    // Send the message to acknowledge the postback
    await messengerAPI.callSendAPI(sender_psid, response);
    await messengerAPI.callSendAPI(sender_psid, getStartedTemplate);
};

let ShowCourses = async (sender_psid, categoryId) => {
    let data = await academyAPI.GetAllCourse(categoryId);
    let elements = [];

    data.forEach((element) => {
        elements.push({
            title: element.title,
            subtitle: element.shortDescription,
            image_url: URL.API_ACADEMY + '/resources/image/' + element.avatar,
            buttons: [
                {
                    type: TYPE.WEB_URL,
                    title: 'ℹ️ VIEW DETAIL',
                    url: URL.HOMEPAGE,
                    webview_height_ratio: 'full',
                },
            ],
        });
    });

    elements.push({
        title: 'MENU',
        subtitle: 'Please choose!',
        image_url: URL.OPTIONS_IMG,
        buttons: [
            {
                type: TYPE.POSTBACK,
                title: '🔙 BACK TO COURSES',
                payload: PAYLOAD.CATEGORIES,
            },
            {
                type: TYPE.POSTBACK,
                title: '🎁 GO TO PROMOTIONS',
                payload: PAYLOAD.PROMOTIONS,
            },
        ],
    });

    let response = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: elements,
            },
        },
    };

    messengerAPI.callSendAPI(sender_psid, response);
};
let ShowCategories = async (sender_psid) => {
    let data = await academyAPI.GetAllCategory();
    let elements = [];
    data.forEach((element) => {
        let subtitle = element.name.toUpperCase();

        element.child.forEach((e) => {
            subtitle += '/n' + e.name.toUpperCase();
        });
        elements.push({
            title: element.name.toUpperCase(),
            subtitle: subtitle,
            image_url: URL.CATEGORY_IMG,
            buttons: [
                {
                    type: TYPE.WEB_URL,
                    title: '🏠 HOMEPAGE',
                    url: URL.HOMEPAGE,
                    webview_height_ratio: 'full',
                },
                {
                    type: TYPE.POSTBACK,
                    title: 'ℹ️ VIEW DETAIL',
                    payload: element._id,
                },
                {
                    type: TYPE.WEB_URL,
                    title: '🔥 REGISTER!',
                    url: URL.REGISTER,
                    webview_height_ratio: 'full',
                },
            ],
        });
    });

    let response = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: elements,
            },
        },
    };

    messengerAPI.callSendAPI(sender_psid, response);
};
let ShowPromotions = async (sender_psid) => {
    let data = await academyAPI.GetAllPromotion();
    let elements = [];
    data.forEach((element) => {
        let subtitle = 'Discount: ' + element.discount * 100 + '%';
        let start = convert.timeConverter(new Date(element.start));
        let end = convert.timeConverter(new Date(element.end));
        subtitle += '\n' + 'Start: ' + start + '\n' + 'End: ' + end;

        elements.push({
            title: element.title,
            subtitle: subtitle,
            image_url: URL.PROMOTION_IMG,
            buttons: [
                {
                    type: TYPE.WEB_URL,
                    title: '🔥 GET!',
                    url: URL.PROMOTIONS,
                    webview_height_ratio: 'full',
                },
            ],
        });
    });

    let response = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: elements,
            },
        },
    };

    messengerAPI.callSendAPI(sender_psid, response);
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

    handlePostback: async (sender_psid, received_postback) => {
        let courses = [];
        let data = await academyAPI.GetAllCategory();
        data.forEach((element) => {
            courses.push(element._id);
        });
        // Get the payload for the postback
        let payload = received_postback.payload;
        let index = courses.indexOf(payload);
        console.log(courses[index]);
        if (index > -1) {
            ShowCourses(sender_psid, courses[index]);
        } else {
            // Set the response based on the postback payload
            switch (payload) {
                case PAYLOAD.GET_STARTED:
                    GetStarted(sender_psid);
                    break;
                case PAYLOAD.CATEGORIES:
                    ShowCategories(sender_psid);
                    break;
                case PAYLOAD.PROMOTIONS:
                    ShowPromotions(sender_psid);
                    break;

                default:
                    response = { text: 'Oops!' };
                    messengerAPI.callSendAPI(sender_psid, response);
            }
        }
    },
};
