import { musicActions } from '../constants/actions';

const INITIAL_STATE = {
    currentTrack: {},
    tracklist: [],
    queue: [],
    error: '',
    playingIndex: 0,
    tracklistId: '',
    recentlyPlayed: []
};

const musicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case musicActions.SELECT_TRACK:
            return { ...state, 
                currentTrack: action.track, 
                playingIndex: action.index, 
                tracklist: action.tracklist, 
                tracklistId: action.tracklistId };

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

        case musicActions.ADD_TO_QUEUE:
            return { 
                ...state, 
                queue: state.queue.concat(action.tracks) };
        
        case musicActions.LOAD_NEXT_QUEUE_TRACK:
            return {
                ...state,
                currentTrack: state.queue[0],
                tracklist: state.tracklist.slice(0, state.playingIndex + 1)
                    .concat(state.queue[0])
                    .concat(state.tracklist.slice(state.playingIndex + 1)),
                queue: [...state.queue.slice(1)],
                playingIndex: state.playingIndex + 1
            }; // LEL
        
        case musicActions.UPDATE_RECENTLY_PLAYED_MUSIC:
            if (state.recentlyPlayed.length > 6) {
                return {
                    ...state, recentlyPlayed: [...state.recentlyPlayed.slice(1, 7), action.track]
                };
            }
            return {
                ...state, recentlyPlayed: [...state.recentlyPlayed, action.track]
            };
        case musicActions.UPDATE_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.track
            };
        default:
            return state;
    }

};

export default musicReducer;