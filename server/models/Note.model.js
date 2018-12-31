// Инициализация модулей
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Создание схемы поста
const Note = new Schema({
	username: String,
	password: String,
	notes: [{
		title: String,
		text: String,
		color: String
	}]
	},
 {
  versionKey: false,
  collection: "NotesCollection"
});

module.exports = mongoose.model('NoteModel', Note);