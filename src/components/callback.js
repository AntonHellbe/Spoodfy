import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestToken } from '../actions/auth_actions';


class Callback extends Component {

    componentWillMount() {
        this.props.requestToken(this.props.history.push);
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestToken: (history) => dispatch(requestToken(history))
    };
};


export default connect(undefined, mapDispatchToProps)(Callback);