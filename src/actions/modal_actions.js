import { modalActions } from "../constants/actions";

export const toggleEditPlaylistModal = () => ({
    type: modalActions.TOGGLE_PLAYLIST_EDIT_MODAL
});

export const toggleAddPlaylistModal = () => ({
    type: modalActions.TOGGLE_PLAYLIST_ADD_MODAL
});

export const showModal = (modalType, modalProps) => ({
    type: modalActions.SHOW_MODAL,
    modalType,
    modalProps
});

export const hideModal = () => ({
    type: modalActions.HIDE_MODAL
});
