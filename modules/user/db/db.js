const mongodb = require('../../../utils/mongo-db').mongodb
let db;

mongodb.then((client) => {
  db = client.db('test')
})

module.exports = {
  createUser: (data) => {
    let fields = data
    let user = db.collection('user')

    return user.insertOne(fields)
  },
  findUser: (data) => {
    let fields = data
    let user = db.collection('user')

    return user.findOne(fields)
  },
  logUserChat: (data) => {
    let fields = data
    let user_chat = db.collection('user_chat')

    return user_chat.insertOne(fields)
  }
}
