const sensorModel = require('../models/SensorModel')

class sensorController {
    // [GET]
    index(req, res) {
        // Get 20 data from the final of sensor in DB
        sensorModel.find().sort({ createdAt: -1 }).limit(20).exec((err, docs) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
              } else {
                res.send(docs);
              }
        });
    }
}

module.exports = new sensorController();