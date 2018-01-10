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
        const {
            isFollowed
        } = props;

        const renderButton = () => {
            if (isFollowed) {
                return (
                    <button className="follow-button" id="unfollow" onClick={ () => props.requestFollowArtist('unfollow') }>
                    Unfollow
                </button>
                );
            }

            return (
                <button className="follow-button" id="follow" onClick={ () => props.requestFollowArtist('follow') }>
                    Follow
                </button>
            );
        };

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
                            <li>Genres: { genres.slice(0, 3).map((genre, index) => { 
                                if (index === 2) { 
                                    return `${genre}`;
                                } 
                                return `${genre}, `;
                            })} </li>
                            <li>{ `Followers: ${total}` }</li>
                            <li>{ `Popularity: ${popularity}` }</li>
                        </ul>
                        { renderButton() }
                    </div>
                
                </div>
            
            </div>
        );
};


export default ArtistBanner;