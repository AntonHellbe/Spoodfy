import {
    musicControlActions
} from '../constants/actions';


export const requestNextTrack = () => ({
    type: musicControlActions.REQUEST_NEXT_TRACK
});

export const requestPreviousTrack = () => ({
    type: musicControlActions.REQUEST_PREVIOUS_TRACK
});

export const toggleShuffle = () => ({
    type: musicControlActions.TOGGLE_SHUFFLE,
});

export const toggleRepeat = () => ({
    type: musicControlActions.TOGGLE_REPEAT,
});

export const togglePlaying = () => ({
    type: musicControlActions.TOGGLE_PLAYING,
});
