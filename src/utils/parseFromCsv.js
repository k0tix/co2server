const fs = require('fs')
const csv = require('fast-csv')

const models = require('../models').models

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
        setEmissions(emissions, data)
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

const setEmissions = (valueArray, data) => {
    var startingYear = 1960

    var populationValues = populations.filter(p => p.countryCode === data[1])

    var populationsIndex = 0
    for(var i = 4; i < data.length; i++) {
        const value = isNaN(parseInt(data[i])) ? null : parseInt(data[i])
        const populationValue = populationValues[populationsIndex].value
        valueArray.push({
            value: value,
            perCapitaValue: (value === null || populationValue === null) ? null : 1000*(value / populationValue), //convert to metric tons
            year: startingYear.toString(),
            countryCode: data[1]
        })

        populationsIndex++
        startingYear++
    }
}

const getPopulationsAndCountries = (filePath) => {
    return new Promise((resolve, reject) => {
        var stream = fs.createReadStream(filePath).pipe(populationCountryCsvStream)
        stream.on('finish', () => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        stream.on('error', () => {
            reject('error')
        })
    })
}

const getEmissions = (filePath) => {
    return new Promise((resolve, reject) => {
        var stream = fs.createReadStream(filePath).pipe(emissionCsvStream)
        stream.on('finish', () => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        stream.on('error', () => {
            reject('error')
        })
    })
}

module.exports = {
    getPopulationsAndCountries, getEmissions
}