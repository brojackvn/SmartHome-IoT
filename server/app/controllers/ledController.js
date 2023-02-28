// Nhận json từ mqtt và dùng websocket gửi lên client (web)
// topic: iot_light_20231/esp32
// message: {"led":1,"status":1} ===> Dùng websocket gửi lên client luôn
// "led": id của led đó, "status": trạng thái của led đó


// Nhận json từ client (web) thông qua websocket gửi lên mqtt
// topic: iot_light_20231/server
// message: {"led":1,"status":1}

const LedStatusModel = require('../models/LedStatusModel')

class ledController {
    // [GET]
    index(req, res) {
        // Get from the final of led in DB
        data = LedStatusModel.find().sort({ _id: -1 }).limit(1)
        res.json(data)
    }
}

module.exports = new ledController();