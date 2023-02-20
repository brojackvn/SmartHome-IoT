// Nhận json từ mqtt và dùng websocket gửi lên client (web)
// topic: /iot_light_20231/esp32
// message: {"led":1,"status":1} ===> Dùng websocket gửi lên client luôn
// "led": id của led đó, "status": trạng thái của led đó


// Nhận json từ client (web) thông qua websocket gửi lên mqtt
// topic: /iot_light_20231/server
// message: {"led":1,"status":1}

const LedStatusModel = require('../models/LedStatusModel')
const {connect} = require('../../config/mqtt/mqtt')
const {websocket} = require('../../config/websocket/websocket')
class ledController {
    // [GET]
    index(req, res) {
        connect()
            .then(client => {
                console.log('=========CONNECT MQTT SUCCESSFUL===============');
                client.subscribe('iot_light_20231/esp32');

                client.on('message', (topic, message) => {
                    console.log(`Received message on topic "${topic}": ${message.toString()}`);
                    websocket.send(message.toString());
                });

                client.publish('iot_light_20231/server')
                setInterval(() => {
                    client.publish('iot_light_20231/server', 'Nodejs send: Hello MQTT box va esp32 nhe');
                }, 1000);
            })
            .catch(error => {
                console.error('Failed to connect to MQTT broker:', error);
            });
    }
}

module.exports = new ledController();