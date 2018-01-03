import React from 'react';
import { Link } from 'react-router-dom';


const AlbumItem = (props) => {
    const { name, images, artists } = props.album;
    if (images === null) {
        return null;
    }
    return (
        <div className="albumItem">
            <Link to="/">
            <img 
            src={ images[0].url }
            role="presentation" 
            />
            </Link>
            <ul>
                <li>{ name }</li>
                <li>{ artists[0].name } </li>
            </ul>
        </div>
    );
};


export default AlbumItem;