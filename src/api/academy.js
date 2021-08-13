const request = require('request');
const { URL } = require('../settings');

module.exports = {
    GetAllCourseByCategory: async (categoryId) => {
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
    GetCourseByName: async (name) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + '/courses',
                    qs: { search: name },
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
    GetAllCourses: async () => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + '/courses',
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
    GetCourseById: async (courseId) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: URL.API_ACADEMY + `/courses/${courseId}`,
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
