import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/header';
import Login from '../components/login';
import Search from '../components/search';
import PrivateRoute from '../HOC/PrivateRoute';
import Callback from '../components/callback';
import history from '../history';
import SideMenu from '../components/sidemenu';
import MusicBar from '../components/musicbar';
import RecentlyPlayed from '../components/recentlyplayed';
import NewReleases from '../components/new-releases/new-releases';
import Playlist from '../components/playlist/playlist';


const Routes = (props) => {
    return (
    <Router history={ history }>
        <div className="main">
            <Header />
            <SideMenu className="sidemenu" />
            <Switch>
                <PrivateRoute 
                exact path="/" 
                isAuthenticated={ props.isAuthenticated } 
                component={ Search } 
                />
                <PrivateRoute 
                path="/new-releases"
                isAuthenticated={ props.isAuthenticated }
                component={ NewReleases }
                />
                <PrivateRoute
                    path="/playlists/:id"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Playlist }
                />
                <Route path="/login" component={ Login } />
                <Route path="/callback" component={ Callback } />
            </Switch>
            <RecentlyPlayed />
            <MusicBar />
        </div>
    </Router>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, null)(Routes);