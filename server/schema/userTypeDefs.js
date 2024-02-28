const gql = String.raw;

const mutations = gql`
  registerUser(username: String!, email: String!, password: String!): User
  loginUser(email: String!, password: String!): User
`

const queries = gql`
  
`


module.exports = { mutations, queries }