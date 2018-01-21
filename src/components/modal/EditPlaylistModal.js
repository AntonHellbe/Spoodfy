import React, { Component } from 'react';
import PlaylistForm from './PlaylistForm';


class EditPlaylistModal extends Component {


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
            initialValues,
            isVisible,
            onSubmit
        } = this.props;
        // console.log(this.props.onSubmit);
        return (
            <div 
            className="modal-background" 
            style={ isVisible ? { display: 'block' } : { display: 'none' } }
            >
                <div 
                className="select-playlist"
                ref={ modal => { this.modal = modal; } }
                >
                    <PlaylistForm 
                    initialValues={ initialValues }
                    form={ 'editPlaylist' }
                    onSubmit={ onSubmit }
                    />
                </div>

            </div>
        );
    }
}


export default EditPlaylistModal;