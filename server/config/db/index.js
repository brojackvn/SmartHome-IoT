const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://brojackvn:brojackvn@brojackvn.ccps7ka.mongodb.net/smarthome-db');
        console.log("=========CONNECT DB SUCCESSFULLY=========");
    } catch (err) { 
        console.log("=========CONNECT DB FAILED===============");
    }
}

module.exports = {connect};
