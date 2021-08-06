const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello Word!');
});

app.use('/webhook', require('./routes/webhook'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
