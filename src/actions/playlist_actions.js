import { playlistActions } from '../constants/actions';

export const getUserPlaylists = () => ({
    type: playlistActions.REQUEST_USER_PLAYLISTS
});

export const playlistsFetched = (data) => ({
    type: playlistActions.USER_PLAYLISTS_SUCCESS,
    playlists: data
});


export const playlistError = (error) => ({
    type: playlistActions.USER_PLAYLISTS_ERROR,
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

export const updateActivePlaylist = (playlist, spotifyId) => ({
    type: playlistActions.UPDATE_PLAYLIST_ID,
    playlist,
    spotifyId
});

export const isFollowingPlaylistSuccess = (bool) => ({
    type: playlistActions.IS_FOLLOWING_SUCCESS,
    bool
});

export const isFollowingPlaylistError = (error) => ({
    type: playlistActions.IS_FOLLOWING_ERROR,
    error
});

export const requestFollowPlaylist = (playlist, action, spotifyId) => ({
    type: playlistActions.REQUEST_FOLLOW_PLAYLIST,
    playlist,
    action,
    spotifyId
});

export const followPlaylistSuccess = (playlist, spotifyId) => ({
    type: playlistActions.FOLLOW_PLAYLIST_SUCCESS,
    playlist,
    spotifyId
});

export const followPlaylistError = (error) => ({
    type: playlistActions.FOLLOW_PLAYLIST_ERROR,
    error
});

export const clearActivePlaylistId = () => ({
    type: playlistActions.CLEAR_ACTIVE_PLAYLIST_ID
});

export const playPlaylistSuccess = (playlist, tracks) => ({
    type: playlistActions.PLAY_PLAYLIST_SUCCESS,
    playlist,
    tracks
});
