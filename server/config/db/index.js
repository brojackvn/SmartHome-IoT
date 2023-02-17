const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://brojackvn:brojackvn@brojackvn.ccps7ka.mongodb.net/test');
        console.log("=========CONNECT SUCCESSFULLY=========");
    } catch (err) { 
        console.log("=========CONNECT FAILED===============");
    }
}

module.exports = {connect};
