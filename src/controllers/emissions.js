import { Router } from 'express'

import models from '../models'

const emissionRouter = Router()

emissionRouter.get('/', async (req, res) => {
    const emissions = await models.Emission.findAll()

    res.json(emissions)
})

export default emissionRouter