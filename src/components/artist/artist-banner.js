import React from 'react';

export const ArtistBanner = (props) => {

        const {
            genres,
            popularity,
            name,
            followers: { total },
            external_urls: { spotify },
            images,
        } = props.artist;

        return (
            <div className="artist-banner">
                <img
                src={ images[0].url }
                role="presentation"
                />
                <div className="artist-information">
                    <div className="artist-title">
                        <h1> { name } </h1>

                    </div>

                    <div className="artist-description">
                        <ul>
                            <li>Genres: { genres.map((genre, index) => { 
                                if (index === genres.length - 1) { 
                                    return `${genre}`;
                                } 
                                return `${genre}, `;
                            })} </li>
                            <li>{ `Followers: ${total}` }</li>
                            <li>{ `Popularity: ${popularity}` }</li>
                        </ul>
                    </div>
                
                </div>
            
            </div>
        );
};


export default ArtistBanner;