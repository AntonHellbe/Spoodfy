import React from 'react';
import PlaylistCollection from '../playlistcollection/playlistcollection';

const NewReleasesBanner = (props) => {

        const {
            playlists,
            handleClick
        } = props;

        return (
            <div className="new-releases-banner">
                <div className="new-releases-title">
                    <h3>Featured Playlists</h3>
                    <button 
                    className="btn-search" 
                    onClick={ handleClick } 
                    >
                        Search &#62;&#62;
                    </button>
                </div>
                <div className="featured-playlists">
                    <PlaylistCollection
                    playlists={ playlists }
                    />
                </div>
            </div>
        );
};

export default NewReleasesBanner;