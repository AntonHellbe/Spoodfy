import { musicActions } from '../constants/actions';

const INITIAL_STATE = {
    repeat: false,
    currentTrack: {},
    isPlaying: false,
    queue: [],
    errorRecentlyPlayed: '',
    volume: 0.05,
    playingIndex: 0,
    currentAlbum: {},
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
                queue: action.queue, 
                currentAlbum: action.track.album,
                tracklistId: action.tracklistId };

        case musicActions.SELECT_SINGLE_TRACK:
            return { ...state,
                    currentTrack: action.track,
                    playingIndex: 0,
                    queue: [],
                    currentAlbum: action.track.album,
                    playingPlaylist: null };

        case musicActions.NEXT_TRACK:
            return { 
                ...state, 
                currentTrack: state.queue[state.playingIndex + 1],
                playingIndex: state.playingIndex + 1,
                currentAlbum: state.queue[state.playingIndex + 1].album };
        
        case musicActions.PREVIOUS_TRACK:
            return { 
                ...state, 
                currentTrack: state.queue[state.playingIndex - 1], 
                playingIndex: state.playingIndex - 1,
                currentAlbum: state.queue[state.playingIndex - 1].album };
            
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
                queue: state.queue.slice(0, state.playingIndex + 1)
                .concat(action.track)
                .concat(state.queue.slice(state.playingIndex + 1)) };

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
                currentAlbum: action.tracks[0].album
            };
        
        case musicActions.PLAY_PLAYLIST:
            return {
                ...state,
                currentTrack: action.tracks[0],
                playingIndex: 0,
                queue: action.tracks,
                currentAlbum: action.tracks[0].album,
                tracklistId: action.playlistId
            };

        default:
            return state;
    }

};

export default musicReducer;