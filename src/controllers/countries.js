import { Router } from 'express'

import models from '../models'

const countryRouter = Router()

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

export default countryRouter