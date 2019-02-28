require('dotenv').config()
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const scheduler = require('node-schedule')

const sequelize = require('./models/').sequelize

const getEmissions = require('./utils/parseFromCsv').getEmissions
const getPopulationsAndCountries = require('./utils/parseFromCsv').getPopulationsAndCountries

const EmissionRouter = require('./controllers/emissions')
const PopulationRouter = require('./controllers/populations')
const CountryRouter = require('./controllers/countries')

//const getPopulationsAndCountries = require('./utils/parseFromCsv').getPopulationsAndCountries
//const getEmissions = require('./utils/parseFromCsv').getEmissions

const populationLink = 'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv'
const emissionLink = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv'

const fetchAndProcessZip = require('./utils/fileFetcher').fetchAndProcessZip

const app = express()

//middlewares

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes

app.use('/api/emission', EmissionRouter)
app.use('/api/population', PopulationRouter)
app.use('/api/country', CountryRouter)

const server = http.createServer(app)

sequelize.sync({force: true})

const update = async () => {
  const populationPath = await fetchAndProcessZip(populationLink, './src/utils/data', 'population')

  const emisisonPath = await fetchAndProcessZip(emissionLink, './src/utils/data', 'emission')

  await getPopulationsAndCountries(populationPath)
  await getEmissions(emisisonPath)
}

scheduler.scheduleJob('* 2 * * *', () => {
  try {
    update()
  } catch (error) {
    console.log(error)
  }
})

server.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})