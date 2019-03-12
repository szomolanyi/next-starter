const mongodb = require('mongodb')

const client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true})

const getDatabase = () => {
  if (client.isConnected()) {
    console.log('tt1')
    return client.db()
  }
  else {
    console.log('tt2')
    return client.connect().then(() => {
      console.log('tt3')
      return client.db()
    })
  }
}

const getCollection = (name) => {
  return getDatabase().then((db) => db.collection(name))
}

module.exports = { getDatabase, getCollection}
