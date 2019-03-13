const getCollection=require('./mongo').getCollection

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

module.exports = {CollectionName, getComments, createComment}
