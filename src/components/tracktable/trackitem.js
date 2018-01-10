import React from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import PropTypes from 'prop-types';


const TrackItem = (props) => {

        const { currentTrack = null, track, index, track: { name, artists, duration_ms, album, id } } = props;
        if (props.track.preview_url === null) {
            return null;
        }
        let currentId = null;
        if (currentTrack) {
            currentId = currentTrack.track ? currentTrack.track.id : currentTrack.id;
        }


        const minutes = Math.floor((Number(duration_ms) / 1000 / 60));
        let seconds = Math.floor((Number(duration_ms) / 1000 % 60));

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        
        const color = currentId === id ? '#ff6b42' : '#ffffff';
        return (
            <tr className="track" style={ { color } }>
                <td className="index-col" > 
                    { index } 
                </td>
                <td onDoubleClick={ () => { props.selectTrack(index, track); } }>
                    { name }
                    </td>
                <td> 
                    { artists.map((artist) => `${artist.name} `) } 
                </td>
                <td> 
                    { album.name } 
                </td>
                <td> 
                    { `${minutes}.${seconds}` } 
                </td>
                <td onClick={ () => props.AddToQueue(props.track) }> 
                        <i className="fa fa-plus" aria-hidden="true" /> 
                </td>
            </tr>
        );
};


TrackItem.PropTypes = {
    track: PropTypes.object.isRequired,
    selectTrack: PropTypes.func.isRequired,
    addToQueHandler: PropTypes.func.isRequired
};


export default TrackItem;