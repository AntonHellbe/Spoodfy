import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaSpotify from 'react-icons/lib/fa/spotify';
import _ from 'lodash';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/auth_actions';


class Header extends Component { 

    state = {
        isVisible: false
    }

    
    componentDidMount() {
        document.addEventListener('click', this.handleWindowClick);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleWindowClick);
    }

    handleWindowClick = (e) => {
        const targetElement = e.target;
        if (this.state.isVisible && !this.dropdown.contains(targetElement)) {
            this.setState(() => ({ isVisible: false }));
        }
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
                        <Link to="/"><p>Search</p></Link>
                        <Link to="/new-releases"><p>New Releases</p></Link>
                        <Link to="/"><p>Browse</p></Link>
                    </div>
                
                </div>
                <div className="usersection" id="usersection">
                    { isAuthenticated ?
                    (   
                        <React.Fragment>
                            <div className="dropdown">
                                <span 
                                onClick={ this.handleOnClick } 
                                ref={ (dropdown) => { this.dropdown = dropdown; } }
                                >
                                    { !(_.isEmpty(user)) &&
                                        user.id
                                    }
                                 </span>
                                    <i 
                                    className="fa fa-angle-down" 
                                    aria-hidden="true"
                                    onClick={ this.handleOnClick } 
                                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);