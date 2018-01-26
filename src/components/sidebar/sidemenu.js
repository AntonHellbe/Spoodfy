import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaylistMenu from './playlistmenu';
import { 
    getUserPlaylists,
    updateActivePlaylist,
} from '../../actions/playlist_actions';
import {
    showModal
} from '../../actions/modal_actions';
import WithAuthentication from '../../HOC/WithAuthentication';

class SideMenu extends Component {

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.userPlaylists.length === 0) {
            this.props.getUserPlaylists();
        }
    }

    onUpdateActivePlaylist = (playlist) => {
        this.props.updateActivePlaylist(playlist, this.props.spotifyId);
    }

    openModal = () => {
        this.props.showModal({
            spotifyId: this.props.spotifyId,
        });
    }

    render() {
        return (
            <div className="sidemenu">
                <div className="sidemenu-title">
                    <p className="playlist-sidemnu-title"> Playlists </p>
                    <i 
                    className="fa fa-plus" 
                    aria-hidden="true"
                    onClick={ this.openModal }
                    />
                </div>
                { !this.props.isAuthenticated ?
                    (
                        <p>
                            You need to login
                        </p>
                    ) 
                    :
                    (
                        <PlaylistMenu 
                        playlists={ this.props.userPlaylists } 
                        activePlaylist={ this.props.activePlaylist }
                        tracklistId={ this.props.tracklistId }
                        updateActivePlaylist={ this.onUpdateActivePlaylist }
                        isPlaying={ this.props.isPlaying }
                        />
                    ) 
                }
                

            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    isAuthenticated: state.user.isAuthenticated,
    spotifyId: state.user.spotifyId,
    userPlaylists: state.playlists.userPlaylists,
    activePlaylist: state.playlists.activePlaylist,
    currentTrack: state.music.currentTrack,
    tracklistId: state.music.tracklistId,
    isPlaying: state.music.isPlaying,
});


const mapDispatchToProps = (dispatch) => ({ 
    getUserPlaylists: () => dispatch(getUserPlaylists()),
    updateActivePlaylist: (playlist, spotifyId) => 
        dispatch(updateActivePlaylist(playlist, spotifyId)),
    showModal: (modalProps) => dispatch(showModal('ADD_PLAYLIST_MODAL', modalProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(SideMenu));