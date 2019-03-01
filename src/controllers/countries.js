const Op = require('sequelize').Op
const countryRouter = require('express').Router()

const models = require('../models/').models

countryRouter.get('/', async (req, res) => {
    const countries = await models.Country.findAll()

    res.json(countries)
})

countryRouter.get('/code/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const country = await models.Country.findOne({
        where: {code: countryCode},
        include: [models.Population, models.Emission]
    })

    res.json(country)
})

countryRouter.get('/highestPopulation', async(req, res) => {
    const countries = await models.Country.findAll({
        include: [{model: 
            models.Population,
        where: {
            year: '2017',
            value: {
                [Op.not]: null
            }
        }}],
        order:[
            [models.Population, 'value', 'DESC']
        ]
    })

    res.json(countries)
})

countryRouter.get('/highestEmissionpercapita', async(req, res) => {
    const countries = await models.Country.findAll({
        include: [{
            model: models.Emission,
            where: {
                year: '2014',
                perCapitaValue: {
                    [Op.not]:  null
                }
            }
        }],
        order:[
            [models.Emission, 'perCapitaValue', 'DESC']
        ]
    })

    res.json(countries)
})

module.exports = countryRouter