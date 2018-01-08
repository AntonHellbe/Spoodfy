import React from 'react';


const PlaylistBanner = (props) => {

    const track = props.tracks.total === 1 ? 'track' : 'tracks';
    const name = props.owner.display_name ? props.owner.display_name : props.owner.id;
    return (
        <div className="playlistBanner">
            { props.images[0] ? 
                <img src={ props.images[0].url } role="presentation" />
                :
                <img src="https://i.scdn.co/image/307b8ea5c11fdaadb34eacd3ffb9177cea0ad104" role="presentation" />
            }
            <h3>playlist</h3>
            <h1>{ props.name }</h1>
            <h3>
                    {`Created By: ${name}, ${props.tracks.total} ${track}`}
            </h3>
            <h2>Tracks</h2>
        </div>
    );
};


export default PlaylistBanner;