const { User, Note } = require('../../models')
const { GraphQLError } = require('graphql')
const { protect } = require('../../config/auth')

module.exports = {
  queries: {
    async getAllNotes() {
      const notes = await Note.find().populate('user')

      return notes
    },
  },

  mutations: {
    createNote: protect(async (_, args, { user_id }) => {
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