const express = require("express");
const router = express.Router();

// importing Notes model
const Note = require("../models/Note");

// importing middleware
const fetchuser = require("../middleware/fetchuser");

// importing validators
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch all notes of logged in user. Login required
// route : GET 'api/notes/fetchallnotes'
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // fetch all notes of the user
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add notes for logged in user. Login required
// route : POST 'api/notes/addnote'
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is too short").isLength({ min: 3 }),
    body("description", "Description is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // destructuring to get the data
      const { title, description, tag } = req.body;

      // checking errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // adding note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update notes for logged in user. Login required
// route : POST 'api/notes/udpatenote'
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // data destructuring
    const { title, description, tag } = req.body;

    // creating a new note object
    var newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // check if the user is authenticated

    // find the note to be updated
    var note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("No such note exists");
    }

    // check if the user wants to update his own note only
    if (note.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ error: "You are not allowed to access someone else's data" });
    }

    // update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Delete a note for logged in user. Login required
// route : DELETE 'api/notes/deletenote'
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be updated
    var note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ error: "No such note exists" });
    }

    // check if the user wants to update his own note only
    if (note.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ error: "You are not allowed to access someone else's data" });
    }

    // update the note
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ success: "Note deleted successfully", note: note });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
