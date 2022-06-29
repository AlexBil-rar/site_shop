const TypesSchema = require('../models/type.model')

class TypeController {
    async getAll(req, res) {
        const types = await TypesSchema.find()
        return res.json(types)
    }

}

module.exports = new TypeController()