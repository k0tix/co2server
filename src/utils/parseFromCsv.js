const fs = require('fs')
const csv = require('fast-csv')
const nodeSchedule = require('node-schedule')

const models = require('../models').models

var populationStream = fs.createReadStream('./src/utils/data/API_SP.POP.TOTL_DS2_en_csv_v2_10473719.csv')

var emissionStream = fs.createReadStream('./src/utils/data/API_EN.ATM.CO2E.KT_DS2_en_csv_v2_10473877.csv')

var countries = []
var populations = []
var emissions = []

var populationCountryCsvStream = csv()
    .on('data', async (data) => {
        setCountry(countries, data)
        setValues(populations, data)
    })
    .on('end', async () => {
        try {
            await models.Country.bulkCreate(countries)
            await models.Population.bulkCreate(populations)
        } catch (error) {
            console.error('Population and country csv parsing failed: ' + error)
        }
        console.log('Population and country values set')
    })

var emissionCsvStream = csv()
    .on('data', async (data) => {
        setValues(emissions, data)
    })
    .on('end', async () => {
        try {
            await models.Emission.bulkCreate(emissions)
        } catch (error) {
            console.error('Emission csv parsing failed: ' + error)
        }
        console.log('Emission values set')
    })

const setCountry = (countries, data) => {
    countries.push
        ({
            name: data[0],
            code: data[1],
        })
}

//Can be used both for population and emission data
const setValues = (valueArray, data) => {
    var startingYear = 1960                         

    for (var i = 4; i < data.length; i++) {
        valueArray.push({
            value: isNaN(parseInt(data[i])) ? null : parseInt(data[i]),
            year: startingYear.toString(),
            countryCode: data[1]
        })

        startingYear++
    }
}

const setEmission = (values, data) => {
    var startingYear = 1960

    var populationValues = populations.filter(p => p.countryCode === data[1])

    console.log('VALUE:' + populationValues)

    const value = isNaN(parseInt(data[i])) ? null : parseInt(data[i])
    const perCapitaValue = (isNan(parseInt(data[i])) || populations.filter())

    for(var i = 4; i < data.length; i++) {

    }
}

const getPopulationsAndCountries = () => {
    return populationStream.pipe(populationCountryCsvStream)
}

const getEmissions = () => {
    emissionStream.pipe(emissionCsvStream)
}

module.exports = {
    getPopulationsAndCountries, getEmissions
}