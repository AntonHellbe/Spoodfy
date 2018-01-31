import {
    musicControlActions
} from '../constants/actions';

const INITIAL_STATE = {
    shuffle: false,
    repeat: false,
    isPlaying: false,
    isSeeking: false,
    playedTime: 0
};

const musicControlReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case musicControlActions.TOGGLE_PLAYING:
            return {
                ...state,
                isPlaying: !state.isPlaying
            };

        case musicControlActions.TOGGLE_SHUFFLE:
            return {
                ...state,
                shuffle: !state.shuffle
            };

        case musicControlActions.TOGGLE_REPEAT:
            return {
                ...state,
                repeat: !state.repeat
            };
        
        case musicControlActions.START_SEEKING:
            return {
                ...state,
                isSeeking: true
            };
        
        case musicControlActions.STOP_SEEKING:
            return {
                ...state,
                isSeeking: false
            };
        
        case musicControlActions.UPDATE_PLAYED_TIME: {
            return {
                ...state,
                playedTime: action.time
            };
        }
        
        default:
            return state;
    }
};

export default musicControlReducer;