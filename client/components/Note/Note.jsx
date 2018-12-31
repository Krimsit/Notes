import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../css/App.css';
 
class Note extends Component {
    render() {
        const style = { backgroundColor: this.props.color };
        return (
            <div className='Note' style={style}>
                <button type="submit" className='Note__del-icon' onClick={this.props.onDelete}> × </button>
                {
                    this.props.title
                    ?
                        <h4 className='Note__title'>{this.props.title}</h4>
                    :
                        null
                }
                <div className='Note__text'>{this.props.children}</div>
            </div>
        );
    }
}

export default Note;
