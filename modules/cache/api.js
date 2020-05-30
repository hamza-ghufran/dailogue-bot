const redis = require('../../utils/redis').redis

function cache() {
  this.client = redis
}

cache.prototype.setKey = function (key, value, ttl, cb) {
  // async.auto({
  //   set: function (callback) {
  //     this.client.set(key, value, callback)
  //   },
  //   setExpiry: ['set', function (results, callback) {
  //     this.client.expire(key, ttl, callback)
  //   }]
  // }, cb)
}

cache.prototype.getKey = function (key, cb) {
  this.client.get(key, cb)
}

cache.prototype.deleteKey = function (key, cb) {
  this.client.expire(key, 1, cb)
}

/**
 * email
 * name
 * password
 * dob
 * user_id
 */

cache.prototype.push = function (key, value, cb) {
  this.client.rpush(key, value)
}


module.exports.cache = new cache()