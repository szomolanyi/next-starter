const mongodb = require('mongodb')

const client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true})

console.log(process.env.MONGODB_URI)

const getDatabase = async () => {
  if (client.isConnected()) {
      return client.db()
  }
  else {
    await client.connect()
    return client.db()
  }
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
