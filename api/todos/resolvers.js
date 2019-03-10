module.exports = {
  Query: {
    todos: () => [
      {id: 1, text: "Make coffe"},
      {id: 2, text: "Buy cake"}
    ]
  },
  Mutation: {
    createTodo: (obj, { text }) => {
      return {id:1, text}
    },
    deleteTodo: (obj, { id }) => {
      return true
    },
    editTodo: (Obj, { id, text }) => {
      return {
        id: 1,
        text: text
      }
    }
  }
}
