const typeDefs = `
extend type Query {
  users(pattern: String): [User]
  currentUser: User
  user(_id: ID!): User
}

type User {
  _id: ID!
  email: String!
  isVerified: Boolean
  firstName: String
  lastName: String
  displayName: String
  about: String
  createdAt: String
  follows: [User]
  followers: [User]
  avatar: String
  banner: String
}

type Result {
  error: String
}

extend type Mutation {
  createUser(email: String!, password: String!): User
  deleteUser(_id: ID!): Boolean
  editUserProfile(firstName: String, lastName: String, about: String): User
  editUser(_id: ID!, email: String!, password: String!): User
  login(email: String!, password: String!): User
  logout: Boolean
  sendVerifyEmail: Boolean
  verifyEmail(token: String!): Response
  followUser(_id: ID!): User
  unFollowUser(_id: ID!): User
  setImageUrl(url: String, type: String): User
  signCloudinaryUpload(data: String!): String
}
`;
module.exports = typeDefs;
