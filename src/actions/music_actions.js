import { musicActions } from '../constants/actions';

export const togglePlaying = () => ({
    type: musicActions.TOGGLE_PLAYING,
});

export const selectTrack = (index, track, queue) => ({
    type: musicActions.SELECT_TRACK,
    index,
    track,
    queue
});

export const selectSingleTrack = (track) => ({
    type: musicActions.SELECT_SINGLE_TRACK,
    track
});

export const AddToQueue = (track) => ({
    type: musicActions.ADD_TO_QUEUE,
    track
});

export const loadNextTrack = () => ({
    type: musicActions.NEXT_TRACK,
});

export const toggleShuffle = () => ({
    type: musicActions.TOGGLE_SHUFFLE,
});

export const toggleRepeat = () => ({
    type: musicActions.TOGGLE_REPEAT,
});

export const updateRecentlyPlayed = (recentTracks) => ({
    type: musicActions.UPDATE_RECENTLY_PLAYED,
    recentTracks
});

export const errorRecentlyPlayed = (error) => ({
    type: musicActions.ERROR_RECENTLY_PLAYED,
    error
});

export const updateVolume = (volume) => ({
    type: musicActions.UPDATE_VOLUME,
    volume
});

export const previousTrack = () => ({
    type: musicActions.PREVIOUS_TRACK
});

export const requestPlayAlbum = (id, album) => ({
    type: musicActions.REQUEST_PLAY_ALBUM,
    id,
    album
});

export const playAlbumSuccess = (tracks, album) => ({
    type: musicActions.PLAY_ALBUM_SUCCESS,
    tracks,
    album
});

export const playAlbumError = (error) => ({
    type: musicActions.PLAY_ALBUM_ERROR,
    error
});

export const requestPlayArtistTopTracks = (id) => ({
    type: musicActions.REQUEST_PLAY_ARTIST_TOP_TRACKS,
    id
});