'use strict'

const axios = require('axios')
const basePath = require('app-root-path').resolve('/src')

const readerService = require(`${basePath}/services/reader.service`)

const { rfidPath } = require(`${basePath}/utils/constants.util`)
let currentData, lastData;

exports.listen = async () => {
    try{
        console.log('Waiting for RFID changes...')

        let request = await axios.get(rfidPath)
        currentData = request.data

        if (dataHasChanged()) {

            console.log('\n¡RFID change detected!')

            lastData = currentData
            
            return await readerService.saveReading(currentData)
        }
    } catch (error) {
        throw error
    }
}

const dataHasChanged = () => JSON.stringify(currentData) !== JSON.stringify(lastData)