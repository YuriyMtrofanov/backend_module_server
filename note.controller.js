const fs = require("fs/promises");
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    // const notes = require('./db.json'); // в отдельном файле создаем базу данных
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    };
    notes.push(note); // полученную заметку помещаем в "db.json"
    await fs.writeFile(notesPath, JSON.stringify(notes)); // notesPath = "./db.json"
    console.log(chalk.bold.cyan("new note was added"));
};

async function getNotes() {
    // return require('./db.json');
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.blue("List of notes is down below:"));
    notes.forEach(note => {
        console.log(chalk.yellow("id: ", note.id, "title: ", note.title))
    });
};

async function removeNote(id) {
    const notes = await getNotes(); // получаем все заметки
    const changedNotes = notes.filter(note => note.id !== id); // возвращаем массив заметок за исключением выбранного
    await fs.writeFile(notesPath, JSON.stringify(changedNotes)); // записываем данные в файл базы данных
    console.log(chalk.bold.red(`note with id ${id} was removed`)); // выводим сообщение
}

module.exports = {
    addNote,
    printNotes,
    removeNote
};

getNotes();
