import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        }
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event){
		this.setState({ username: event.target.value });
	}
	handlePasswordChange(event){
		this.setState({ password: event.target.value });
	}
    handleSubmit(event){
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:8000/login', user)
            .then(res => {
                console.log(res);
                console.log(res.data);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='NoteEditor'>
                    <input
                        type='text'
                        className='NoteEditor__title'
                        placeholder='Enter username'
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                    <input
                        type='text'
                        className='NoteEditor__title'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <div className='NoteEditor__footer'>
                        <button
                            className='NoteEditor__button'
                            onClick={this.handleSubmit}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
