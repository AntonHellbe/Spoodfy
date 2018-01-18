import { musicActions } from '../constants/actions';

const INITIAL_STATE = {
    repeat: false,
    currentTrack: {},
    isPlaying: false,
    tracklist: [],
    queue: [],
    errorRecentlyPlayed: '',
    volume: 0.05,
    playingIndex: 0,
    tracklistId: ''
};

const musicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case musicActions.TOGGLE_PLAYING:
            return { 
                ...state, 
                isPlaying: !state.isPlaying };

        case musicActions.SELECT_TRACK:
            return { ...state, 
                currentTrack: action.track, 
                playingIndex: action.index, 
                tracklist: action.tracklist, 
                tracklistId: action.tracklistId };

        case musicActions.SELECT_SINGLE_TRACK:
            return { ...state,
                    currentTrack: action.track,
                    playingIndex: 0,
                    tracklist: [] };

        case musicActions.NEXT_TRACK:
            return { 
                ...state, 
                currentTrack: state.tracklist[action.index],
                playingIndex: action.index };
        
        case musicActions.PREVIOUS_TRACK:
            return { 
                ...state, 
                currentTrack: state.tracklist[action.index], 
                playingIndex: action.index };
            
        case musicActions.TOGGLE_SHUFFLE:
            return { 
                ...state, 
                shuffle: !state.shuffle };
        
        case musicActions.TOGGLE_REPEAT:
            return { 
                ...state, 
                repeat: !state.repeat };

        case musicActions.ADD_TO_QUEUE:
            return { 
                ...state, 
                queue: state.queue.concat(action.tracks) };

        case musicActions.UPDATE_VOLUME:
            return { 
                ...state, 
                volume: action.volume };
        
        case musicActions.LOAD_NEXT_QUEUE_TRACK:
            console.log(state.tracklist.slice(0, state.playingIndex + 1).concat(state.queue[0]));
            return {
                ...state,
                currentTrack: state.queue[0],
                tracklist: state.tracklist.slice(0, state.playingIndex + 1)
                    .concat(state.queue[0])
                    .concat(state.tracklist.slice(state.playingIndex + 1)),
                queue: [...state.queue.slice(1)],
                playingIndex: state.playingIndex + 1
            }; // LEL

        default:
            return state;
    }

};

export default musicReducer;