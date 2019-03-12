const getCollection=require('./mongo').getCollection

const collection_name = 'Comments'

const getComments = () => {
  return getCollection(collection_name)
    .then((col) => {
      return col.find().toArray()
    })
    .then((err, docs) => {
      return docs
    })
}

const createComment = (title, text) => {
  return getCollection(collection_name)
    .then((col) => {
      return col.insertOne({title, text})
    })
    .then((result) => {
      return result.insertedId
    })
}

module.exports = {getComments, createComment}
