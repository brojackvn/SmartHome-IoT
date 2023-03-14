const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SensorModel = new Schema({
    time: {type: Date, default: Date.now},
    temperature: {type: Number},
    humidity: {type: Number}
})

module.exports = mongoose.model('sensors', SensorModel)