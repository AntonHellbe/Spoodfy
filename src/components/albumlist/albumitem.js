import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';


const AlbumItem = (props) => {
    const { name, images, artists, id } = props.album;
    const { 
        album, 
        requestPlayAlbum,
        updateCurrentAlbum,
        requestArtist,
        currentTrack
    } = props;
    if (images === null) {
        return null;
    }

    let style;
    if (!_.isEmpty(currentTrack)) {
        style = currentTrack.album.id === id ? '0 4px 6px 0 rgba(1, 89, 157, 0.9)' : null;
    }
    return (
        <div 
        className="albumItem"
            style={ { boxShadow: style } }
        >
            <div 
            className="album-image-wrapper"
            >
                <Link 
                to={ `/albums/${id}` }
                className="album-item-link"
                >
                    <img 
                    src={ images[0].url }
                    role="presentation"
                    className="album-item-image"
                    onClick={ () => {
                        updateCurrentAlbum(album);
                    } }
                    />
                </Link>
                <i 
                className="fa fa-play" 
                aria-hidden="true"
                onClick={ (e) => {
                    e.stopPropagation();
                    requestPlayAlbum(id, album);
                } }
                />
            </div>

            <ul>
                <li>
                    <Link 
                    to={ `/albums/${id}` }
                    onClick={ () => updateCurrentAlbum(album) }
                    >
                        { name } 
                    </Link>
                </li>
                <li>
                    <Link 
                    to={ `/artists/${artists[0].id}` }
                    onClick={ () => requestArtist(artists[0].id) }
                    >
                        { artists[0].name }

                    </Link>
                </li>
            </ul>
        </div>
    );
};


export default AlbumItem;