import { musicActions } from '../constants/actions';

export const selectTrack = (index, track, tracklist, tracklistId = '') => ({
    type: musicActions.SELECT_TRACK,
    index,
    track,
    tracklist,
    tracklistId
});


export const requestSelectTrack = (index, track, tracklist, tracklistId) => ({
    type: musicActions.REQUEST_SELECT_TRACK,
    index,
    track,
    tracklist,
    tracklistId
});

export const AddToQueue = (tracks) => ({
    type: musicActions.ADD_TO_QUEUE,
    tracks
});

export const loadNextTrack = (index) => ({
    type: musicActions.NEXT_TRACK,
    index
});

export const requestPlayAlbum = (id, album) => ({
    type: musicActions.REQUEST_PLAY_ALBUM,
    id,
    album
});

export const requestPlayArtistTopTracks = (id) => ({
    type: musicActions.REQUEST_PLAY_ARTIST_TOP_TRACKS,
    id
});

export const requestPlayPlaylist = (playlistUrl, playlist) => ({
    type: musicActions.REQUEST_PLAY_PLAYLIST,
    playlistUrl,
    playlist
});

export const loadNextQueueTrack = () => ({
    type: musicActions.LOAD_NEXT_QUEUE_TRACK
});

export const updateRecentlyPlayed = (track) => ({
    type: musicActions.UPDATE_RECENTLY_PLAYED_MUSIC,
    track
});

