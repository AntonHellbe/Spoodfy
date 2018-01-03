import React from 'react';

const ArtistItem = (props) => {
    const { name, images } = props.artist;
    if (images === null || typeof images[0] === 'undefined') {
        return null;
    }
    return (
        <div className="artistItem">
            <img 
            src={ images[0].url }
            role="presentation" 
            />
            <p>
                { name }
            </p>
        </div>
    );
};

export default ArtistItem;