
const typeDefs = `
extend type Query {
  users: [User]
  currentUser: User
}

type User {
  _id: ID!
  email: String!
  isVerified: Boolean
  firstName: String
  lastName: String
  displayName: String
  avatar: String
}

type Result {
  error: String
}

extend type Mutation {
  createUser(email: String!, password: String!): User
  deleteUser(_id: ID!): Boolean
  editUserProfile(firstName: String, lastName: String): User
  editUser(_id: ID!, email: String!, password: String!): User
  login(email: String!, password: String!): User
  logout: Boolean
  sendVerifyEmail: Boolean
  verifyEmail(token: String!): Response
  setImageUrl(url: String, type: String): User
  signCloudinaryUpload(data: String!): String
}
`;
module.exports = typeDefs;
