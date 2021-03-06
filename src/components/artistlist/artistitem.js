import React from 'react';
import { Link } from 'react-router-dom';

const ArtistItem = (props) => {
    const { name, images, id } = props.artist;
    if (images === null || typeof images[0] === 'undefined') {
        return null;
    }
    return (
        <div className="artistItem">
            <Link 
            to={ `/artists/${id}` }
            onClick={ () => props.updateCurrentArtist(props.artist) }
            >
                <img 
                src={ images[0].url }
                role="presentation" 
                />
            </Link>
            <p>
                { name }
            </p>
        </div>
    );
};

export default ArtistItem;