const gql = String.raw;

const typeDefs = gql`
  type Note {
    _id: ID
    text: String
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: String
    username: String
    email: String
  }

  type Query {
    getAllNotes: [Note]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
  }
`

module.exports = typeDefs