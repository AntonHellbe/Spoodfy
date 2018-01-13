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


class TrackTable extends Component {
    
    onClickArtist = (artist) => {
        this.props.requestArtist(artist);
    }
    
    selectTrackHandler = (index, track) => {
        const { 
            activePlaylist: {
                playlistId
             }, 
            isArtist = false,
            currentArtist,
            tracks,
            type
        } = this.props;

        if (type === 'playlist') {
            const playlistTracks = tracks.map((item) => item.track);
            this.props.selectTrack(index, track, playlistTracks, playlistId);
        } else if (isArtist) {
            this.props.selectTrack(index, track, tracks, currentArtist.id);
        } else {
            this.props.selectTrack(index, track, tracks);
        }
    }

    addToQueueHandler = (track) => {
        this.props.AddToQueue(track);
    }


    render() {

    const { 
        tracks, 
        type, 
        currentTrack, 
        isLoading = null 
    } = this.props;
    
    if (isLoading) {
        return (
            <Loader />
        );
    }
    return (
            <table className="table">
                <tbody>
                    <tr className="tableHeader">
                        <th className="table-col-index" />
                        <th className="table-col-title"> Title </th>
                        <th className="table-col-album"> Artist </th>
                        <th className="table-col-album"> Album </th>
                        <th className="table-col-time"> 
                            <i className="fa fa-clock-o" aria-hidden="true" /> 
                        </th>
                        <th className="table-col-actions" />
                    </tr>
                    {tracks.map((item, index) => {
                        if (type === 'playlist') {
                            const { track } = item;
                            return (
                                <TrackItem
                                track={ track }
                                selectTrack={ this.selectTrackHandler }
                                AddToQueue={ this.addToQueueHandler }
                                index={ index }
                                currentTrack={ currentTrack }
                                requestArtist={ this.onClickArtist }
                                />
                            );
                        }
                        return (
                            <TrackItem
                                track={ item }
                                selectTrack={ this.selectTrackHandler }
                                AddToQueue={ this.addToQueueHandler }
                                index={ index }
                                currentTrack={ currentTrack }
                                requestArtist={ this.onClickArtist }
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTrack: state.music.currentTrack,
    activePlaylist: state.playlists.activePlaylist,
    currentArtist: state.artists.currentArtist
});

const mapDispatchToProps = (dispatch) => ({
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    selectTrack: (index, track, queue, tracklistId) => 
        dispatch(selectTrack(index, track, queue, tracklistId)),
    requestArtist: (id) => dispatch(requestArtist(id))
    
});


TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);