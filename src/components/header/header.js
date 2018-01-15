import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/auth_actions';


class Header extends Component { 

    state = {
        isVisible: false
    }

    hide = (e) => {
        if (e && e.relatedTarget) {
            e.relatedTarget.click();
        }
        this.setState(() => ({ isVisible: false }));
    }

    handleOnClick = () => {
        this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
    }
    
    OnLogoutHandler = () => {
        this.props.logoutRequest();
    }

    render() {
        const {
            isAuthenticated,
            user,

        } = this.props;

        return (

            <div className="header">
                <div className="brand">
                    <Link to="/">
                    <i className="fa fa-spotify" aria-hidden="true" />
                        <h3>spoodfy </h3>
                    </Link>
                </div>
                <div className="navLinks">
                    <div className="links">
                        <NavLink 
                        exact to="/"
                        activeClassName="active-link"
                        >
                            <p>Search</p>
                        </NavLink>
                        <NavLink 
                        exact to="/new-releases"
                        activeClassName="active-link"
                        >
                            <p>New Releases</p>
                        </NavLink>
                        <NavLink 
                        exact to="/browse"
                        activeClassName="active-link"
                        >
                            <p>Browse</p>
                        </NavLink>
                    </div>
                
                </div>
                <div className="usersection" id="usersection">
                    { isAuthenticated ?
                    (   
                        <React.Fragment>
                            <div className="dropdown">
                                <button
                                onClick={ this.handleOnClick }
                                onBlur={ this.hide }
                                >
                                    { !(_.isEmpty(user)) &&
                                        user.id
                                    }
                                <i 
                                className="fa fa-angle-down" 
                                aria-hidden="true"
                                />
                                </button>
                                 <div 
                                className="dropdown-content"
                                style={ this.state.isVisible ? 
                                    { display: 'block' } : 
                                    { display: 'none' } } 
                                 >
                                  <ul>
                                        <li>
                                            <Link 
                                            to="/profile" 
                                            onClick={ this.handleOnClick } 
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                  </ul>
                                 
                                 </div>
                            </div>
                            <button 
                            className="logout" 
                            onClick={ this.OnLogoutHandler }
                            >
                                Logout
                            </button>
                        </React.Fragment>
                    )
                    :
                    (
                       <div className="usersection">
                            <a className="login" href="http://localhost:5000"><p> Login </p></a>

                       </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));