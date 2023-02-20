const express = require('express');
const morgan = require('morgan');
const route = require('./routes/index');
const db = require('./config/db');

const app = express()
const port = 3000


// Connect to database
db.connect();

// Middleware:
app.use(
    express.urlencoded({
        extended: true,
    }),
); // handle data from form to server
app.use(express.json()); // handle data (JS) from client to server: submit HTML or use JS lib: XMLHttpRequest, Fetch, axios, supervision,...

// HTTP logger
app.use(morgan('combined'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});