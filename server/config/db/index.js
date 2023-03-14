const mongoose = require('mongoose');

async function connect() {
    let client;
    try {
        client = await mongoose.connect('mongodb+srv://brojackvn:brojackvn@cluster0.vdhev8m.mongodb.net/Smarthome-IoT');
        console.log("=========CONNECT DB SUCCESSFULLY=========");
    } catch (err) { 
        console.log("=========CONNECT DB FAILED===============");
    }
    return client
}

module.exports = {connect};