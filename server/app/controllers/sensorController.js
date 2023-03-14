const sensorModel = require('../models/SensorModel')

class sensorController {
    // [GET]
    index(req, res) {
        //

        // Get 20 data from the final of sensor in DB
        sensorModel.find().sort({ time: -1 }).limit(20).exec((err, docs) => {
            if (err) {
              console.error(err);
              res.status(500).send({'err': 'Internal server error'});
            } else {
              res.send(JSON.stringify(docs));
            }
        });
    }
}

module.exports = new sensorController();