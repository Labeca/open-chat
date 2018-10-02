
const Joi = require("joi");
const jwt = require('jsonwebtoken')

const register = function (server, options) {

  server.route({
    method: 'POST',
    path: '/token',
    config: {
      auth: false,
      description: 'Gera token',
      validate: {
        payload: {
          email: Joi.string().required().description("Endreço de email de preferência"),
          zoneinfo: Joi.string().required("Fuso horário"),
        }
      }
    },
    handler: (request) => (
      new Promise((resolve, reject) => {
        jwt.sign(request.payload, '123absh9856l27', { algorithm: 'HS256' }, (err, token) => {
          if (err) { return reject(err) }

          return resolve({ code: 1, data: { token: token } })
        });
      })
    )
  })
}

module.exports = {
  register: register,
  name: "secutiry",
  version: require("../package.json").version
}
