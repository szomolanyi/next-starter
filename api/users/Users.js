
const typeDefs = `
type Query {
  users: [User]
}

type User {
  _id: ID!
  email: String!
  password: String
}

type Mutation {
  createUser(email: String!, password: String!): User
  deleteUser(_id: ID!): Boolean
  editUser(_id: ID!, email: String!, password: String!): User
}
`;
module.exports = typeDefs;
