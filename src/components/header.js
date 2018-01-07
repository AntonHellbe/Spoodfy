import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaSpotify from 'react-icons/lib/fa/spotify';
import { connect } from 'react-redux';
import { logoutRequest } from '../actions/auth_actions';


class Header extends Component { 

    OnLogoutHandler = () => {
        this.props.logoutRequest();
    }
    
    render() {
        return (

            <div className="header">
                <div className="brand">
                    <Link to="/" style={ { textDecoration: 'none' } }> 
                    <FaSpotify className="brandIcon" size={ '24px' } color={ '#ff6b42' } />
                        <h3>spoodfy </h3>
                    </Link>
                </div>
                <div className="navLinks">
                    <div className="links">
                        <Link to="/"><p>Search</p></Link>
                        <Link to="/new-releases"><p>New Releases</p></Link>
                        <Link to="/"><p>Browse</p></Link>
                    </div>
                
                </div>
                <div className="login">
                    { this.props.isAuthenticated ?
                    (
                        <button className="logout" onClick={ this.OnLogoutHandler }>Logout</button>
                    )
                    :
                    (
                        <a href="http://localhost:5000/">Login</a>
                    
                    )
                    }
                </div>
            </div>
            );
        }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    logoutRequest: () => dispatch(logoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);