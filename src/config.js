var config = {};

config.DEV = {
    PORT: 3000,
};

config.PROD = {
    PORT: process.env.PORT,
};

module.exports = config[process.env.NODE_ENV];
