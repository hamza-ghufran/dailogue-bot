const config = require('../config')
const redis = require('redis')

const client = redis.createClient();

client.on('connect', function () {
  console.log('redis connected');
});

module.exports.redis = client
