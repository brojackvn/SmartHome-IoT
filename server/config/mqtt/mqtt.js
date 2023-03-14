const mqtt = require('mqtt')

async function connect() {
    try {
        const client = await mqtt.connect('mqtt://broker.hivemq.com:1883');
        return client;
    } catch (err) {
        console.log("=========CONNECT MQTT FAILED===============");
        return null;
    }
}

module.exports = {connect};