const { User } = require('../models')
const { sign, verify } = require('jsonwebtoken')

function createToken(user_id) {
  const token = sign({ user_id }, process.env.JWT_SECRET)

  return token
}

module.exports = {
  queries: {

  },

  mutations: {
    async registerUser(_, args, { res }) {
      try {
        const user = await User.create(args)

        const token = createToken(user._id)

        res.cookie('token', { token }, {
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

      console.log(user)

      const pass_valid = await user.validatePass(args.password)

      if (!pass_valid) {
        throw new GraphQLError('Your password is incorrect')
      }

      const token = createToken(user._id)

      res.cookie('token', { token }, { httpOnly: true })

      return user
    }
  }
}