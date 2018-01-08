import React from 'react';
import { Link } from 'react-router-dom';
import FaPlay from 'react-icons/lib/fa/play';


const AlbumItem = (props) => {
    const { name, images, artists, id } = props.album;
    const { album, requestPlayAlbum } = props;
    if (images === null) {
        return null;
    }
    const style = props.currentAlbum ? props.currentAlbum.id === id ? '0 4px 8px 0 #ff6b42' : null : null; //eslint-disable-line
    return (
        <div 
        className="albumItem"
            style={ props.currentAlbum.id === id ? { boxShadow: style } : null }
        >
            <Link 
            to="#" 
            className="tag" 
            onClick={ () => { 
                requestPlayAlbum(id, album);
            } } 
            >
            <img 
            src={ images[0].url }
            role="presentation"
            className="temp"
            />
            <FaPlay className="icon-play" size={ '24px' } />
            </Link>
            <ul>
                <li>{ name }</li>
                <li>{ artists[0].name } </li>
            </ul>
        </div>
    );
};


export default AlbumItem;