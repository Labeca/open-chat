
const Boom = require('boom')
const jwt = require('jsonwebtoken')

const scheme = (server, options) => {

  return {
    authenticate: (request, h) => (
      new Promise((resolve, reject) => {
        const req = request.raw.req;
        const authorization = req.headers.authorization;
        if (!authorization) {
          throw Boom.unauthorized("Missing 'authorization' header");
        }

        jwt.verify(authorization, '123absh9856l27', (err, decoded) => {
          if (err) { return reject(Boom.unauthorized(err)) }

           return resolve(h.authenticated({ credentials: { email: decoded.email } }))
        })
      })
    )

  };
};


module.exports = {
  scheme,
}
