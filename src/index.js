import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'

import { sequelize } from './models'

import EmissionRouter from './controllers/emissions'
import PopulationRouter from './controllers/populations'
import CountryRouter from './controllers/countries'

import { getPopulationsAndCountries, getEmissions } from './utils/parseFromCsv'
import { fetch, unzip } from './utils/fileFetcher'

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
    const path = './src/utils/data.zip'
    /*fetch('http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv', path)
      .then(() => {
        unzip()
      })*/

      getPopulationsAndCountries()
      getEmissions()
  })
  .catch(error => {
    console.error('Error: ' + error)
})

server.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})

//http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv
//http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv