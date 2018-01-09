import React from 'react';
import FaPlay from 'react-icons/lib/fa/play';


const RecentTrack = (props) => {
    const { track, played_at, track: { album } } = props.item; //Utilize Played at? Cool.
    if (typeof album.images[0] === 'undefined' ||
        track.preview_url === null) {
            return null;
        }

    const style = props.currentTrack.id === track.id ? '0 4px 8px 0 #ff6b42' : null;

    return (
        <div className="recent-track" style={ { boxShadow: style } }>
            <button onClick={ () => props.selectSingleTrack(track) }>
            <img 
            src={ album.images[0].url }
            role="presentation"
            />
            <FaPlay className="icon-play" size={ '24px' } />
            </button>
            <ul>
                <li>{ track.name }</li>
                <li>{ track.artists[0].name }</li>
            </ul>
        
        </div>
    );

};


export default RecentTrack;