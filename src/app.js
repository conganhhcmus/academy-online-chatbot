const express = require('express');
const app = express();

// config
require('./config')(app);
// settings
require('./settings')(app);

app.get('/', (req, res) => {
    res.send('Hello Word!');
});

app.use('/webhook', require('./routes/webhook'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
