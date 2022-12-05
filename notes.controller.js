const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("List of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title, note.id));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => {
    return note.id !== `${id}`;
  });

  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.red.inverse("Note was removed!"));
}

async function editNote(id, title) {
  const notes = await getNotes();
  const index = notes.findIndex((name) => {
    return name.id === id;
  });

  notes[index].title = title;

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.blue.inverse("Note was edit!"));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
