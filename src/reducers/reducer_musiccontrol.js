import {
    musicControlActions
} from '../constants/actions';

const INITIAL_STATE = {
    shuffle: false,
    repeat: false,
    isPlaying: false,
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
        
        default:
            return state;
    }
};

export default musicControlReducer;