import React, { Component } from 'react';
import Note from './Note.jsx'
import { hot } from 'react-hot-loader';
import Masonry from 'react-masonry-component';
import axios from 'axios';

class NotesGrid extends Component {
  render() {
    return (
      <Masonry
      	className="NotesGrid"
      	options={masonryOptions}
      >
        Note Grid
      </Masonry>
    )
  }
}

export default NotesGrid;
