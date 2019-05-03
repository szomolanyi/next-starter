const mongodb = require('mongodb')

let client = null

const getDatabase = () => {
  if (!client) {
    client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, autoReconnect: true })
  }
  if (!client.isConnected()) {
    return client.connect().then(()=>client.db())
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
