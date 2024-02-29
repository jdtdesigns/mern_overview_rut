const gql = String.raw;

const typeDefs = gql`
  type Note {
    _id: ID
    text: String
    createdAt: String
    updatedAt: String
    user: User
  }

  type User {
    _id: String
    username: String
    email: String
  }

  type Success {
    message: String
  }

  type Query {
    getAllNotes: [Note]
    getUserNotes: [Note]
    authenticate: User
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    logoutUser: Success

    createNote(text: String!): Note
    editNote(text: String, note_id: ID): Success
    deleteNote(note_id: ID): Success
  }
`

module.exports = typeDefs