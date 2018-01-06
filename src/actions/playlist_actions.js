import { playlistActions } from '../constants/actions';

export const getUserPlaylists = () => ({
    type: playlistActions.MY_PLAYLISTS
});

export const playlistsFetched = (data) => ({
    type: playlistActions.PLAYLISTS_SUCCESS,
    playlists: data
});


export const playlistError = (error) => ({
    type: playlistActions.PLAYLISTS_ERROR,
    error
});

export const requestPlaylistSongs = () => ({
    type: playlistActions.REQUEST_PLAYLIST_TRACKS,
});

export const playlistTracksSuccess = (tracks) => ({
    type: playlistActions.PLAYLIST_TRACKS_SUCCESS,
    tracks
});

export const playlistTracksError = (error) => ({
    type: playlistActions.PLAYLIST_TRACKS_ERROR,
    error
});

export const updateActivePlaylist = (playlist) => {
    return {
        type: playlistActions.UPDATE_PLAYLIST_ID,
        playlist
    };
};

export const updateActivePlaylistWithId = (playlistId) => ({
    type: playlistActions.UPDATE_PLAYLIST_ID,
    playlistId
});
