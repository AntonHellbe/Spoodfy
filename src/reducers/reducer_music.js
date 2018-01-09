import { musicActions } from '../constants/actions';

const INITIAL_STATE = {
    repeat: false,
    currentTrack: {},
    isPlaying: false,
    queue: [],
    duration: 30,
    recentlyPlayed: [],
    errorRecentlyPlayed: '',
    volume: 0.5,
    playingIndex: 0,
    currentAlbum: {},
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
                queue: action.queue, 
                currentAlbum: action.track.album };

        case musicActions.SELECT_SINGLE_TRACK:
            return { ...state,
                    currentTrack: action.track,
                    playingIndex: 0,
                    queue: [],
                    currentAlbum: action.track.album };

        case musicActions.NEXT_TRACK:
            return { 
                ...state, 
                currentTrack: state.queue[state.playingIndex + 1],
                playingIndex: state.playingIndex + 1,
                currentAlbum: action.album };
        
        case musicActions.PREVIOUS_TRACK:
            return { 
                ...state, 
                currentTrack: 
                state.queue[state.playingIndex - 1], 
                playingIndex: state.playingIndex - 1,
                currentAlbum: [state.playingIndex - 1].album };
            
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
                queue: [...state.queue, action.track] };

        case musicActions.UPDATE_RECENTLY_PLAYED:
            return { 
                ...state, 
                recentlyPlayed: action.recentTracks };

        case musicActions.ERROR_RECENTLY_PLAYED:
            return { 
                ...state, 
                errorRecentlyPlayed: action.error };

        case musicActions.UPDATE_VOLUME:
            return { 
                ...state, 
                volume: action.volume };

        case musicActions.PLAY_ALBUM_SUCCESS:
            return { 
                ...state, 
                currentTrack: action.tracks[0], 
                playingIndex: 0, 
                queue: action.tracks,
                currentAlbum: action.album
            };


        default:
            return state;
    }

};

export default musicReducer;