const Note = require('../models/Note')

module.exports = {
  async createNote(req, res) {
    console.log(req.body)

    const note = await Note.create(req.body)

    res.json(note)
  },

  async getNotes(req, res) {
    const notes = await Note.find()

    res.json(notes)
  },

  async getNote(req, res) {
    const note_id = req.params.id

    const note = await Note.findById(note_id)

    res.json(note)
  },

  // Finds a note by ID and updates that note with the new text value that was sent in the req.body
  async updateNote(req, res) {
    const updatedNote = await Note.findOneAndUpdate({
      _id: req.body.note_id
    }, {
      text: req.body.text
    }, { new: true })

    res.json(updatedNote)
  },

  async deleteNote(req, res) {
    await Note.deleteOne({
      _id: req.params.id
    })

    res.json({
      message: 'Note deleted successfully!'
    })
  }
}