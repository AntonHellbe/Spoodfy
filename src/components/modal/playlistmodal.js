import React from 'react';


const PlaylistModal = (props) => {
    const {
        onSubmit,
        togglePlaylistModal,
        isVisible,
        playlists,
        selectPlaylist,
        spotifyId
    } = props;

    return (
        <div 
        className="modal-background" 
        style={ isVisible ? { display: 'block' } : { display: 'none' } }
        >
            <div className="select-playlist">
                <h3> Select Playlist </h3>
                <ul>
                    { playlists.map((playlist) => {
                        if (playlist.owner.id === spotifyId || playlist.collaborative) {
                            return (
                                <li>
                                <input 
                                type="radio" 
                                id={ playlist.id } 
                                name="playlist-group"
                                onClick={ () => selectPlaylist(playlist) }
                                />
                                { playlist.name }
                            </li>
                            );
                        }
                        return null;
                    }) }
                </ul>
                <button
                onClick={ onSubmit }
                >
                    Add
                </button>
                <button
                onClick={ togglePlaylistModal }
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PlaylistModal;