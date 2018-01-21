import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PlaylistMenu from './playlistmenu';
import { 
    getUserPlaylists,
    updateActivePlaylist,
    toggleAddPlaylistModal,
    toggleEditPlaylistModal,
    requestCreatePlaylist,
} from '../../actions/playlist_actions';
import Modal from '../modal/modal';
import AddPlaylistModal from '../modal/AddPlaylistModal';

class SideMenu extends Component {

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.userPlaylists.length === 0) {
            this.props.getUserPlaylists();
        }
    }

    onUpdateActivePlaylist = (playlist) => {
        this.props.updateActivePlaylist(playlist, this.props.spotifyId);
    }

    submit = (values) => {
        // console.log(values);
        this.props.requestCreatePlaylist(values, this.props.spotifyId);
    }

    toggleModal = () => {
        const {
            editPlaylistModal,
            addPlaylistModal
        } = this.props;

        if (editPlaylistModal) {
            this.props.toggleEditPlaylistModal();
        }
        console.log(addPlaylistModal);
        console.log('Toggling add modal');
        this.props.toggleAddPlaylistModal();

    }

    render() {
        return (
            <div className="sidemenu">
                <div className="sidemenu-title">
                    <p className="playlistTitle"> Playlists </p>
                    <i 
                    className="fa fa-plus" 
                    aria-hidden="true"
                    onClick={ this.toggleModal }
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

                <Modal>
                    <AddPlaylistModal
                    onSubmit={ this.submit }
                    isVisible={ this.props.addPlaylistModal }
                    toggleModal={ this.props.toggleAddPlaylistModal }
                    />
                </Modal>
                

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
    editPlaylistModal: state.playlists.editPlaylistModal,
    addPlaylistModal: state.playlists.addPlaylistModal
});


const mapDispatchToProps = (dispatch) => ({ 
    getUserPlaylists: () => dispatch(getUserPlaylists()),
    updateActivePlaylist: (playlist, spotifyId) => 
        dispatch(updateActivePlaylist(playlist, spotifyId)),
    toggleAddPlaylistModal: () => dispatch(toggleAddPlaylistModal()),
    requestCreatePlaylist: (values, spotifyId) => 
        dispatch(requestCreatePlaylist(values, spotifyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));