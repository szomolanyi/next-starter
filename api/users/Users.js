
const typeDefs = `
type Query {
  users: [User]
  currentUser: User
}

type User {
  _id: ID!
  email: String!
  password: String
}

type Result {
  error: String
}

type Mutation {
  createUser(email: String!, password: String!): User
  deleteUser(_id: ID!): Boolean
  editUser(_id: ID!, email: String!, password: String!): User
  login(email: String!, password: String!): User
  logout: Boolean
}
`;
module.exports = typeDefs;
