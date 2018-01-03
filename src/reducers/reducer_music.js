import { musicActions } from '../constants/actions';

const INITIAL_STATE = {
    repeat: false,
    currentTrack: null,
    isPlaying: false,
    queue: [],
    duration: 30,
    recentlyPlayed: [],
    errorRecentlyPlayed: ''
    
};

const musicReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case musicActions.TOGGLE_PLAYING:
            return { ...state, isPlaying: !state.isPlaying };

        case musicActions.SELECT_TRACK:
            return { ...state, currentTrack: action.track };

        case musicActions.NEXT_TRACK:
            return { ...state, currentTrack: action.track, queue: action.queue };
            
        case musicActions.TOGGLE_SHUFFLE:
            return { ...state, shuffle: !state.shuffle };
        
        case musicActions.TOGGLE_REPEAT:
            return { ...state, repeat: !state.repeat };

        case musicActions.ADD_TO_QUEUE:
            return { ...state, queue: [...state.queue, action.track] };

        case musicActions.UPDATE_RECENTLY_PLAYED:
            return { ...state, recentlyPlayed: action.recentTracks };

        case musicActions.ERROR_RECENTLY_PLAYED:
            return { ...state, errorRecentlyPlayed: action.error };

        default:
            return state;
    }

};

export default musicReducer;