const mongoClient = require('mongodb').MongoClient

const connectToDB = (callback) => {
  // Database Name
  const dbName = 'openchat';

  mongoClient.connect("mongodb://localhost:27017")
    .then((conn) => {
      const db = conn.db(dbName)

      return callback(db)
    })
    .catch(err => console.log(err))
}

module.exports = {
  connectToDB,
}
