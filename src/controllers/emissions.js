const emissionRouter = require('express').Router()

const Emission = require('../models/').models.Emission

emissionRouter.get('/', async (req, res) => {
    const emissions = await Emission.findAll()

    res.json(emissions)
})

emissionRouter.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const emissions = await Emission.findAll({
        where: {countryCode}
    })

    res.json(emissions)
})

module.exports = emissionRouter