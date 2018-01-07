import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PlaylistMenu from './playlistmenu';
import { 
    getUserPlaylists,
    updateActivePlaylist
} from '../actions/playlist_actions';
import { DEFAULT_IMAGE_URL } from '../constants/actions';

class SideMenu extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.playlists.length === 0) {
            this.props.getUserPlaylists();
        }
    }

    renderAlbumImage = () => {
        if (this.props.isAuthenticated) {
            if (_.isEmpty(this.props.currentTrack)) {
                return <img className="imgAlbum" src={ DEFAULT_IMAGE_URL } role="presentation" />;
            }

            return (<img 
                    className="imgAlbum" 
                    src={ this.props.currentTrack.album.images[0].url }
                    role="presentation" 
                    />);
        }

    }

    render() {
        return (
            <div className="sidemenu">
                <p className="playlistTitle"> Playlists </p>
                { !this.props.isAuthenticated ?
                    (
                        <p>
                            You need to login
                        </p>
                    ) 
                    :
                    (
                        <PlaylistMenu 
                        playlists={ this.props.playlists } 
                        updateActivePlaylist={ this.props.updateActivePlaylist }
                        />
                    ) 
                }
                
                <div className="albumImage">
                    {this.renderAlbumImage()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        token: state.user.token,
        playlists: state.playlists.myPlaylists,
        currentTrack: state.music.currentTrack
    };
};


const mapDispatchToProps = (dispatch) => ({
    getUserPlaylists: () => dispatch(getUserPlaylists()),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));