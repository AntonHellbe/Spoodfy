import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/auth_actions';


class Header extends Component { 

    constructor(props) {
        super(props);

        this.sidemenu = null;
    }

    state = {
        isVisible: false,
        isSidemenuVisible: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated && this.sidemenu === null) {
            this.sidemenu = document.getElementById('sidemenu');
            // console.log(this.sidemenu);
        }
    }

    
    onToggleSidemenu = () => {
        if (this.state.isSidemenuVisible) {
            this.sidemenu.classList = ['sidemenu'];
        } else {
            this.sidemenu.classList = [this.sidemenu.classList[0] + ' effect2'];
        }

        this.setState((prevState) => ({ isSidemenuVisible: !prevState.isSidemenuVisible }));
    }

    OnLogoutHandler = () => {
        this.props.logoutRequest();
    }

    handleOnClick = () => {
        this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
    }

    hide = (e) => {
        if (e && e.relatedTarget) {
            e.relatedTarget.click();
        }
        this.setState(() => ({ isVisible: false }));
    }

    render() {
        const {
            isAuthenticated,
            user,

        } = this.props;

        return (

            <div className="header">
                <button onClick={ this.onToggleSidemenu }>
                    <i className="fa fa-bars" aria-hidden="true" />
                </button>
                <div className="brand">
                    
                    <Link to="/">
                    <i className="fa fa-spotify" aria-hidden="true" />
                        <h3>spoodfy </h3>
                    </Link>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                    <span />
                    <span />
                    <span />
                    </label>
                </div>
                <input type="checkbox" id="nav-check" />
                <div className="navLinks">
                        <NavLink 
                        exact to="/"
                        activeClassName="active-link"
                        >
                            <p>Search</p>
                        </NavLink>
                        <NavLink 
                        to="/new-releases"
                        activeClassName="active-link"
                        >
                            <p>New Releases</p>
                        </NavLink>
                        <NavLink 
                        to="/browse"
                        activeClassName="active-link"
                        >
                            <p>Browse</p>
                        </NavLink>
                        <NavLink
                        to="/toplists"
                        activeClassName="active-link"
                        >
                            <p>Toplists</p>
                        </NavLink>
                
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