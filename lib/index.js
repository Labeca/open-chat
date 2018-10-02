var Glue = require('glue');
var Hapi = require('hapi');

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
        plugin: './messages.js'
      }
    ]
  },
}

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });
    await server.start();
    console.log('hapi days!');
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
