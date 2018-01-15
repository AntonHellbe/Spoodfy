import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class TrackItem extends Component {

        state = {
            isVisible: false
        }

        onToggleDropDown = () => {
            this.setState((prevState) => ({ isVisible: !prevState.isVisible }));
        }

        onAddToQueue = () => {
            this.setState(() => ({ isVisible: false }));
            this.props.AddToQueue(this.props.track);
        }
        
        onUpdateAlbum = () => {
            this.props.updateCurrentAlbum(this.props.track.album);
        }


        render() {
        
        const { 
            currentTrack = null,
            track, 
            index, 
            track: { name, artists, duration_ms, album, id },
            selectTrack,
            requestArtist,
            } = this.props;

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
                    { track.preview_url ? index : <i className="fa fa-times" aria-hidden="true" /> } 
                </td>
                <td onDoubleClick={ () => { selectTrack(index, track); } }>
                    { name }
                </td>
                <td>
                    <Link 
                    to={ `/artists/${artists[0].id}` }
                    onClick={ () => requestArtist(artists[0].id) }
                    style={ { color } }
                    >
                    { artists[0].name } 
                    </Link>
                </td>
                <td> 
                    { album.name } 
                </td>
                <td
                className="dropdown-action-trackitem"
                >
                    <button
                    onClick={ this.onToggleDropDown }
                    >
                    ...
                    </button>
                    <ul 
                    className="dropdown-trackitem"
                    style={ this.state.isVisible ? { display: 'block' } : { display: 'none' } }>
                        <li onClick={ this.onAddToQueue } >Add To Queue</li>
                        <li>Testing2</li>
                        <li>
                            <Link 
                            to={ `/artists/${artists[0].id}` }
                            onClick={ () => requestArtist(artists[0].id) }
                            >
                            Go To artist
                            </Link>
                        </li>
                        <li>
                            <Link
                            to={ `/albums/${album.id}` }
                            onClick={ this.onUpdateAlbum }
                            >
                            Go To album
                            </Link>
                        </li>
                    </ul>
                </td>
                <td> 
                    { `${minutes}.${seconds}` } 
                </td>
            </tr>
        );
    }
}


TrackItem.PropTypes = {
    track: PropTypes.object.isRequired,
    selectTrack: PropTypes.func.isRequired,
    addToQueHandler: PropTypes.func.isRequired
};


export default TrackItem;