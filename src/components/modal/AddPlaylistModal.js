import React, { Component } from 'react';
import PlaylistForm from './PlaylistForm';

class AddPlaylistModal extends Component {

    componentWillReceiveProps(nextProps) {

        if (nextProps.isVisible && !this.props.isVisible) {
            document.addEventListener('click', this.handlePageClick);
        }

        if (!nextProps.isVisible && this.props.isVisible) {
            document.removeEventListener('click', this.handlePageClick);
        }
    }


    handlePageClick = (e) => {
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.toggleModal();
    }

    render() {
        const {
            onSubmit,
            isVisible
        } = this.props;
        return (
            <div 
            className="modal-background"
            style={ isVisible ? { display: 'block' } : { display: 'none' } }
            >
                <div 
                className="select-playlist"
                ref={ (modal) => { this.modal = modal; } }
                >
                    <PlaylistForm 
                    initialValues={ {
                        name: '',
                        public: false,
                        collaborative: false,
                        description: '' }
                    }
                    onSubmit={ onSubmit }
                    form={ 'addPlaylist' }
                    />
                </div>
            </div>
        );
    }
}

export default AddPlaylistModal;