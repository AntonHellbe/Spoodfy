import React from 'react';


const Playing = (props) => (
    <div className="playing">
        <ul className="displayTrackInfo">
            { props.currentTrack.name &&
                <React.Fragment>
                    <li> { `Track: ${props.currentTrack.name}` } </li>
                    <li> { `Artist: ${props.currentTrack.artists[0].name}` }</li>
                </React.Fragment>
            }
        </ul>
    </div>
);

export default Playing;