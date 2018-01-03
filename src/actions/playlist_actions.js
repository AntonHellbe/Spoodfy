import { playlistActions } from '../constants/actions';

export const getUserPlaylists = () => {
    return {
        type: playlistActions.MY_PLAYLISTS
    };
};

export const playlistsFetched = (data) => ({
    type: playlistActions.PLAYLISTS_SUCCESS,
    playlists: data
});


export const playlistError = (error) => ({
    type: playlistActions.PLAYLISTS_ERROR,
    error
});