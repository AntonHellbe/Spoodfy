import React from 'react';

const RecentItem = (props) => {
    const { track, played_at } = props.item; //Utilize Played at? Cool.
    if (typeof track.album.images === 'undefined' && track.preview_url === null) {
        return null;
    }
    return (
        <div className="recentItem">
            <img 
            src={ track.album.images[0].url }
            role="presentation"
            />
            <ul>
                <li>
                    Track: { track.name }
                </li>
                <li>
                    Artist: {track.artists[0].name}
                </li>
                    
            </ul>

        </div>
    );

};


export default RecentItem;