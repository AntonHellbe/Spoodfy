import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialAuthRequest,
        requestToken
} from '../actions/auth_actions';

const SCOPES = [
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify'
];

const CLIENT_ID = '6c94d2c6becc41c6a84429c86270179e';
const REDIRECT_URI = 'http://localhost:8080/callback';

const URL = 
    'https://accounts.spotify.com/authorize?client_id=' +
    `${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=code`;

const WIDTH = 450;
const HEIGHT = 700;

class Login extends Component {

    componentWillMount() {
        this.props.initialAuthRequest();
    }

    componentDidMount() {
        window.addEventListener('message', e => this.auth(e), false);
    }

    login = () => {
        window.open(
            URL,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
            `${WIDTH}, height=${HEIGHT}`
            
        );
    }

    auth = (e) => {
        if (e.data.type === 'code') {
            console.log('Dispatching');
            console.log(e.data.code);
            this.props.requestToken(e.data.code);
        }
    }

    render() {
        return (
            <div className="loginDiv">
                <h1>Hello!</h1>
                <p>Login using the button top right</p>

                <button
                onClick={ this.login }
                >
                    Login
                </button>
                <div className="error">
                    { this.props.token_error.length > 0 &&
                        <p>{ this.props.token_error } </p>
                    }
                </div>
                <div className="error">
                    { this.props.user_error.length > 0 &&
                        <p>{ this.props.user_error }</p>
                    }
                </div>
                    
            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    token_error: state.user.token_error,
    user_error: state.user.user_error,
    isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    initialAuthRequest: () => dispatch(initialAuthRequest()),
    requestToken: (code) => dispatch(requestToken(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);