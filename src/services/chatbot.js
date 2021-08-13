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
    let response_search = {
        text: `You can find courses with form: \n"Search:<Name of Courses>"`,
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
                                title: '📜 CATEGORIES',
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
    await messengerAPI.callSendAPI(sender_psid, response_search);
};

let ShowCourses = async (sender_psid, categoryId) => {
    let data = await academyAPI.GetAllCourseByCategory(categoryId);
    let elements = [];

    data.forEach((element) => {
        elements.push({
            title: element.title,
            subtitle: element.shortDescription,
            image_url: URL.API_ACADEMY + '/resources/image/' + element.avatar,
            buttons: [
                {
                    type: TYPE.POSTBACK,
                    title: 'ℹ️ VIEW DETAIL',
                    payload: element._id,
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
                title: '🔙 BACK TO CATEGORIES',
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
                    title: '📚 VIEW COURSES',
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
let ShowAllCourses = async (sender_psid) => {
    let data = await academyAPI.GetAllCourses();
    let elements = [];

    data.forEach((element) => {
        elements.push({
            title: element.title,
            subtitle: element.shortDescription,
            image_url: URL.API_ACADEMY + '/resources/image/' + element.avatar,
            buttons: [
                {
                    type: TYPE.POSTBACK,
                    title: 'ℹ️ VIEW DETAIL',
                    payload: element._id,
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
                title: '🔙 BACK TO CATEGORIES',
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
let ShowDetailCourse = async (sender_psid, courseId) => {
    let data = await academyAPI.GetCourseById(courseId);
    let response = {
        text: `Title: ${data.title}\nRating: ${data.rating}\nStatus: ${
            data.isComplete ? 'Hoàn thành' : 'Chưa hoàn thành'
        }\nStudents: ${data.students.length} Members\nDescription: ${
            data.shortDescription
        }\nPrice: ${data.originPrice}$\nPromotion: ${data.promotion.title}\n`,
    };
    messengerAPI.callSendAPI(sender_psid, response);
};
module.exports = {
    handleMessage: async (sender_psid, received_message) => {
        let response;

        // Checks if the message contains text
        if (received_message.text) {
            let arr = received_message.text.split(':');
            if (arr[0] == 'Search') {
                let data = await academyAPI.GetCourseByName(arr[1]);
                let elements = [];
                console.log(data);

                data.forEach((element) => {
                    elements.push({
                        title: element.title,
                        subtitle: element.shortDescription,
                        image_url:
                            URL.API_ACADEMY +
                            '/resources/image/' +
                            element.avatar,
                        buttons: [
                            {
                                type: TYPE.POSTBACK,
                                title: 'ℹ️ VIEW DETAIL',
                                payload: element._id,
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
                            title: '🔙 BACK TO CATEGORIES',
                            payload: PAYLOAD.CATEGORIES,
                        },
                        {
                            type: TYPE.POSTBACK,
                            title: '🎁 GO TO PROMOTIONS',
                            payload: PAYLOAD.PROMOTIONS,
                        },
                    ],
                });

                response = {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'generic',
                            elements: elements,
                        },
                    },
                };
            } else {
                // Create the payload for a basic text message, which
                // will be added to the body of our request to the Send API
                let fullfilMessage = await dialogflowAPI.fullfilMessage(
                    received_message.text
                );

                response = {
                    text: fullfilMessage,
                };
            }
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
        let categories = [];
        let courses = [];
        let dataCategories = await academyAPI.GetAllCategory();
        dataCategories.forEach((element) => {
            categories.push(element._id);
        });
        let dataCourses = await academyAPI.GetAllCourses();
        dataCourses.forEach((element) => {
            courses.push(element._id);
        });
        // Get the payload for the postback
        let payload = received_postback.payload;
        let indexCategory = categories.indexOf(payload);
        let indexCourses = courses.indexOf(payload);
        console.log(categories[indexCategory]);
        console.log(courses[indexCourses]);

        if (indexCategory > -1) {
            ShowCourses(sender_psid, categories[indexCategory]);
        } else if (indexCourses > -1) {
            ShowDetailCourse(sender_psid, courses[indexCourses]);
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
                case PAYLOAD.COURSES:
                    ShowAllCourses(sender_psid);
                    break;

                default:
                    response = { text: 'Oops!' };
                    messengerAPI.callSendAPI(sender_psid, response);
            }
        }
    },
};
