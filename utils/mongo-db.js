const config = require('../config')
const mongo = require('mongodb').MongoClient

let url = `${config.mongoDb.connector}://${config.mongoDb.host}:${config.mongoDb.port}`
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// const mongodb = () => mongo.connect(url, options, (err, client) => {
//   if (err) {
//     console.error(err)
//   }

//   return client.db('test')
// })


module.exports.mongodb = mongo.connect(url, options)
