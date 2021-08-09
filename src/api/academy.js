const request = require('request');
const { URL } = require('../settings');

module.exports = {
    GetAllCourse: async (categoryId) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + '/courses',
                    qs: { category: categoryId },
                    method: 'GET',
                },
                (err, res, body) => {
                    if (!err) {
                        console.log('Success!');
                        resolve(JSON.parse(body).courses);
                    } else {
                        console.error('Oops! Error:' + err);
                        reject();
                    }
                }
            );
        });
    },

    GetAllCategory: () => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + '/categories/tree',
                    method: 'GET',
                },
                (err, res, body) => {
                    if (!err) {
                        console.log('Success!');
                        resolve(JSON.parse(body).categories);
                    } else {
                        console.error('Oops! Error:' + err);
                        reject();
                    }
                }
            );
        });
    },

    GetAllPromotion: () => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + '/promotions',
                    method: 'GET',
                },
                (err, res, body) => {
                    if (!err) {
                        console.log('Success!');
                        resolve(JSON.parse(body).promotions);
                    } else {
                        console.error('Oops! Error:' + err);
                        reject();
                    }
                }
            );
        });
    },
};
