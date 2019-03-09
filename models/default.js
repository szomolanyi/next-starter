const mongodb = require('mongodb')

let database

const connectDatabase = () => {
  const client = new mongodb.MongoClient(process.env.MONGODB_URI)
  return client.connect().then(()=>{
    console.log("Connected to mongo database")
    database = client.db()
  })
}

module.exports = {
  connectDatabase,
  database
}

