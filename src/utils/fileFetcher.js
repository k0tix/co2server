import http from 'http'
import fs from 'fs'
import yauzl from 'yauzl'

export const fetch = (url, destination, callback) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination)

        const request = http.get(url, (response) => {
            response.pipe(file)

            file.on('finish', () => {
                file.close(callback)
                resolve("File fetched succesfully")
            })

        }).on('error', (error) => {
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

export const unzip = () => {
    yauzl.open("./src/utils/data.zip", (error, zipfile) => {
        if (error) throw error
        zipfile.on("entry", (entry) => {
            if (/\/$/.test(entry.fileName)) {
                // directory file names end with '/'
                return
            }
            zipfile.openReadStream(entry, (error, readStream) => {
                if (error) throw error
                // ensure parent directory exists, and then:
                readStream.pipe(fs.createWriteStream(`./src/utils/${entry.fileName}`))
            })
        })
    })
}