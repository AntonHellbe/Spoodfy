import { modalActions } from '../constants/actions';

const INITIAL_STATE = {
    editPlaylistModal: false,
    addPlaylistModal: false,
    modalProps: {},
    modalType: ''
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case modalActions.TOGGLE_PLAYLIST_EDIT_MODAL:
            return { ...state, editPlaylistModal: !state.editPlaylistModal };

        case modalActions.TOGGLE_PLAYLIST_ADD_MODAL:
            return { ...state, addPlaylistModal: !state.addPlaylistModal };

        case modalActions.SHOW_MODAL:
            return { ...state, modalType: action.modalType, modalProps: action.modalProps };
        
        case modalActions.HIDE_MODAL:
            return { ...state, modalType: {}, modalProps: '' };

        default:
            return state;
    }
};


export default modalReducer;