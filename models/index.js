const mongodb = require('mongodb')

const client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true})
const database_promise = client.connect()

const getDatabase = () => {
  return database_promise.then(()=>{
    return client.db()
  })
}

module.exports=getDatabase
