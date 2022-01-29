const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {

    read() {
        return readFileAsync('db/db.json', 'utf8')
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                parsedNotes=[];
            }
            return parsedNotes;
        });
    }

    write() {
        return writeFileAsync('db/db.json', 'utf8');
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Required: Title & Text.');
        }
        const newNote = { title, text, id: uuid()};

        return this.getNotes()
            .then(notes => [notes, newNote])
            .then(updatedNote => this.write(updatedNote))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
};


module.exports= new Store();