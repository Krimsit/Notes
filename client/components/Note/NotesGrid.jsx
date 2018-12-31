import React, { Component } from 'react';
import Note from './Note.jsx'
import { hot } from 'react-hot-loader';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import io from 'socket.io-client';

const masonryOptions={
	itemSelector: '.Note',
	columnWidth: 250,
	gutter: 10,
	isFitWidth: true
};

class NotesGrid extends Component {
	constructor(props) {
    super(props);
        
    this.state = {
      component: false,
    	notes: []
    }

    this.socket = io('localhost:8000');

    this.socket.on('notes', function(data){
      addNote(data);
    });

    const addNote = data => {
      console.log(data);
      this.setState({
        notes: data
      });
      console.log(this.state.notes);
    };
  };


  render() {
    return (
        <Masonry
      	  className="NotesGrid"
      	  options={masonryOptions}
        >
      	  {
      		  this.state.notes.map(note => 
      			  <Note
      				  title={note.title}
      				  onDelete={this.handleChange}
      				  color={note.color}
      			  >
      				  {note.text}
      			  </Note>
      		  )
      	  }
        </Masonry>
    )
  }
}

export default NotesGrid;
