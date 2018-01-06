import React, { Component } from 'react';
import FaClock from 'react-icons/lib/fa/clock-o';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';

class TrackTable extends Component {
    
    addToQueueHandler = (track) => {
        this.props.AddToQueue(track);
    }

    selectTrackHandler = (track, index) => {
        this.props.selectTrack(track, this.props.tracks.slice(index + 1));
    }

    render() {

    const { tracks, isPlaylist, currentTrack } = this.props;
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


TrackTable.PropTypes = {
    tracks: PropTypes.array.isRequired,
    selectTrack: PropTypes.func.isRequired,
    AddToQueue: PropTypes.func.isRequired,
    isPlaylist: PropTypes.bool.isRequired,
    currentTrack: PropTypes.object.isRequired
};

export default TrackTable;