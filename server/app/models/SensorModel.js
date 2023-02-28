const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SensorModel = new Schema({
    temperature: {type: Number},
    humidity: {type: Number}
})

module.exports = mongoose.model('sensor', SensorModel)