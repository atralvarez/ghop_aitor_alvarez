'use strict'

const axios = require('axios')
const basePath = require('app-root-path').resolve('/src')

const tpvService = require(`${basePath}/services/tpv.service`)

const { tpvPath } = require(`${basePath}/utils/constants.util`)

exports.createRequest = async (reading) => {
    try{
        console.log('Adding new TPV request to the database...')

        return await tpvService.addRequest(reading)

    } catch (error) {
        throw error
    }
}

exports.sendRequest = async (request) => {
    try{
        console.log('Sending request to TPV...')

        return await axios.post(tpvPath, request)

    } catch (error) {
        throw error
    }
}

exports.confirmRequest = async (request) => {
    try{
        console.log('Confirming request...')

        return await tpvService.confirmRequest(request)

    } catch (error) {
        throw error
    }
}