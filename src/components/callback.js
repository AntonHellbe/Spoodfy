import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestToken } from '../actions/auth_actions';


const getParameterByName = (name, url = window.location.href) => {
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    name = name.replace(/[\[\]]/g, '\\$&'); //eslint-disable-line
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

class Callback extends Component {


    componentDidMount() {
        console.log(window.location.href.split('=')[1]);
        const match = getParameterByName('code');
        console.log(match);
        if (match) {
            window.opener.postMessage({
                type: 'code',
                code: match
            }, '*');
            
        }
        window.close();
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
        requestToken: (code) => dispatch(requestToken(code))
    };
};


export default connect(undefined, mapDispatchToProps)(Callback);