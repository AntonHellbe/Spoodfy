import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class TrackItem extends Component {
        

        onUpdateAlbum = () => {
            this.props.updateCurrentAlbum(this.props.track.album);
        }

        onAddToQueue = () => {
            this.props.AddToQueue(this.props.track);
        }    
        
        onSelectTrack = () => {
            const {
                index,
                track,
                selectTrack
            } = this.props;
            
            selectTrack(index, track);
        }

        dropdownIndexChange = () => {
            this.props.dropdownChange(this.props.index);
        }
        
        toggleModal = () => {
            this.props.togglePlaylistModal(this.props.index);
        }
        //Hides dropdown
        hide = (e) => {
            if (e && e.relatedTarget) {
                e.relatedTarget.click();
            }

            this.props.dropdownChange('');
        }

        render() {
        
        const { 
            currentTrack = null,
            track, 
            index, 
            track: { name, artists, duration_ms, album, id },
            requestArtist,
            dropdownStatus,
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
            <tr 
            className="track" 
            style={ { color } }
            key={ id }
            onDoubleClick={ this.onSelectTrack }
            >
                <td 
                className="index-col"
                > 
                    { track.preview_url ? 
                        index : 
                        <i className="fa fa-times" aria-hidden="true" /> 
                    } 
                </td>
                <td>
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
                    onClick={ this.dropdownIndexChange }
                    onBlur={ this.hide }
                    >
                    ...
                    </button>
                    <ul 
                    className="dropdown-trackitem"
                    style={ dropdownStatus === index ? { display: 'block' } : { display: 'none' } }
                    >
                        { track.preview_url ? 
                        (
                            <li>
                            <button
                            onClick={ this.onAddToQueue }
                            >
                            Add to Queue
                            </button>
                            </li>
                        ) :
                        (
                            <li>
                                No Preview Url
                            </li>
                        )
                        }
                        { artists[0].id && <li>
                            <Link 
                            to={ `/artists/${artists[0].id}` }
                            onClick={ () => requestArtist(artists[0].id) }
                            >
                            Go to Artist
                            </Link>
                        </li>
                        }
                        { album.id && 
                        <li>
                            <Link
                            to={ `/albums/${album.id}` }
                            onClick={ this.onUpdateAlbum }
                            >
                            Go to Album
                            </Link>
                        </li>
                        }
                        { track.preview_url && 
                        <li 
                        onClick={ this.toggleModal } 
                        >
                        <button>
                            Add to Playlist
                        </button>
                        </li>
                        }
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