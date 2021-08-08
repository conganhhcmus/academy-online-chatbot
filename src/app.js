const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname + '/../.env' });
const bodyParser = require('body-parser');
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello Word!');
});

app.get('/removeGetStarted', (req, res) => {
    require('./api/messenger').removeProfile();
    res.send('Hello Word!');
});

app.get('/setupGetStarted', (req, res) => {
    require('./api/messenger').setUpProfile();
    res.send('Hello Word!');
});

app.get('/setupPersistentMenu', (req, res) => {
    require('./api/messenger').setupPersistentMenu();
    res.send('Hello Word!');
});

app.get('/removePersistentMenu', (req, res) => {
    require('./api/messenger').removePersistentMenu();
    res.send('Hello Word!');
});

app.use('/webhook', require('./routes/webhook'));

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
