import React from 'react';
import { DEFAULT_IMAGE_URL } from '../../constants/actions';

const Playing = (props) => {
    if (typeof props.currentTrack === 'undefined') {
        return <div className="playing" />;
    }

    const {
        name,
        artists,
        album = false
    } = props.currentTrack;

    return (
        <div className="playing">
        <div className="playing-album-wrapper">
            { !album ?
                (
                 <img src={ DEFAULT_IMAGE_URL } role="presentation" />
                ) :
                (
                <img
                src={ album.images[0].url }
                role="presentation"
                />
                )
            }
        </div>
            <ul className="displayTrackInfo">
                { props.currentTrack.name &&
                    <React.Fragment>
                        <li> { name } </li>
                        <li> { artists[0].name }</li>
                    </React.Fragment>
                }
            </ul>
        </div>
    );
};

export default Playing;