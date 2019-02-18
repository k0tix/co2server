import fs from 'fs'
import csv from 'fast-csv'

import models from '../models'

var stream = fs.createReadStream('./src/utils/API_SP.POP.TOTL_DS2_en_csv_v2_10473719.csv')

var countries = []
var populations = []
var emissions = []

var csvStream = csv()
    .on('data', async (data) => {
        setCountry(countries, data)
        setValues(populations, data)
    })
    .on('end', async () => {
        try {
            await models.Country.bulkCreate(countries)
            await models.Population.bulkCreate(populations)
        } catch (error) {
            console.log('ERROR: ' + error)
        }
        console.log('Values set')
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

const getValues = () => {
    stream.pipe(csvStream)
}

export default getValues