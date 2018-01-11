import React, { Component } from 'react';
import PlaylistItem from './playlistItem';

class PlaylistMenu extends Component {

    render() {
        const {
            playlists,
            updateActivePlaylist,
            activePlaylist
        } = this.props;


        return (
            <ul className="playlists" style={ { listStyle: 'none' } }>
                { playlists.map((playlist) => (
                    <PlaylistItem 
                    playlist={ playlist }
                    updateActivePlaylist={ updateActivePlaylist }
                    activePlaylist={ activePlaylist }
                    />
                    
                ))}
            </ul>
        );
    }
}

export default PlaylistMenu;