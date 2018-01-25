import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestCreatePlaylist
} from '../../actions/playlist_actions';
import {
    hideModal
} from '../../actions/modal_actions';
import PlaylistForm from './PlaylistForm';

class AddPlaylistModal extends Component {

    componentWillMount() {
        document.addEventListener('click', this.handlePageClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlePageClick);
    }

    handlePageClick = (e) => {
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.hideModal();
    }

    submit = (values) => {
        this.props.requestCreatePlaylist(values, this.props.spotifyId);
    }

    render() {
        
        return (
            <div 
            className="modal-overlay"
            >
                <div 
                className="modal-container"
                ref={ (modal) => { this.modal = modal; } }
                >
                    <PlaylistForm 
                    initialValues={ {
                        name: '',
                        public: false,
                        collaborative: false,
                        description: '' }
                    }
                    onSubmit={ this.submit }
                    form={ 'addPlaylist' }
                    create={ true } //eslint-disable-line
                    />
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    requestCreatePlaylist: (values, spotifyId) =>
        dispatch(requestCreatePlaylist(values, spotifyId)),
    hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(AddPlaylistModal);