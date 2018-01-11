import { playlistActions } from '../constants/actions';

const INITIAL_STATE = {
    myPlaylists: [],
    playlistSongs: [],
    activePlaylist: {},
    loadingPlaylist: false,
    isFollowingActivePlaylist: false
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case playlistActions.UPDATE_PLAYLIST_ID:
            return { ...state, activePlaylist: action.playlist, loadingPlaylist: true };

        case playlistActions.PLAYLIST_TRACKS_SUCCESS:
            return { ...state, playlistSongs: action.tracks, loadingPlaylist: false };
        
        case playlistActions.PLAYLISTS_SUCCESS:
            return { ...state, myPlaylists: action.playlists };

        case playlistActions.IS_FOLLOWING_SUCCESS:
            return { ...state, isFollowingActivePlaylist: action.bool };

        case playlistActions.CLEAR_ACTIVE_PLAYLIST:
            return { ...state, activePlaylist: {} };
        default:
            return state;
    }
};


export default playlistReducer;