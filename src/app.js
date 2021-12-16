'use strict'

const appRoot = require('app-root-path').resolve('/src');
const dotenv = require('dotenv').config()
const CronJob = require('cron').CronJob

const readerController = require(`${appRoot}/controllers/reader.controller`)
const tpvController = require(`${appRoot}/controllers/tpv.controller`)

let isRunning = false

/* This job will be executed every second */
const job = new CronJob(
  '*/1 * * * * *', async () => {
        /* If there is a task running, exit */
        if (isRunning) return

        /* If not, set "isRunning" to true in order to wait for the process to finish */
        isRunning = true
        /* Listen for RFID changes and add them to the database if necessary */
        readerController.listen()
        .then(reading => {
        /* Create a request in the database before sending it to the TPV */
            if (reading) return tpvController.createRequest(reading)
        })
        .then(request => {
        /* Send the request to the TPV and wait for its answer */
            if (request) return tpvController.sendRequest(request)
        })
        .then(result => {
         /* If everything is OK, confirm the request in the database */
            if (result?.status == 200) return tpvController.confirmRequest(result.data) //Assuming the POST response contains exactly the same data that has been sent 
        })
        .then(() => {
         /* Set "isRunning" to false in order to continue repeating the job */
            isRunning = false
        })
        .catch(error => {
            throw error
        })
  }
)

job.start();