const mongodb = require('mongodb')

let client = null


const getDatabase = async () => {
  if (!client) {
    console.log(`Creating mongo client`)
    client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true })
  }
  if (!client.isConnected()) {
    console.log(`Connecting to mongo ${process.env.MONGODB_URI}`)
    await client.connect()
  }
  return client.db()
}

const getCollection = async (name) => {
  const db = await getDatabase()
  return db.collection(name)
}

const closeDatabase = async () => {
  if (client.isConnected()) {
    await client.close()
  }
}

module.exports = { getDatabase, getCollection, closeDatabase}
