import React from 'react';
import { Link } from 'react-router-dom';


const RecentTrack = (props) => {
    const { 
        track, 
        played_at, 
        track: { album, name, artists },
    } = props.item; //Utilize Played at? Cool.
    const {
        selectTrack,
        requestArtist,
        updateCurrentAlbum,
    } = props;
    if (typeof album.images[0] === 'undefined' ||
        track.preview_url === null) {
            return null;
        }

    const style = props.currentTrack.id === track.id ? '0 4px 8px 0 #ff6b42' : null;
    return (
        <div className="recent-track" style={ { boxShadow: style } }>
            <div 
            className="recent-image-wrapper"
            onClick={ () => selectTrack(track) }
            >
                    <img
                        src={ album.images[0].url }
                        role="presentation"
                    />
                
                <i
                    className="fa fa-play"
                    aria-hidden="true"
                />
            </div>

            <ul>
                <li>
                    <Link 
                    to={ `/albums/${album.id}` }
                    onClick={ () => updateCurrentAlbum(album) }
                    >
                        {name}
                    </Link>

                </li>
                <li>
                    <Link 
                    to={ `/artists/${artists[0].id}` }
                        onClick={ () => requestArtist(artists[0].id) } 
                    >
                        { artists[0].name}
                    </Link>
                </li>
            </ul>
        
        </div>
    );

};


export default RecentTrack;