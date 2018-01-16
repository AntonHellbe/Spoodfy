import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';
import Loader from '../loader/loader';
import {
    selectTrack,
    AddToQueue,
} from '../../actions/music_actions';
import {
    requestArtist
} from '../../actions/artist_actions';
import { 
    updateCurrentAlbum 
} from '../../actions/album_actions';
import {
    addTrackToPlaylist
} from '../../actions/playlist_actions';
import Modal from '../modal/modal';
import PlaylistModal from '../modal/playlistmodal';


class TrackTable extends Component {

    state = {
        activeDropdown: '',
        displayPlaylistModal: false,
        selectedPlaylist: '',
        trackIndex: ''
    }

    onSubmit = () => {
        const {
            trackIndex,
            selectedPlaylist
        } = this.state;
        const { 
            tracks,
            type,
            spotifyId
        } = this.props;

        const track = type === 'playlist' ? 
            tracks[trackIndex].track : 
            tracks[trackIndex];
        
        this.props.addTrackToPlaylist(spotifyId, selectedPlaylist.id, track.uri);
        this.setState(() => ({ displayPlaylistModal: false }));
    }
    
    onClickDropdown = (index) => {
        this.setState(() => ({ activeDropdown: index }));
    }
    
    onClickArtist = (artist) => {
        this.props.requestArtist(artist);
    }

    togglePlaylistModal = (index = '') => {
        if (this.selectPlaylist !== '') {
            this.setState(() => ({ selectedPlaylist: '' }));
            //Removes the selectedPlaylist if the modal is toggled without pressing submit
        }
        this.setState((prevState) => 
            ({ displayPlaylistModal: !prevState.displayPlaylistModal, trackIndex: index }));
    }

    selectPlaylist = (playlist) => {
        this.setState(() => ({ selectedPlaylist: playlist }));
    }
    
    selectTrackHandler = (index, track) => {
        const { 
            activePlaylist: {
                playlistId
             }, 
            currentArtist,
            tracks,
            type
        } = this.props;

        if (type === 'playlist') {
            const playlistTracks = tracks.map((item) => item.track);
            this.props.selectTrack(index, track, playlistTracks, playlistId);
        } else if (type === 'artist') {
            this.props.selectTrack(index, track, tracks, currentArtist.id);
        } else {
            this.props.selectTrack(index, track, tracks);
        }
    }

    render() {

    const { 
        tracks,
        currentTrack, 
        isLoading = null,
        myPlaylists,
        spotifyId
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
                        const track = item.track ? item.track : item;
                            return (
                                <TrackItem
                                track={ track }
                                selectTrack={ this.selectTrackHandler }
                                AddToQueue={ this.props.AddToQueue }
                                index={ index }
                                currentTrack={ currentTrack }
                                requestArtist={ this.onClickArtist }
                                updateCurrentAlbum={ this.props.updateCurrentAlbum }
                                dropdownChange={ this.onClickDropdown }
                                dropdownStatus={ this.state.activeDropdown }
                                togglePlaylistModal={ this.togglePlaylistModal }
                                />
                            );
                        }
                    )}
                </tbody>
            </table>
            <Modal>
                <PlaylistModal 
                playlists={ myPlaylists }
                isVisible={ this.state.displayPlaylistModal }
                togglePlaylistModal={ this.togglePlaylistModal }
                selectPlaylist={ this.selectPlaylist }
                onSubmit={ this.onSubmit }
                spotifyId={ spotifyId }
                />
            </Modal>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTrack: state.music.currentTrack,
    activePlaylist: state.playlists.activePlaylist,
    currentArtist: state.artists.currentArtist,
    myPlaylists: state.playlists.myPlaylists,
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    selectTrack: (index, track, queue, tracklistId) => 
        dispatch(selectTrack(index, track, queue, tracklistId)),
    requestArtist: (id) => dispatch(requestArtist(id)),
    updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
    addTrackToPlaylist: (spotifyId, playlistId, trackUri) => 
        dispatch(addTrackToPlaylist(spotifyId, playlistId, trackUri))
    
});


TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);