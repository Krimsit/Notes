import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../css/App.css';

import Login from './Login/Login.jsx';
import Register from './Registration/Register.jsx';

class Auth extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            signIn: false,
            signUp: false
        }
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignIn(event) {
        this.setState({ signIn: !this.state.signIn });
    }
    handleSignUp(event) {
        this.setState({ signUp: !this.state.signUp });
    }

    render() {
        let signUp_class = this.state.signUp ? "RegisterBlock" : "RegisterNone";
        let signIn_class = this.state.signIn ? "LoginBlock" : "LoginNone";
        return (
            <div className="form_sign">
                <div className="btn_sign">
                    <button onClick={this.handleSignIn} className="signIn">Sign In</button>
                    <button onClick={this.handleSignUp} className="signUp">Sign Up</button>
                </div>
                <Register class={signUp_class}/>
                <Login class={signIn_class} />
            </div>
        )
    }
}

export default Auth;
