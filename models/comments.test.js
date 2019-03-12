const comments = require('./comments')

test('pokus', () => {
  expect(1).toBe(1)
})

test('creates comment', () => {
  return comments.createComment("First comment", "First comment text")  
    .then((id) => {
      console.log('created '+id)
      expect(id).toBeDefined()
    })
})

