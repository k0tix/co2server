const http = require('http')
const fs = require('fs')
const yauzl = require('yauzl')

const getPopulationsAndCountries = require('./parseFromCsv').getPopulationsAndCountries
const getEmissions = require('./parseFromCsv').getEmissions

const fetch = (url, destination, callback) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination)
        const request = http.get(url, (response) => {
            response.pipe(file)
            file.on('finish', () => {
                resolve("File fetched succesfully")
                file.close(callback)
            })
        })

        request.on('error', (error) => {
            fs.unlink(destination)
            if (callback) {
                callback(error.message)
            }
            reject("Fetching file failed")
        })

        request.setTimeout(10000, () => {
            request.abort()
        })
    })
}

const processZip = (path) => {
    return new Promise((resolve, reject) => {
        yauzl.open(path, {lazyEntries: true}, (error, zipfile) => { //path can be "./src/utils/data.zip"
            if (error) {
                reject('unzip failed')
                console.log('1')
                throw error
            }
            zipfile.readEntry()
            zipfile.on("entry", (entry) => {
                if(entry.fileName.includes('Metadata')) {
                    zipfile.readEntry()
                } else {
                    zipfile.openReadStream(entry, (error, readStream) => {
                        if (error) {
                            reject(error)
                            throw error
                        }
                        // ensure parent directory exists, and then:
                        const filePath = `./src/utils/data/${entry.fileName}`
                        readStream.pipe(fs.createWriteStream(filePath))

                        readStream.on('end', () => {
                            //remove unneccessary lines
                            fs.readFile(filePath, 'utf8', (error, data) => {
                            if(error) {
                                reject(error)
                                throw error
                            }
                                var linesExceptHeaders = data.split('\r\n').slice(5).join('\r\n')
                                fs.writeFile(filePath, linesExceptHeaders, () => {})
                            })

                            if(entry.fileName.includes('SP.POP.TOTL')) {
                                //getPopulationsAndCountries(filePath)
                                console.log('population data processed')
                                //resolve(filePath)
                            } else {
                                //etEmissions(filePath)
                                console.log('emission data processed')
                                //resolve(filePath)
                            }
                            zipfile.close()
                            resolve(filePath)
                        })                    
                    })
                }
                
            })
        })
    })
}

const fetchAndProcessZip = async (url ,destination, name, callback) => {
    const fileDestination = destination + '/' + name.concat('.zip')
    await fetch(url, fileDestination, callback)
    const filePath = await processZip(fileDestination)
    console.log(filePath)
    return filePath
}

module.exports = {
    fetch, processZip, fetchAndProcessZip
}