const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LedStatusModel = new Schema({
    idLed: {type: Number},
    status: {Boolean}
})

module.exports = mongoose.model('led-status', LedStatusModel)