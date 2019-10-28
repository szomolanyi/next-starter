
const typeDefs = `
extend type Query {
  users: [User]
  currentUser: User
  user(_id: ID!): User
}

type User {
  _id: ID!
  email: String!
  isVerified: Boolean
}

type Result {
  error: String
}

extend type Mutation {
  createUser(email: String!, password: String!): User
  deleteUser(_id: ID!): Boolean
  editUser(_id: ID!, email: String!, password: String!): User
  login(email: String!, password: String!): User
  logout: Boolean
  sendVerifyEmail: Boolean
  verifyEmail(token: String!): Response
}
`;
module.exports = typeDefs;
