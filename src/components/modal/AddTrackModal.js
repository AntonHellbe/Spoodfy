import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal_actions';
import {
    addTrackToPlaylist
} from '../../actions/playlist_actions';
import CloseOnEscape from '../../HOC/CloseOnEscape';

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
        console.log('selecting');
        const playlistId = e.target.id;
        console.log(playlistId);
        this.setState(() => ({ selectedPlaylist: playlistId }));
    }
    onSubmit = () => {
        const {
            spotifyId,
            track
        } = this.props;
        this.props.addTrackToPlaylist(this.state.selectedPlaylist, spotifyId, track.uri);
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
    return (
            <div 
            className="modal-overlay" 
            >
                <div 
                className="modal-container"
                ref={ modal => { this.modal = modal; } }
                >
                    <h3> Select Playlist </h3>
                    <ul className="select-playlist">
                        { playlists.map((playlist) => {
                            if (playlist.owner.id !== spotifyId) {
                                return null;
                            }

                            return (
                                <li 
                                className="select-playlist-item"
                                key={ playlist.id }
                                >
                                    <div>
                                        <input 
                                        type="radio" 
                                        id={ playlist.id } 
                                        name="playlist-group"
                                        onClick={ this.onSelect }
                                        checked={ this.state.selectedPlaylist === playlist.id }
                                        />
                                        <label 
                                        htmlFor={ playlist.id }
                                        style={ this.state.selectedPlaylist === playlist.id ? { color: '#03A9F4' } : { color: '#858585' } }
                                        id={ playlist.id }
                                        >
                                        { playlist.name }
                                        </label>
                                    </div>
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
    addTrackToPlaylist: (playlistId, spotifyId, trackUri) =>
        dispatch(addTrackToPlaylist(playlistId, spotifyId, trackUri))
});

export default connect(null, mapDispatchToProps)(CloseOnEscape(AddTrackModal));