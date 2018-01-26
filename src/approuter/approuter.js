import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/header/header';
import Login from '../components/login';
import Search from '../components/search/search';
import PrivateRoute from '../HOC/PrivateRoute';
import Callback from '../components/callback';
import history from '../history';
import SideMenu from '../components/sidebar/sidemenu';
import MusicBar from '../components/musicbar/Musicbar';
import RecentlyPlayed from '../components/recentlyplayed';
import NewReleases from '../components/new-releases/new-releases';
import Playlist from '../components/playlistpage/playlist';
import Profile from '../components/profile/profile';
import Artist from '../components/artist/artist';
import Album from '../components/albumpage/album';
import Browse from '../components/browse/browse';
import Category from '../components/browse/category';
import ModalRoot from '../components/modal/ModalRoot';
import TopLists from '../components/toplists/toplists';


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
                <PrivateRoute
                    path="/profile"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Profile }
                />
                <PrivateRoute
                    path="/artists/:id"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Artist }
                />
                <PrivateRoute
                    path="/albums/:id"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Album }
                />
                <PrivateRoute
                    path="/browse"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Browse }
                />
                <PrivateRoute
                    path="/category/:id"
                    isAuthenticated={ props.isAuthenticated }
                    component={ Category }
                />
                <PrivateRoute
                    path="/toplists"
                    isAuthenticated={ props.isAuthenticated }
                    component={ TopLists }
                />
                <Route path="/login" component={ Login } />
                <Route path="/callback" component={ Callback } />
            </Switch>
            <RecentlyPlayed />
            <MusicBar />
            <ModalRoot />
        </div>
    </Router>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, null)(Routes);