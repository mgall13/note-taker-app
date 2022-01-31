const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class Store {

    read() {
        return readFileAsync('db/db.json', 'utf8')
    }

    getNotes () {
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

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Required: Title & Text.');
        }
        
        const newNote = { title, text, id: Date.now};
        
        return this.getNotes()
        .then(notes => [notes, newNote])
        .then(updateNotes => this.write(updateNotes))
        .then(() => newNote);
    }

    // deleteNote(id) {
    //     return this.getNotes()
    //         .then(notes => notes.filter(note => note.id !== id))
    //         .then(filteredNotes => this.write(filteredNotes));
    // }
};

module.exports= new Store();