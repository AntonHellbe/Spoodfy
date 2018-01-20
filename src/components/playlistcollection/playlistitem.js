import React from 'react';
import { Link } from 'react-router-dom';


const PlaylistItem = (props) => {

    const {
        playlist: {
            images,
            name

        },
        playlist,
        onClickPlay,
        onClickPlaylist
    } = props;

    return (

        <div className="playlist-item">
            <div className="playlist-image-wrapper">
                <Link
                    to={ `/playlists/${playlist.id}` }
                    onClick={ () => onClickPlaylist(playlist) }
                >
                    <img
                        src={ images[0].url }
                        role="presentation"
                    />
                </Link>
                <i
                className="fa fa-play"
                aria-hidden="true"
                onClick={ (e) => {
                    e.stopPropagation();
                    onClickPlay(playlist);
                } }
                />
            </div>
            <ul>
                <li>
                    <Link 
                    to={ `/playlists/${playlist.id}` }
                    onClick={ () => onClickPlaylist(playlist) }
                    >
                {name}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default PlaylistItem;