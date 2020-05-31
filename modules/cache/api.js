const redis = require('../../utils/redis').redis

function cache() {
  this.client = redis
}

cache.prototype.setKey = function (key, value, ttl, cb) {
  this.client.set(key, value, cb)
  // async.auto({
  //   set: function (callback) {
  //     this.client.set(key, value, callback)
  //   },
  //   setExpiry: ['set', function (results, callback) {
  //     this.client.expire(key, ttl, callback)
  //   }]
  // }, cb)
}

cache.prototype.exists = function (key, cb) {
  this.client.exists(key, cb)
}

cache.prototype.getKey = function (key) {
  this.client.get(key)
}

cache.prototype.deleteKey = function (key, cb) {
  this.client.expire(key, 1, cb)
}

cache.prototype.push = function (key, value) {
  /**
  * email
  * name
  * password
  * dob
  */
  return Promise.resolve(this.client.rpush(key, value))
}

cache.prototype.list = function (key, cb) {
  this.client.lrange(key, 0, -1, cb)
}

cache.prototype.deleteList = function (key, cb) {
  return Promise.resolve(this.client.del(key))
}

let redisCache = new cache()

module.exports.cache = redisCache