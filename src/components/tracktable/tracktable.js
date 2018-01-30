import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';
import Loader from '../loader/loader';
import {
    requestSelectTrack,
} from '../../actions/music_actions';
import {
    removeTrackFromPlaylist
} from '../../actions/playlist_actions';
import {
    showModal
} from '../../actions/modal_actions';


class TrackTable extends Component {

    state = {
        trackIndex: ''
    }


    onClickDropdown = (index) => {
        this.setState(() => ({ trackIndex: index }));
    }

    openModal = () => {
        const {
            tracks,
            spotifyId,
            userPlaylists
        } = this.props;
        const {
            trackIndex
        } = this.state;
        const track = tracks[trackIndex].track ? tracks[trackIndex].track : tracks[trackIndex];
        this.props.showModal({
            playlists: userPlaylists,
            track,
            spotifyId
        });
    }

    selectTrackHandler = (index, track) => {

        if (track.preview_url === null) {
            return;
        }

        const {
            activePlaylist: {
                playlistId,
            },
            currentArtist,
            tracks,
            type 
        } = this.props;

        let trackId;
        switch (type) {
            case 'playlist':
                trackId = playlistId;
                break;
            case 'artist':
                trackId = currentArtist.id;
                break;
            default:
                trackId = '';
                break;
        }
        console.log(track);
        this.props.requestSelectTrack(index, track, tracks, trackId);
    }
    

    render() {

    const { 
        tracks,
        isLoading = null,
        type
    } = this.props;
    
    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <React.Fragment>
            <table className="track-table">
                <tbody>
                    <tr className="track-table-header">
                        <th className="table-col-index" />
                        <th className="table-col-title"> Title </th>
                        <th className="table-col-artist"> Artist </th>
                        <th className="table-col-album"> Album </th>
                        <th className="table-col-popularity">
                            <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                        </th>
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
                                dropdownStatus={ this.state.trackIndex }
                                openModal={ this.openModal }
                                type={ type }
                                />
                            );
                        }
                    )}
                </tbody>
            </table>
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
    requestSelectTrack: (index, track, queue, tracklistId) =>
        dispatch(requestSelectTrack(index, track, queue, tracklistId)),
    showModal: (modalProps) => dispatch(showModal('ADD_TRACK_MODAL', modalProps)),
    removeTrackFromPlaylist: (playlist, trackUri) => 
        dispatch(removeTrackFromPlaylist(playlist, trackUri))
});


TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);