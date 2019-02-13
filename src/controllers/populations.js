import { Router } from 'express'

import models from '../models'

const populationRouter = Router()

populationRouter.get('/', async (req, res) => {
    const populations = await models.Population.findAll()

    res.json(populations)
})

populationRouter.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const populations = await models.Population.findAll({
        where: {countryCode}
    })

    res.json(populations)
})

export default populationRouter