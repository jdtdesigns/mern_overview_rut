const user_resolvers = require('./lib/user_resolvers')
const note_resolvers = require('./lib/note_resolvers')


const resolvers = {
  Query: {
    ...user_resolvers.queries,
    ...note_resolvers.queries,
  },

  Mutation: {
    ...user_resolvers.mutations,
    ...note_resolvers.mutations,
  }
}

module.exports = resolvers