const express = require('express')
const router = express.Router()
const Note = require('../mongo_modules/Note')
const fetchuser = require('../middlewares/fatchuser')
const user = require('../mongo_modules/User')
const { body, validationResult } = require('express-validator');

//ROUTE1 : fetch all notes of user: GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

//ROUTE2 : Add a new notes: POST "/api/notes/addnotes".login required
router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid Title').isLength({ min: 3 }),
  body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes = new Note({
      title, description, tag, user: req.user.id
    })
    const savenote = await notes.save()

    res.json(savenote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

//ROUTE3 : update an exsiting notes: PUT "/api/notes/updatenote/:id".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a newNote object
  const newnote = {}
  if (title) { newnote.title = title }
  if (description) { newnote.description = description }
  if (tag) { newnote.tag = tag }

  // Find the note to be updated and update it

  let note = await Note.findById(req.params.id);
  if (!note) { return res.status(404).send("not found") }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
  res.json({ note });
})

//ROUTE3 : update an exsiting notes: delete "/api/notes/deletenote/:id".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Find the note to be deleted and delete it

  let note = await Note.findById(req.params.id);
  if (!note) { return res.status(404).send("not found") }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success": "Note has been deleted", note: note});
})
module.exports = router