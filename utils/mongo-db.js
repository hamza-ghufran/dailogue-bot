const config = require('../config')
const mongo = require('mongodb').MongoClient

let url = `${config.mongoDb.connector}://${config.mongoDb.host}:${config.mongoDb.port}/test`
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports.mongodb = mongo.connect(url, options)
