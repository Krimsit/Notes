import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../../css/App.css';
import io from 'socket.io-client';

class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        }
        
        this.socket = io('localhost:8000');

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

        var user = {
            username: this.state.username,
            password: this.state.password
        };

        this.socket.emit('register', user);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={this.props.class}>
                <div className='Form'>
                    <input
                        type='text'
                        className='Form__input'
                        placeholder='Enter username'
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                    <input
                        type='text'
                        className='Form__input'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <div className='Form__footer'>
                        <button
                            className='Form__button'
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Register;
