const mongodb = require('../../../utils/mongo-db').mongodb

module.exports = {
  createUser: (data) => {
    let fields = data

    return mongodb.then((client) => {
      let db = client.db('test')
      let user = db.collection('user')

      return user.insertOne(fields)
    })
  },
  findUser: (data) => {
    let fields = data

    return mongodb.then((client) => {
      let db = client.db('test')
      let user = db.collection('user')

      return user.findOne(fields)
    })
  },
  logUserChat: (data) => {
    let fields = data

    return mongodb.then((client) => {
      let db = client.db('test')
      let user_chat = db.collection('user_chat')

      return user_chat.insertOne(fields)
    })
  }
}
