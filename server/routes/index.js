const ledRouter = require('./led');
const sensorRouter = require('./sensor');

function route(app) {
    app.use('/led', ledRouter);
    app.use('/sensor', sensorRouter);
}

module.exports = route;