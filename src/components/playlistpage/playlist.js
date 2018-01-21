import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    clearActivePlaylistId,
    requestUpdatePlaylistDetails,
    toggleEditPlaylistModal,
    toggleAddPlaylistModal
} from '../../actions/playlist_actions';
import {
    selectTrack,
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';
import Modal from '../modal/modal';
import EditPlaylistModal from '../modal/EditPlaylistModal';


class Playlist extends Component {

    componentWillUnmount() {
        this.props.clearActivePlaylistId();
    }

    onClickPlay = () => {
        const { 
            playlistTracks, 
        } = this.props;
        const tracks = playlistTracks.filter((item) => item.track.preview_url !== null)
            .map((item) => item.track);
        this.props.selectTrack(tracks[0], tracks);
    }


    submit = (values) => {
        const {
            spotifyId,
            activePlaylist: {
                playlist
            }
        } = this.props;
        this.props.requestUpdatePlaylistDetails(values, spotifyId, playlist);
        // this.onClickEdit();
    }

    toggleModal = () => {
        const {
            addPlaylistModal
        } = this.props;
        if (addPlaylistModal) {
            this.props.toggleAddPlaylistModal();
        }
        this.props.toggleEditPlaylistModal();
    }


    render() {
        const { 
            playlistTracks,
            loadingTracks,
            activePlaylist: {
                playlist: {
                    type,
                    name,
                    owner: {
                        id,
                        display_name = id
                    },
                    images,
                    tracks: { total }
                },
                playlist
            },
            isFollowingActivePlaylist,
            spotifyId,
            editPlaylistModal
            

        } = this.props;
        // console.log(playlistTracks);
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                playAction={ this.onClickPlay }
                type={ type }
                name={ name }
                topRight={ display_name ? display_name : id } // eslint-disable-line
                bottomRight={ playlist.public ? 'Public Playlist' : 'Private Playlst' }
                isFollowing={ isFollowingActivePlaylist }
                id={ playlist.id }
                images={ images }
                author={ display_name ? `Created by: ${display_name}` : `Created by: ${id}` }
                totalTracks={ `Total tracks ${total}` }
                edit={ spotifyId === id }
                editAction={ this.toggleModal }
                /> 
                
                <div className="main-content-bottom">
                
                    <TrackTable 
                    tracks={ playlistTracks } 
                    type={ type }
                    isLoading={ loadingTracks }
                    />
                </div>
                </div>
                <Modal>
                    <EditPlaylistModal 
                    initialValues={ 
                        { name, 
                        publicPlaylist: playlist.public, 
                        collaborative: playlist.collaborative }
                    }
                    isVisible={ editPlaylistModal }
                    toggleModal={ this.props.toggleEditPlaylistModal }
                    onSubmit={ this.submit }
                    />
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    playlistTracks: state.tracks.playlistTracks,
    loadingTracks: state.tracks.loadingTracks,
    activePlaylist: state.playlists.activePlaylist,
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist,
    spotifyId: state.user.spotifyId,
    editPlaylistModal: state.playlists.editPlaylistModal,
    addPlaylistModal: state.playlists.addPlaylistModal
});

const mapDispatchToProps = (dispatch, props) => ({
    clearActivePlaylistId: () => dispatch(clearActivePlaylistId()),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id)),
    requestUpdatePlaylistDetails: (values, spotifyId, playlist) => 
        dispatch(requestUpdatePlaylistDetails(values, spotifyId, playlist)),
    toggleEditPlaylistModal: () => dispatch(toggleEditPlaylistModal()),
    toggleAddPlaylistModal: () => dispatch(toggleAddPlaylistModal())
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);