'use strict'

let knexfile = require('../knexfile')
let knex = require('knex')(knexfile.development)

module.exports.mysql = knex