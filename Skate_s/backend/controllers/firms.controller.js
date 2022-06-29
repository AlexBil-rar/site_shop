const FirmsSchema = require('../models/firms.model')

class FirmsController {
    async getAll(req, res) {
        const firms = await FirmsSchema.find()
        return res.json(firms)
    }

}

module.exports = new FirmsController()