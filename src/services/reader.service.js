'use strict'

const axios = require('axios')
const basePath = require('app-root-path').resolve('/src')

const dbPool = require(`${basePath}/db`)

exports.saveReading = async (data) => {
    try {
        console.log('Adding new RFID reading to the database...')

        const sqlQuery = 'INSERT INTO tlecturas (nombre, productos) VALUES (?,?)'
        const result = await dbPool.query(sqlQuery, ['name', data])

        console.log(`RFID reading (ID ${data?.lectura}) saved successfully`)
        
        return result?.rows[0]
    } catch (error) {
        throw error
    }
}