import { playlistActions } from '../constants/actions';

const INITIAL_STATE = {
    myPlaylists: [],
    playlistSongs: [],
    activePlaylist: {
        playlist: {},
        playlistId: null
    },
    loadingPlaylist: false,
    isFollowingActivePlaylist: false
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case playlistActions.UPDATE_PLAYLIST_ID:
            return { ...state, 
                activePlaylist: { 
                    playlist: action.playlist,
                    playlistId: action.playlist.id
                }, 
                loadingPlaylist: true };

        case playlistActions.PLAYLIST_TRACKS_SUCCESS:
            return { ...state, playlistSongs: action.tracks, loadingPlaylist: false };
        
        case playlistActions.USER_PLAYLISTS_SUCCESS:
            return { ...state, myPlaylists: action.playlists };

        case playlistActions.IS_FOLLOWING_SUCCESS:
            return { ...state, isFollowingActivePlaylist: action.bool };

        case playlistActions.CLEAR_ACTIVE_PLAYLIST_ID:
            return { ...state, activePlaylist: { ...state.activePlaylist, playlistId: null } };
        
        case playlistActions.PLAY_PLAYLIST_SUCCESS:
            return { ...state, activePlaylist: { id: action.playlist.id, playlist: action.playlist }, playlistSongs: action.tracks };
        default:
            return state;
    }
};


export default playlistReducer;