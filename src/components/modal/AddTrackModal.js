import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal_actions';
import {
    addTrackToPlaylist
} from '../../actions/playlist_actions';


class AddTrackModal extends Component {
    
    state = {
        selectedPlaylist: ''
    }

    componentWillMount() {
        document.addEventListener('click', this.handlePageClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlePageClick);
        this.setState(() => ({ selectedPlaylist: '' }));
    }

    onSelect = (e) => {
        const playlistId = e.target.id;
        console.log(playlistId);
        this.setState(() => ({ selectedPlaylist: playlistId }));
    }
    onSubmit = () => {
        const {
            spotifyId,
            track
        } = this.props;
        console.log(track);
        console.log(spotifyId);
        this.props.addTrackToPlaylist(spotifyId, this.state.selectedPlaylist, track.uri);
    }

    handlePageClick = (e) => {
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.hideModal();
    }


    render() {
    const {
        playlists,
        spotifyId
    } = this.props;

    console.log(this.props);
    return (
            <div 
            className="modal-background" 
            >
                <div 
                className="select-playlist"
                ref={ modal => { this.modal = modal; } }
                >
                    <h3> Select Playlist </h3>
                    <ul>
                        { playlists.map((playlist) => {
                            if (playlist.owner.id !== spotifyId) {
                                return null;
                            }

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
                    onClick={ this.onSubmit }
                    >
                        Add
                    </button>
                    <button
                    onClick={ this.props.hideModal }
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    addTrackToPlaylist: (spotifyId, playlistId, trackUri) =>
        dispatch(addTrackToPlaylist(spotifyId, playlistId, trackUri))
});

export default connect(null, mapDispatchToProps)(AddTrackModal);