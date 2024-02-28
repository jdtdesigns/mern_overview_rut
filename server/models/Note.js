const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  text: {
    type: String,
    required: true,
    min: [4, 'Your note must be at least 4 characters in length']
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Note = model('Note', noteSchema)

module.exports = Note