import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaClock from 'react-icons/lib/fa/clock-o';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';
import Loader from '../loader/loader';
import {
    selectTrack,
    AddToQueue
} from '../../actions/music_actions';


class TrackTable extends Component {
    
    addToQueueHandler = (track) => {
        this.props.AddToQueue(track);
    }

    selectTrackHandler = (index, track) => {
        if (this.props.isPlaylist) {
            const queue = this.props.tracks.map((item) => item.track);
            this.props.selectTrack(index, track, queue);
        } else {
            this.props.selectTrack(index, track, this.props.tracks);
        }
    }

    render() {

    const { tracks, isPlaylist = null, currentTrack, isLoading = null } = this.props;
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
                        <th className="table-col-time"> <FaClock size={ 24 } /> </th>
                        <th className="table-col-actions" />
                    </tr>
                    {tracks.map((item, index) => {
                        if (isPlaylist) {
                            const { track } = item;
                            return (
                                <TrackItem
                                track={ track }
                                selectTrack={ this.selectTrackHandler }
                                AddToQueue={ this.addToQueueHandler }
                                index={ index }
                                currentTrack={ currentTrack }
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
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTrack: state.music.currentTrack
});

const mapDispatchToProps = (dispatch) => ({
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    selectTrack: (index, track, queue) => dispatch(selectTrack(index, track, queue))
});


TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
    isPlaylist: PropTypes.bool.opt,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTable);