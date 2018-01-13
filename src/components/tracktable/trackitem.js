import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const TrackItem = (props) => {

        const { currentTrack = null, track, index, track: { name, artists, duration_ms, album, id } } = props;
        // if (props.track.preview_url === null) {
        //     return null;
        // }
        let currentId = null;
        if (currentTrack) {
            currentId = currentTrack.track ? currentTrack.track.id : currentTrack.id;
        }
        // console.log(currentId);
        const minutes = Math.floor((Number(duration_ms) / 1000 / 60));
        let seconds = Math.floor((Number(duration_ms) / 1000 % 60));

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        const color = currentId === id ? '#ff6b42' : '#ffffff';
        return (
            <tr className="track" style={ { color } }>
                <td className="index-col" > 
                    { track.preview_url ? index : <i className="fa fa-times" aria-hidden="true" /> } 
                </td>
                <td onDoubleClick={ () => { props.selectTrack(index, track); } }>
                    { name }
                </td>
                <td>
                    <Link 
                    to={ `/artists/${artists[0].id}` }
                    onClick={ () => props.requestArtist(artists[0].id) }
                    style={ { color } }
                    >
                    { artists[0].name } 
                    </Link>
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