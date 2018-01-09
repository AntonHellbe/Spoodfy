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
        
        const color = currentId === id ? '#ff6b42' : '#ffffff';
        return (
            <tr className="track" style={ { color } }>
            <td className="index-col" > { index } </td>
                <td onDoubleClick={ () => { props.selectTrack(index, track); } }>{ name }</td>
            <td> { artists.map((artist) => `${artist.name} `) } </td>
            <td> { album.name } </td>
            <td> { (Number(duration_ms) / 1000 / 60).toFixed(2) } </td>
            <td onClick={ () => props.AddToQueue(props.track) }> <FaPlus color={ '#ffffff' } /> </td>
        </tr>
        );
};


TrackItem.PropTypes = {
    track: PropTypes.object.isRequired,
    selectTrack: PropTypes.func.isRequired,
    addToQueHandler: PropTypes.func.isRequired
};


export default TrackItem;