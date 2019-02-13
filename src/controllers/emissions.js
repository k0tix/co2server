import { Router } from 'express'

import models from '../models'

const emissionRouter = Router()

emissionRouter.get('/', async (req, res) => {
    const emissions = await models.Emission.findAll()

    res.json(emissions)
})

emissionRouter.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode

    const emissions = await models.Emission.findAll({
        where: {countryCode}
    })

    res.json(emissions)
})

export default emissionRouter