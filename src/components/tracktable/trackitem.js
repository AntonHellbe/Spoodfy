import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    AddToQueue, requestPlayPlaylist
} from '../../actions/music_actions';
import {
    updateCurrentAlbum, requestAlbum
} from '../../actions/album_actions';

import {
    requestArtist
} from '../../actions/artist_actions';
import {
    removeTrackFromPlaylist
} from '../../actions/playlist_actions';


class TrackItem extends Component {
        

        onUpdateAlbum = () => {
            // console.log(this.props.track.album);
            this.props.requestAlbum(this.props.track.album.id);
        }

        onAddToQueue = () => {
            this.props.AddToQueue(this.props.track);
        }
        
        onRequestArtist = () => {
            const {
                track: {
                    artists
                }
            } = this.props;
            this.props.requestArtist(artists[0].id);
        }

        onRemoveTrack = () => {
            const {
                activePlaylist: {
                    playlist
                },
                spotifyId,
                track
            } = this.props;
            this.props.removeTrackFromPlaylist(spotifyId, playlist, track.uri);
        }

        dropdownIndexChange = () => {
            this.props.dropdownChange(this.props.index);
        }
        

        //Hide dropdown
        hide = (e) => {
            if (e && e.relatedTarget) {
                e.relatedTarget.click();
            }

            this.props.dropdownChange('');
        }

        renderPopularity = (popularity) => {
            const num = Number(popularity);
            const popDivs = [];

            for (let i = 1; i < 11; i++) {
                if (num / (i * 10) > 1) {
                    popDivs[i] = (
                        <div className="div-pop" />
                    );
                } else {
                    popDivs[i] = (
                        <div className="div-pop-gray" />
                    );
                }
            }
            return popDivs;
        }

        render() {
        
        const { 
            currentTrack = null,
            track, 
            index, 
            track: { name, artists, duration_ms, album, id, popularity },
            dropdownStatus,
            type,
            activePlaylist,
            spotifyId,
            selectTrack,
            } = this.props;

        let currentId = null;
        if (currentTrack) {
            currentId = currentTrack.track ? currentTrack.track.id : currentTrack.id;
        }

        let canRemove = null;
        if (type === 'playlist') {
            canRemove = activePlaylist.playlist.owner.id === spotifyId || 
                activePlaylist.playlist.collaborative;
        }

        const minutes = Math.floor((Number(duration_ms) / 1000 / 60));
        let seconds = Math.floor((Number(duration_ms) / 1000 % 60));

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        const color = currentId === id ? '#03A9F4' : '#ffffff';
        return (
            <tr 
            className="track" 
            style={ { color } }
            key={ id }
            onDoubleClick={ () => selectTrack(index, track) }
            >
                <td 
                className="index-col"
                style={ { color } }
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
                    onClick={ this.onRequestArtist }
                    style={ { color } }
                    >
                    { artists[0].name } 
                    </Link>
                </td>
                <td> 
                    <Link
                    to={ `/albums/${album.id}` }
                    onClick={ this.onUpdateAlbum }
                    style={ { color } }
                    >
                    { album.name } 
                    </Link>
                </td>
                <td>
                    <div className="div-track-popularity">
                        { this.renderPopularity(popularity) }
                    </div>
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
                            onClick={ this.onRequestArtist }
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
                        onClick={ this.props.openModal }
                        >
                        <button>
                            
                            Add to Playlist
                        </button>
                        </li>
                        }
                        { canRemove &&
                            <li>
                                <button
                                onClick={ this.onRemoveTrack }
                                >
                                    Remove from playlist
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

const mapStateToProps = (state) => ({
    currentArtist: state.artists.currentArtist,
    spotifyId: state.user.spotifyId,
    activePlaylist: state.playlists.activePlaylist,
    currentTrack: state.music.currentTrack

});

const mapDispatchToProps = (dispatch) => ({
    AddToQueue: (tracks) => dispatch(AddToQueue(tracks)),
    requestAlbum: (id) => dispatch(requestAlbum(id)),
    requestArtist: (id) => dispatch(requestArtist(id)),
    removeTrackFromPlaylist: (spotifyId, playlist, trackUri) =>
        dispatch(removeTrackFromPlaylist(spotifyId, playlist, trackUri)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);