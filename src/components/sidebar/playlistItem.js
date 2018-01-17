import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_URL } from '../../constants/actions';


const PlaylistItem = (props) => {
    const {
        playlist,
        playlist: {
            images,
            id
        },
        activePlaylist: {
            playlistId
        },
        tracklistId,
        updateActivePlaylist,
        isPlaying
    } = props;
    let color = '#7b7b7b';
    let border = 'none';
    let display = 'none';

    if (playlistId !== '' && playlistId === id) {
        color = '#ff6b42';
        border = '3px solid #ff6b42';
    }
    if (isPlaying && tracklistId === id) {
        display = 'inline';
    }
    return (
        <li
            style={ { paddingTop: '5px' } }
            key={ playlist.id }
        >
            <Link
            to={ `/playlists/${playlist.id}` }
            style={ { borderLeft: border } }
            onClick={ () => updateActivePlaylist(playlist) }
            >
                { images[0] ? 
                (
                    <img
                        className="playlistAvatar"
                        src={ images[0].url }
                        role="presentation"
                    />
                ) :
                (
                    <img
                        className="playlistAvatar"
                        src={ DEFAULT_IMAGE_URL }
                        role="presentation"
                    />
                )}
                
                <span style={ { color } }>{playlist.name} </span>
                <i className="fa fa-volume-up" aria-hidden="true" style={ { display } } />
            </Link>
        </li>
    );
};


export default PlaylistItem;