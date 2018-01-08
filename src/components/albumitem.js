import React from 'react';
import { Link } from 'react-router-dom';
import FaPlay from 'react-icons/lib/fa/play';


const AlbumItem = (props) => {
    const { name, images, artists } = props.album;
    if (images === null) {
        return null;
    }
    return (
        <div className="albumItem">
            <Link to="/" className="tag">
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