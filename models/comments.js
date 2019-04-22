const getCollection=require('./mongo').getCollection
const ObjectID = require('mongodb').ObjectID

const CollectionName = 'Comments'

const getComments = async () => {
  col = await getCollection(CollectionName)
  const docs = await col.find().toArray()
  return docs
}

const createComment = async (title, text) => {
  const col = await getCollection(CollectionName)
  const result = await col.insertOne({ title, text })
  return result.insertedId
}

const editComment = async (_id, title, text) => {
  const col = await getCollection(CollectionName)
  const result = await col.updateOne({_id:new ObjectID(_id)}, {$set: {title, text}})
  console.log(result)
  if (result.modifiedCount === 1)
    return {_id, title, text}
  else throw new Error("Update failed") //TODO: error handling
}

module.exports = {CollectionName, getComments, createComment, editComment}
