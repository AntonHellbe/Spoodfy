import React, { Component } from 'react';


class AddTrackModal extends Component {
    
    state = {
        selectedPlaylist: ''
    }
    
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isVisible && this.props.isVisible) {
            this.setState(() => ({ selectedPlaylist: '' }));
        }
    }

    onSelect = (e) => {
        const playlist = e.target.id;
        this.setState(() => ({ selectedPlaylist: playlist }));
    }

    render() {

    const {
    onSubmit,
        togglePlaylistModal,
        isVisible,
        playlists,

    } = this.props;
    return (
            <div 
            className="modal-background" 
            style={ isVisible ? { display: 'block' } : { display: 'none' } }
            >
                <div className="select-playlist">
                    <h3> Select Playlist </h3>
                    <ul>
                        { playlists.map((playlist) => {
                            return (
                                <li>
                                <input 
                                type="radio" 
                                id={ playlist.id } 
                                name="playlist-group"
                                onClick={ this.onSelect }
                                checked={ this.state.selectedPlaylist === playlist.id }
                                />
                                { playlist.name }
                            </li>
                            );
                        }) }
                    </ul>
                    <button
                    onClick={ () => {
                        onSubmit(this.state.selectedPlaylist);
                    } }
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
    }
}

export default AddTrackModal;