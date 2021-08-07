const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};
