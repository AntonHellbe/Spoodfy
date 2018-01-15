import React from 'react';


const Playing = (props) => {
    return (
        <div className="playing">
            <ul className="displayTrackInfo">
                { props.currentTrack.name &&
                    <React.Fragment>
                        <li> { `${props.currentTrack.name}` } </li>
                        <li> { `${props.currentTrack.artists[0].name}` }</li>
                    </React.Fragment>
                }
            </ul>
        </div>
    );
};

export default Playing;