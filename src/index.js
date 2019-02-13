import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'

import { sequelize } from './models'

import EmissionRouter from './controllers/emissions'
import PopulationRouter from './controllers/populations'
import CountryRouter from './controllers/countries'

const app = express()

//middlewares

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes

app.use('/api/emission', EmissionRouter)
app.use('/api/population', PopulationRouter)
app.use('/api/country', CountryRouter)

const server = http.createServer(app)

sequelize.sync({ force: true })
  .then(async () => {
    console.log('database synced')
  })
  .catch(error => {
    console.error('Error: ' + error)
})

server.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})