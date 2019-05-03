const getCollection=require('./mongo').getCollection
const ObjectID = require('mongodb').ObjectID

const CollectionName = 'Users'

const createUser = async (email, password) => {
  const col = await getCollection(CollectionName)
  const result = await col.insertOne({ email, password })
  return result.insertedId
}

const findById = async (_id) => {
  const col = await getCollection(CollectionName)
  const result = await col.findOne({_id: new ObjectID(_id)})
  return result
}

const findUser = async (find_obj) => {
  const col = await getCollection(CollectionName)
  const result = await col.findOne(find_obj)
  return result
}

module.exports = {createUser, findUser, findById}
