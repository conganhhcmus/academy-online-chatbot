const request = require('request');
const { URL } = require('../settings');

module.exports = {
    GetAllCourse: (categoryId) => {
        request(
            {
                uri: URL.API_ACADEMY + '/courses',
                qs: { category: categoryId },
                method: 'GET',
            },
            (err, res, body) => {
                if (!err) {
                    console.log('Success!');
                    console.log(body);
                } else {
                    console.error('Oops! Error:' + err);
                }
            }
        );
    },

    GetAllCategory: async () => {
        let response = {};
        await request(
            {
                uri: URL.API_ACADEMY + '/categories/tree',
                method: 'GET',
            },
            (err, res, body) => {
                if (!err) {
                    console.log('Success!');
                    console.log(body);
                    response = body.categories;
                } else {
                    console.error('Oops! Error:' + err);
                }
            }
        );
        return response;
    },

    GetAllPromotion: () => {
        request(
            {
                uri: URL.API_ACADEMY + '/promotions',
                method: 'GET',
            },
            (err, res, body) => {
                if (!err) {
                    console.log('Success!');
                    console.log(body);
                } else {
                    console.error('Oops! Error:' + err);
                }
            }
        );
    },
};
