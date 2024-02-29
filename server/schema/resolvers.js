const { User, Note } = require('../models')
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

function createToken(user_id) {
  const token = sign({ user_id }, process.env.JWT_SECRET)

  return token
}

function verifyToken(token) {
  try {
    const { user_id } = verify(token, process.env.JWT_SECRET)

    return user_id
  } catch (err) {
    throw new GraphQLError('Your token is invalid')
  }
}

function protect(resolver) {
  return async function (_, args, { req, res }) {
    const token = req.cookies.token

    if (!token) {
      throw new GraphQLError('You are not authorized to perform that action')
    }

    try {
      const user_id = verifyToken(token)

      return resolver(_, args, { req, res, user_id })
    } catch (err) {
      throw new GraphQLError('Your token is invalid')
    }

  }
}

const resolvers = {
  Query: {
    // User Queries
    async authenticate(_, __, { req }) {
      const token = req.cookies.token

      if (!token) return null

      try {
        const user_id = verifyToken(token)

        const user = await User.findById(user_id)

        return user
      } catch (err) {
        console.log(err)
        return null
      }
    },


    // Note Queries
    async getAllNotes() {
      const notes = await Note.find().populate('user')

      return notes
    },

    getUserNotes: protect(async (_, __, { user_id }) => {
      const user = await User.findById(user_id).populate('notes')

      return user.notes
    })
  },

  Mutation: {
    async registerUser(_, args, { res }) {
      try {
        const user = await User.create(args)

        const token = createToken(user._id)

        res.cookie('token', token, {
          httpOnly: true
        })

        return user
      } catch (err) {
        console.log(err)

        if (err.code === 11000) {
          throw new GraphQLError('A user with that username or email address already exists')
        }

        if (err.errors) {
          let errors = []

          for (let prop in err.errors) {
            errors.push(err.errors[prop].message)
          }

          throw new GraphQLError(errors)
        }
      }
    },

    async loginUser(_, args, { res }) {
      const user = await User.findOne({
        email: args.email
      })

      if (!user) {
        throw new GraphQLError('A user with that email address was not found')
      }

      const pass_valid = await user.validatePass(args.password)

      if (!pass_valid) {
        throw new GraphQLError('Your password is incorrect')
      }

      const token = createToken(user._id)

      res.cookie('token', token, { httpOnly: true })

      return user
    },

    logoutUser(_, __, { res }) {
      try {
        res.clearCookie('token')

        return {
          message: 'Logged out successfully'
        }
      } catch (err) {
        console.log(err)
      }
    },

    // Note Mutations
    createNote: protect(async (_, args, { req, res, user_id }) => {
      try {
        const user = await User.findById(user_id)
        const note = await Note.create({
          text: args.text,
          user: user_id
        })

        user.notes.push(note._id)
        user.save()

        return note
      } catch (err) {
        let errors = []

        for (let prop in err.errors) {
          errors.push(err.errors[prop].message)
        }

        throw new GraphQLError(errors)
      }
    }),

    editNote: protect(async (_, args) => {
      await Note.findByIdAndUpdate(args.note_id, {
        text: args.text
      })

      return {
        message: 'Note updated successfully!'
      }
    }),

    deleteNote: protect(async (_, args, { user_id }) => {
      await Note.deleteOne({ _id: args.note_id })
      await User.findByIdAndUpdate(user_id, {
        $pull: {
          notes: args.note_id
        }
      })

      return {
        message: 'Note updated successfully!'
      }
    }),
  }
}

module.exports = resolvers