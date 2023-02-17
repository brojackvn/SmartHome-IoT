const LedStatusModel = require('../models/LedStatusModel')

class ledController {
    // [GET]
    index(req, res) {
        LedStatusModel.find({}, (err, ledStatus) => {
            if (!err) {
                res.json(ledStatus)
            } else {
                res.status(404).json({error: "Error Message"})
            }
        })
    }
}