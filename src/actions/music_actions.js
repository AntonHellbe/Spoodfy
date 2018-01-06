import { musicActions } from '../constants/actions';

export const togglePlaying = () => ({
    type: musicActions.TOGGLE_PLAYING,
});

export const selectTrack = (track, queue) => {
    // console.log(track + queue);
    return {
        type: musicActions.SELECT_TRACK,
        track,
        queue
    };
};

export const AddToQueue = (track) => ({
    type: musicActions.ADD_TO_QUEUE,
    track
});

export const loadNextTrack = (track, queue) => ({
    type: musicActions.NEXT_TRACK,
    track,
    queue,
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