import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaSpotify from 'react-icons/lib/fa/spotify';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import _ from 'lodash';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/auth_actions';


class Header extends Component { 

    state = {
        isVisible: false
    }

    OnLogoutHandler = () => {
        this.props.logoutRequest();
    }

    handleOnClick = () => {
        this.setState(() => ({ isVisible: !this.state.isVisible }));
    }
    
    render() {
        // const { user = null } = this.props.user;
        return (

            <div className="header">
                <div className="brand">
                    <Link to="/"> 
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
                <div className="usersection">
                    { this.props.isAuthenticated ?
                    (   
                        <React.Fragment>
                            <div className="dropdown">
                                <span 
                                onClick={ this.handleOnClick } 
                                >
                                    { !(_.isEmpty(this.props.user)) &&
                                        this.props.user.id
                                    }
                                 </span>
                                    <FaAngleDown 
                                    className="fa-angle-down" 
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