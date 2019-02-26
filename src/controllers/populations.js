const populationRouter = require('express').Router()

const Population = require('../models/').models.Population

populationRouter.get('/', async (req, res) => {
    const populations = await Population.findAll()

    res.json(populations)
})

populationRouter.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const populations = await Population.findAll({
        where: {countryCode}
    })

    res.json(populations)
})

module.exports = populationRouter