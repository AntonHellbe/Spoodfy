import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';
import Loader from '../loader/loader';
import {
    selectTrack,
} from '../../actions/music_actions';
import {
    addTrackToPlaylist
} from '../../actions/playlist_actions';
import Modal from '../modal/modal';
import PlaylistModal from '../modal/playlistmodal';


class TrackTable extends Component {

    state = {
        activeDropdown: '',
        displayPlaylistModal: false,
        trackIndex: ''
    }

    onSubmit = (playlistId) => {
        const {
            trackIndex,
        } = this.state;
        const { 
            tracks,
            type,
            spotifyId
        } = this.props;

        const track = type === 'playlist' ? 
            tracks[trackIndex].track : 
            tracks[trackIndex];
        
        this.props.addTrackToPlaylist(spotifyId, playlistId, track.uri);
        this.togglePlaylistModal();
    }

    onRemove = (index) => {
        const {
            activePlaylist: {
                playlist
            },
            spotifyId,
            tracks
        } = this.props;

        this.props.removeTrackFromPlaylist(spotifyId, playlist, tracks[index].track.uri);
    }
    
    onClickDropdown = (index) => {
        this.setState(() => ({ activeDropdown: index }));
    }

    togglePlaylistModal = (index = '') => {
        this.setState((prevState) => 
            ({ displayPlaylistModal: !prevState.displayPlaylistModal, trackIndex: index }));
    }

    selectTrackHandler = (index, track) => {
        const {
            activePlaylist: {
                playlistId,
            },
            currentArtist,
            tracks,
            type 
        } = this.props;

        const tracklist = type === 'playlist' ? 
            tracks.filter((item) => { 
                return item.track.preview_url !== null;
                 
            }).map((item) => item.track) :
            tracks.filter((item) => item.preview_url !== null);

        if (type === 'playlist') {
            this.props.selectTrack(index, track, tracklist, playlistId);
        } else if (type === 'artist') {
            this.props.selectTrack(index, track, tracklist, currentArtist.id);
        } else {
            this.props.selectTrack(index, track, tracklist);
        }
    }
    

    render() {

    const { 
        tracks,
        isLoading = null,
        userPlaylists,
        spotifyId,
        type
    } = this.props;
    
    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <React.Fragment>
            <table className="table">
                <tbody>
                    <tr className="tableHeader">
                        <th className="table-col-index" />
                        <th className="table-col-title"> Title </th>
                        <th className="table-col-album"> Artist </th>
                        <th className="table-col-album"> Album </th>
                        <th className="table-col-actions" />
                        <th className="table-col-time"> 
                            <i className="fa fa-clock-o" aria-hidden="true" /> 
                        </th>
                    </tr>
                    {tracks.map((item, index) => {

                        //If it is a playlist, the track is located under item.track
                        // Might need to be changed later to display when the tracks were added
                        const track = item.track ? item.track : item;
                            return (
                                <TrackItem
                                track={ track }
                                selectTrack={ this.selectTrackHandler }
                                index={ index }
                                dropdownChange={ this.onClickDropdown }
                                dropdownStatus={ this.state.activeDropdown }
                                togglePlaylistModal={ this.togglePlaylistModal }
                                type={ type }
                                />
                            );
                        }
                    )}
                </tbody>
            </table>
            <Modal>
                <PlaylistModal 
                playlists={ userPlaylists.filter((playlist) => 
                    (playlist.owner.id === spotifyId || playlist.collaborative)) }
                isVisible={ this.state.displayPlaylistModal }
                togglePlaylistModal={ this.togglePlaylistModal }
                onSubmit={ this.onSubmit }
                />
            </Modal>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    activePlaylist: state.playlists.activePlaylist,
    currentArtist: state.artists.currentArtist,
    userPlaylists: state.playlists.userPlaylists,
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    addTrackToPlaylist: (spotifyId, playlistId, trackUri) => 
        dispatch(addTrackToPlaylist(spotifyId, playlistId, trackUri)),
    selectTrack: (index, track, queue, tracklistId) =>
        dispatch(selectTrack(index, track, queue, tracklistId)),
});


TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);