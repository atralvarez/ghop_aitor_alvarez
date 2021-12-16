'use strict'

const axios = require('axios')
const basePath = require('app-root-path').resolve('/src')

const dbPool = require(`${basePath}/db`)

exports.addRequest = async (data) => {
    try {
        const sqlQuery = 'INSERT INTO ttpv (lectura, nombre, productos, confirmado) VALUES (?,?,?,?)'
        const result = await dbPool.query(sqlQuery, [data?.lectura,data?.nombre,data?.productos,0])

        console.log(`TPV request (ID ${data.peticion}) inserted successfully, pending confirmation`)
        
        return result?.rows[0]
    } catch (error) {
        throw error
    }
}

exports.confirmRequest = async (data) => {
    try {
        const sqlQuery = 'UPDATE ttpv SET confirmado=1 WHERE peticion=?'
        const result = await pool.query(sqlQuery, data?.peticion)

        console.log(`TPV request (ID ${data?.peticion}) confirmed successfully\n`)
        
        return result?.rows[0]
    } catch (error) {
        throw error
    }
}