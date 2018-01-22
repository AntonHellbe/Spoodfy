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

export const updateActivePlaylist = (playlist, spotifyId) => ({
    type: playlistActions.UPDATE_PLAYLIST_ID,
    playlist,
    spotifyId
});

export const isFollowingPlaylistSuccess = (bool) => ({
    type: playlistActions.IS_FOLLOWING_SUCCESS,
    bool,
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

//Add a successhandler for this - In order to dispatch a notification that the track has been
//Added successfully
export const addTrackToPlaylist = (spotifyId, playlistId, trackUri) => ({
    type: playlistActions.REQUEST_ADD_TRACK_PLAYLIST,
    spotifyId,
    playlistId,
    trackUri
});


export const removeTrackFromPlaylist = (spotifyId, playlist, trackUri) => ({
    type: playlistActions.REQUEST_REMOVE_TRACK_PLAYLIST,
    spotifyId,
    playlist,
    trackUri
});

export const removeTrackSuccess = (playlist) => ({
    type: playlistActions.REMOVE_TRACK_SUCCESS,
    playlist
});

export const requestFeturedPlaylists = () => ({
    type: playlistActions.REQUEST_FEATURED_PLAYLISTS
});

export const featuredPlaylistsSuccess = (playlists) => ({
    type: playlistActions.FEATURED_PLAYLISTS_SUCCESS,
    playlists
});

export const featuredPlaylistsError = (error) => ({
    type: playlistActions.FEATURED_PLAYLISTS_ERROR,
    error
});

export const requestUpdatePlaylistDetails = (values, spotifyId, playlist) => ({
    type: playlistActions.REQUEST_UPDATE_PLAYLIST_DETAILS,
    values,
    spotifyId,
    playlist,
});

export const updatePlaylistDetailsSuccess = (spotifyId, playlistId) => ({
    type: playlistActions.UPDATE_PLAYLIST_DETAILS_SUCCESS,
    spotifyId,
    playlistId
});

export const requestCreatePlaylist = (values, spotifyId) => ({
    type: playlistActions.REQUEST_ADD_PLAYLIST,
    values,
    spotifyId
});

export const addPlaylistSuccess = () => ({
    type: playlistActions.ADD_PLAYLIST_SUCCESS,
});