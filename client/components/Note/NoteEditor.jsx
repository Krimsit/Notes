import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../css/App.css';
import ColorPicker from '../Color/ColorPicker.jsx'
import axios from 'axios';
import io from 'socket.io-client';
 
class NoteEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        title: '', 
        text: '',
        color: '#FFFFFF'
    }

    this.socket = io('localhost:8000');
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleTitleChange(event){
    this.setState({ title: event.target.value });
  }
  handleTextChange(event){
    this.setState({ text: event.target.value });
  }
  handleColorChange(color) {
    this.setState({ color });
  }

  handleSubmit(event){
    event.preventDefault();

    var note ={
      title: this.state.title,
      text: this.state.text,
      color: this.state.color
    }
    this.socket.emit('submit', note)

    this.socket.emit('SEND_NOTE', {
      title: this.state.title,
      text: this.state.text,
      color: this.state.color
    })
  }

  render() {
    return (
    	<form onSubmit={this.handleSubmit}>
        <div className='NoteEditor'>
          <input
            type='text'
            className='NoteEditor__title'
            placeholder='Enter title'
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <textarea
            placeholder='Enter note text'
            rows={5}
            className='NoteEditor__text'
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className='NoteEditor__footer'>
            <ColorPicker
              value={this.state.color}
              onChange={this.handleColorChange}
            />
            <button
              className='NoteEditor__button'
              disabled={!this.state.text}
              onClick={this.handleNoteAdd}
            >
              Add
            </button>
          </div>
        </div>
     	</form>
    )
  }
}

export default NoteEditor;
