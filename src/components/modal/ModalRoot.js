import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './modal';
import AddPlaylistModal from './AddPlaylistModal';
import EditPlaylistModal from './EditPlaylistModal';
import AddTrackModal from './AddTrackModal';
import { hideModal } from '../../actions/modal_actions';

const MODAL_COMPONENTS = {
    ADD_PLAYLIST_MODAL: AddPlaylistModal,
    EDIT_PLAYLIST_MODAL: EditPlaylistModal,
    ADD_TRACK_MODAL: AddTrackModal

};

class ModalRoot extends Component {

    componentWillReceiveProps(nextProps) {

        if (nextProps.modalType !== '' && this.props.modalType === '') {
            document.addEventListener('click', this.handlePageClick);
        }

        if (nextProps.modalType === '' && this.props.modalType !== '') {
            document.removeEventListener('click', this.handlePageClick);
        }
    }


    handlePageClick = (e) => {
        console.log('Hiding modal');
        if (this.modal.contains(e.target)) {
            return;
        }
        this.props.hideModal();
    }

    render() {
        const {
            modalType,
            modalProps
        } = this.props.modals;
    
        const ModalToRender = MODAL_COMPONENTS[modalType];
        console.log(modalProps);
        return (
            <Modal
            ref={ (modal) => { this.modal = modal; } }
            >
                { ModalToRender ? <ModalToRender { ...modalProps } /> : null }
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    modals: state.modals
});

const mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);