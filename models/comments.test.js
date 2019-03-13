const comments = require('./comments')
const mongo = require('./mongo')

/*
afterAll(async () => {
  const db = await mongo.getDatabase()
  await db.dropCollection(comments.CollectionName)
  await mongo.closeDatabase()
})
*/

beforeAll(async () => {
  const db = await mongo.getCollection(comments.CollectionName)
  await db.deleteMany()
})

test('comments CRUD', async () => {
  const id = await comments.createComment("First comment", "First comment text")  
  expect(id).toBeDefined()
  const id1 = await comments.createComment("Second comment", "Second comment text")  
  expect(id1).toBeDefined()
  const col = await mongo.getCollection(comments.CollectionName)
  const c1 = await col.findOne({ text: "First comment text"})
  expect(c1).toEqual({ _id: id, title: "First comment", text: "First comment text"})
})
