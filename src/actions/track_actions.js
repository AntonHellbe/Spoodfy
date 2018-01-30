import { trackActions } from '../constants/actions';

export const requestUserTopTracks = () => ({
    type: trackActions.REQUEST_USER_TOP_TRACKS
});


export const userTopTracksSuccess = (tracks) => ({
    type: trackActions.USER_TOP_TRACKS_SUCCESS,
    tracks
});

export const userTopTracksError = (error) => ({
    type: trackActions.USER_TOP_TRACKS_ERROR,
    error
});

export const requestArtistTopTracks = (id) => ({
    type: trackActions.REQUEST_ARTIST_TOP_TRACKS,
    id
});
export const artistTopTracksSuccess = (tracks) => ({
    type: trackActions.ARTIST_TOP_TRACKS_SUCCESS,
    tracks,
});

export const artistTopTracksError = (error) => ({
    type: trackActions.ARTIST_TOP_TRACKS_ERROR,
    error
});
export const updateRecentlyPlayed = (recentTracks) => ({
    type: trackActions.UPDATE_RECENTLY_PLAYED,
    recentTracks
});

export const errorRecentlyPlayed = (error) => ({
    type: trackActions.ERROR_RECENTLY_PLAYED,
    error
});

export const reuestPlaylistTracks = () => ({
    type: trackActions.REQUEST_PLAYLIST_TRACKS
});

export const playlistTracksSuccess = (tracks) => ({
    type: trackActions.PLAYLIST_TRACKS_SUCCESS,
    tracks
});

export const playlistTracksError = (error) => ({
    type: trackActions.PLAYLIST_TRACKS_ERROR,
    error
});

