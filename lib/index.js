var Glue = require('glue');
var Hapi = require('hapi');
const { scheme } = require('../utils/authentication.js')

var manifest = {
  server: {
    port: 8000,
    address: 'localhost',
  },
  register: {
    plugins: [
      {
        plugin: 'blipp',
      },
      {
        plugin: 'good',
        options: {
          ops: {
            interval: 10000
          },
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-console'
              },
              'stdout'
            ],
          }
        }
      },
      {
        plugin: './security.js'
      },
      {
        plugin: './messages.js'
      }
    ]
  },
}

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });
    server.auth.scheme('custom', scheme);
    server.auth.strategy('default', 'custom');
    server.auth.default('default');
    await server.start();
    console.log('hapi days!');
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
