const gql = String.raw;
const userTypeDefs = require('./userTypeDefs')


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
    ${userTypeDefs.queries}
  }

  type Mutation {
    ${userTypeDefs.mutations}
  }
`

module.exports = typeDefs