import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialAuthRequest } from '../actions/auth_actions';

class Login extends Component {

    componentWillMount() {
        this.props.initialAuthRequest();
        
    }

    render() {
        return (
            <div className="loginDiv">
                <h1>Hello!</h1>
                <p>Login using the button top right</p>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);