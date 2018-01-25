import React, { Component } from 'react';
import PlaylistForm from './PlaylistForm';
import { connect } from 'react-redux';
import {
    hideModal
} from '../../actions/modal_actions';
import {
    requestUpdatePlaylistDetails
} from '../../actions/playlist_actions';


class EditPlaylistModal extends Component {


    componentWillMount() {
        document.addEventListener('click', this.handlePageClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlePageClick);
        this.setState(() => ({ selectedPlaylist: '' }));
    }

    submit = (values) => {
        const {
            spotifyId,
            playlist
        } = this.props;
        this.props.requestUpdatePlaylistDetails(values, spotifyId, playlist);
    }


    handlePageClick = (e) => {
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.hideModal();
    }

    render() {
        const {
            playlist: {
                name,
                collaborative,
                description
            },
            playlist
        } = this.props;
        return (
            <div 
            className="modal-overlay" 
            >
                <div 
                className="modal-container"
                ref={ modal => { this.modal = modal; } }
                >
                    <PlaylistForm 
                    initialValues={ {
                        name,
                        public: playlist.public,
                        collaborative,
                        description: description || ''
                        } }
                    form={ 'editPlaylist' }
                    onSubmit={ this.submit }
                    />
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    requestUpdatePlaylistDetails: (values, spotifyId, playlist) =>
        dispatch(requestUpdatePlaylistDetails(values, spotifyId, playlist)),
});


export default connect(null, mapDispatchToProps)(EditPlaylistModal);