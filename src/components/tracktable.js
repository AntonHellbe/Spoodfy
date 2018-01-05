import React from 'react';
import FaClock from 'react-icons/lib/fa/clock-o';
import PropTypes from 'prop-types';
import TrackItem from './trackitem';

const TrackTable = (props) => {
    const { tracks, selectTrack, AddToQueue } = props;
    // console.log(tracks);
    return (
        <table className="table">
            <tbody>
                <tr className="tableHeader">
                    <th className="table-col-title" > Title </th>
                    <th className="table-col-album"> Album </th>
                    <th className="table-col-time"> <FaClock size={ 24 } /> </th>
                    <th className="table-col-actions"> Actions </th>
                </tr>
                {tracks.map((item) => {
                    if (props.isPlaylist) {
                        const { track } = item;
                        return (
                            <TrackItem
                            track={ track }
                            selectTrack={ selectTrack }
                            AddToQueue={ AddToQueue }
                            />
                        );
                    }
                    return (
                        <TrackItem
                            track={ item }
                            selectTrack={ selectTrack }
                            AddToQueue={ AddToQueue }
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

TrackTable.PropTypes = {
    tracks: PropTypes.array.isRequired,
    selectTrack: PropTypes.func.isRequired,
    AddToQueue: PropTypes.func.isRequired,
    isPlaylist: PropTypes.bool.isRequired
};

export default TrackTable;