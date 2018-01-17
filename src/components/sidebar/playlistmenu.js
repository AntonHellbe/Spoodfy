import React, { Component } from 'react';
import PlaylistItem from './playlistItem';

class PlaylistMenu extends Component {

    render() {
        const {
            playlists,
            activePlaylist,
            tracklistId,
            updateActivePlaylist,
            isPlaying
        } = this.props;


        return (
            <ul className="playlists" style={ { listStyle: 'none' } }>
                { playlists.map((playlist) => (
                    <PlaylistItem 
                    playlist={ playlist }
                    activePlaylist={ activePlaylist }
                    tracklistId={ tracklistId }
                    updateActivePlaylist={ updateActivePlaylist }
                    isPlaying={ isPlaying }
                    />
                    
                ))}
            </ul>
        );
    }
}

export default PlaylistMenu;