import { playlistActions } from '../constants/actions';

const INITIAL_STATE = {
    myPlaylists: [],
    playlistSongs: [],
    activePlaylist: ''
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case playlistActions.UPDATE_PLAYLIST_ID:
            return { ...state, activePlaylist: action.playlist };

        case playlistActions.PLAYLIST_TRACKS_SUCCESS:
            return { ...state, playlistSongs: action.tracks };
        
        case playlistActions.PLAYLISTS_SUCCESS:
            return { ...state, myPlaylists: action.playlists };
        default:
            return state;
    }
};


export default playlistReducer;