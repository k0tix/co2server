require('dotenv').config()
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')

const sequelize = require('./models/').sequelize

const EmissionRouter = require('./controllers/emissions')
const PopulationRouter = require('./controllers/populations')
const CountryRouter = require('./controllers/countries')

const getPopulationsAndCountries = require('./utils/parseFromCsv').getPopulationsAndCountries
const getEmissions = require('./utils/parseFromCsv').getEmissions

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