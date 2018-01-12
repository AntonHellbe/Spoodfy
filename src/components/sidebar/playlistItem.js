import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_URL } from '../../constants/actions'
import _ from 'lodash';


const PlaylistItem = (props) => {
    const {
        playlist,
        playlist: {
            images,
            id
        },
        updateActivePlaylist,
        activePlaylist: {
            playlistId
        }
    } = props;
    let color = '#fff';
    if (playlistId !== '' && playlistId === id) {
        color = '#ff6b42';
    }
    return (
        <li
            className="playlist"
            style={ { paddingTop: '5px' } }
            key={ playlist.id }
        >
            <Link
            className="link"
            to={ `/playlists/${playlist.id}` }
            onClick={ () => updateActivePlaylist(playlist) }
            style={ { color } }
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
                
                <p>{ playlist.name } </p>
                {/* <i className="fa fa-volume-up" aria-hidden="true" /> */}
            </Link>
        </li>
    );
};


export default PlaylistItem;