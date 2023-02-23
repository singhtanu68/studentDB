
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app = express();
app.use(cors());
const routes = require('./routes');
const { host, port } = require('./config');
const { connections } = require('./config/database');

app.set("view engine", "ejs");

app.set('locale','en');
global.LOCALE= app.get('locale');
process.env.LOCALE= app.get('locale');


app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


// API routes
app.use(routes);

app.get('/', (req, res, next) => {
    res.send('working server');
})

const server = app.listen(port, async () => {
    console.log(`Server up successfully - host: ${host} port: ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('possibly unhandled rejection happened');
    console.log(err.message);
});

const closeHandler = () => {
    Object
        .values(connections)
        .forEach((connection) => connection.close());

    server.close(() => {
        console.log('Server is stopped succesfully');
        process.exit(0); /* eslint-disable-line */
    });
};

process.on('SIGTERM', closeHandler);
process.on('SIGINT', closeHandler);

