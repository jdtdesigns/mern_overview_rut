const { User, Note } = require('../models')
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const user_resolvers = require('./user_resolvers')

function createToken(user_id) {
  const token = sign({ user_id }, process.env.JWT_SECRET)

  return token
}

const resolvers = {
  Query: {
    async getAllNotes() {
      const notes = await Note.find()

      return notes
    },
    ...user_resolvers.queries,
  },

  Mutation: {
    ...user_resolvers.mutations
  }
}

module.exports = resolvers