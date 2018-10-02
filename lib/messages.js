
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
            // db.close()
            if (err) { return reject(err) }
            return resolve({ code: 1, data: result })
          })
        })
      ))
    },
  })

  server.route({
    method: 'POST',
    path: '/messages',
    config: {
      description: 'Salva mensagem no banco',
      validate: {
        payload: {
          text: Joi.string().required(),
        }
      }
    },
    handler: (request) => {
      return new Promise((resolve, reject) => (
        connectToDB((db) => {
          db.collection('message').insert(request.payload, (err, result) => {
            // db.close()
            if (err) { return reject(err) }
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
