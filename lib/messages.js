
var Joi = require("joi");
var connectToDB = require('../utils/mongo.js').connectToDB

const register = function (server, options) {

  server.route({
    method: 'GET',
    path: '/messages',
    config: {
      description: 'Busca mensagens'
    },
    handler: (request) => {
      return new Promise((resolve, reject) => (
        connectToDB((db) => {
          db.collection('message').find({}).toArray((err, result) => {
            if (err) { reject(err) }

            console.log('result ===>', result)
            return resolve({ code: 1, data: result })
          })
        })
      ))
    },
  })
}

module.exports = {
  register: register,
  name: "messages",
  version: require("../package.json").version
}
