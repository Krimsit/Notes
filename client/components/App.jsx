import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../css/App.css';

import NotesGrid from "./Note/NotesGrid.jsx";
import NoteEditor from "./Note/NoteEditor.jsx";
import Auth from "./auth/Auth.jsx";

class App extends Component {
	handleNoteAdd(data){
		console.log(data);
	}
    render() {
        return (
        	<div className="App">
        		<h2 className="App__header"> Notes </h2>
				<Auth />
        		<NoteEditor onNoteAdd={this.handleNoteAdd}/>
        		<NotesGrid />
        	</div>
        )
    }
}

export default App;
