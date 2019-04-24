const getCollection=require('./mongo').getCollection
const ObjectID = require('mongodb').ObjectID

const CollectionName = 'Users'

const createUser = async (email, password) => {
  const col = await getCollection(CollectionName)
  const result = await col.insertOne({ email, password })
  return result.insertedId
}

module.exports = {createUser}
