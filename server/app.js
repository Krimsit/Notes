const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const socket = require('socket.io');

const { db, serverPort } = require('../etc/config.json');
const NoteModel = require('./models/Note.model.js');

var sess;

var app = express();

var server = app.listen(serverPort, (err) => {
    if (err) return console.log(err);
    else {
        console.log(`Server running at *${serverPort}`);
    }
});

var io = socket(server);

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, (err) => {
    if(err) return err;

    console.log('MongoDb started!');
});

var store = new MongoDBStore({
    uri: `mongodb://${db.host}:${db.port}/${db.name}`,
    collection: 'NotesCollection'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

io.on('connection', function(socket) {
	socket.on('submit', (data) => {
		NoteModel.findOneAndUpdate({ _id: sess },{$push: {notes: [{title: data.title, text: data.text, color: data.color}]}}, function(err) {
			if(err){
				console.log(err);
			}
			else {
                console.log('Note Add!')
                NoteModel.findById(sess, (err, doc) => {
                    io.emit('notes', doc.notes)
                    // console.log(doc.notes);
                });
			}
		})
	});
    socket.on('register', (data) => {
        console.log(data)
        let username = data.username;

        NoteModel.findOne({username: username}, (err, user, username) => {
            if(user) {
                console.log('This user already exists');
            }
            else {
                const user = new NoteModel({
                    username: data.username,
                    password: data.password
                })
                
                user.save((err, user) => {
                    if (err) return err;
                    else {
                        console.log('Register');
                    }
                })
            }
        })
    });
    socket.on('login', (data) => {
        var username = data.username;
        var password = data.password;
        
        NoteModel.findOne({ username: username }, (username, user) => {
            if(!user) {
                console.log('User not a found');
            }
            else {
                NoteModel.findOne({ password: password }, (password, user) => {
                    if(!user.password === data.password) {
                        console.log('Inccorect password');
                    }
                    else {
                        sess = user.id;
                        console.log('Logined! ' + sess)
                        NoteModel.findById(sess, (err, doc) => {
                            io.emit('notes', doc.notes)       
                        });
                    }
                })
            }
        })
    });
});