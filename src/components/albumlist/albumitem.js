import React from 'react';
import { Link } from 'react-router-dom';


const AlbumItem = (props) => {
    const { name, images, artists, id } = props.album;
    const { album, requestPlayAlbum } = props;
    if (images === null) {
        return null;
    }

    let style;

    if (props.currentAlbum) {
        style = props.currentAlbum.id === id ? '0 4px 8px 0 #ff6b42' : null;
    }
    // () => { requestPlayAlbum(id, album); }
    return (
        <div 
        className="albumItem"
            style={ { boxShadow: style } }
        >
            <Link 
            to={ `/albums/${id}` }
            onClick={ () => props.updateActiveAlbum(album) }
            className="tag"
            >
            <img 
            src={ images[0].url }
            role="presentation"
            className="temp"
            />
            <i className="fa fa-play" aria-hidden="true" /> 
            
            </Link>
            <ul>
                <li>{ name }</li>
                <li>{ artists[0].name } </li>
            </ul>
        </div>
    );
};


export default AlbumItem;