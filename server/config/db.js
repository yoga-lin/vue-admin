const mongoose = require('mongoose')
const bluebird = require('bluebird')
const initDB = require('./initDB')

global.Promise = Promise = bluebird
mongoose.Promise = bluebird

let connect = config => {
  const endpoint = `mongodb://127.0.0.1:${config.server.port}/${config.db}`
  mongoose.connect(endpoint, {
    useMongoClient: true,
    server: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  })

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${endpoint}`)
  })

  mongoose.connection.on('error', err => {
    console.error('connection error: ', err)
  })

  mongoose.connection.on('open', () => {
    console.info(`MongoDB is connected at ${endpoint}`)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected')
  })
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection closed through app termination')
    process.exit(0);
  })
})

module.exports = {
  mongoose,
  connect,
  initDB,
}
