const ledRouter = require('./led');

function route(app) {
    app.use('/led', ledRouter);
    // app.use('/temperature', temperRouter);
}

module.exports = route;
