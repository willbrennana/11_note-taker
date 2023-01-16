const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      console.log(notes);
      let filteredNotes = notes.filter((note) => note.id !== noteId);
      writeToFile("./db/db.json", filteredNotes);
      res.json(`Note deleted successfully 🚀`);
    });
});

module.exports = notes;
