const countryRouter = require('express').Router()

const models = require('../models/').models

countryRouter.get('/', async (req, res) => {
    const countries = await models.Country.findAll()

    res.json(countries)
})

countryRouter.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const country = await models.Country.findOne({
        where: {code: countryCode},
        include: [models.Population, models.Emission]
    })

    res.json(country)
})

module.exports = countryRouter