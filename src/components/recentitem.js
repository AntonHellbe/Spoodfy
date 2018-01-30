import React from 'react';

const RecentItem = (props) => {
    // const { track, played_at } = props.item; //Utilize Played at? Cool.
    const {
        album,
        name,
        artists,
        id
    } = props.item;
    const {
        isPlaying,
        currentTrack,
        onClickPlay,
        togglePlaying
    } = props;

    const isPlayingThisTrack = isPlaying && id === currentTrack.id;

    return (
        <li className="latest-played-item">
            
            <img 
            src={ album.images[0].url }
            role="presentation"
            />
            <ul>
                <li>
                    Track: { name }
                </li>
                <li>
                    Artist: { artists[0].name }
                </li>
                <li>
                    { !isPlayingThisTrack ? 
                    (
                        <i 
                        className="fa fa-play-circle" 
                        aria-hidden="true" 
                        onClick={ currentTrack.id === id ? 
                            togglePlaying : 
                            () => onClickPlay(props.item) }
                        />
                    ) :
                    (
                        <i 
                        className="fa fa-pause-circle"
                        aria-hidden="true"
                        onClick={ togglePlaying }
                        />
                    )
                    }
                </li>
                    
            </ul>

        </li>
    );

};


export default RecentItem;