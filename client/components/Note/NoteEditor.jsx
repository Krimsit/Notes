import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../css/NoteEditor.css';
import ColorPicker from '../Color/ColorPicker.jsx'
import axios from 'axios';
 
class NoteEditor extends Component {
  render() {
    return (
        <div className='NoteEditor'>
            Note Editor
        </div>
    )
  }
}

export default NoteEditor;
