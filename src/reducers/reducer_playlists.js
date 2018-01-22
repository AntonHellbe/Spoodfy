import { playlistActions } from '../constants/actions';

const INITIAL_STATE = {
    userPlaylists: [],
    activePlaylist: {
        playlist: {},
        playlistId: null
    },
    loadingPlaylist: false,
    isFollowingActivePlaylist: false,
    featuredPlaylists: [],
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case playlistActions.UPDATE_PLAYLIST_ID:
            return { ...state, 
                activePlaylist: { 
                    playlist: action.playlist,
                    playlistId: action.playlist.id
                } };
        
        case playlistActions.USER_PLAYLISTS_SUCCESS:
            return { ...state, userPlaylists: action.playlists };

        case playlistActions.IS_FOLLOWING_SUCCESS:
            return { ...state, isFollowingActivePlaylist: action.bool };

        case playlistActions.CLEAR_ACTIVE_PLAYLIST_ID:
            return { ...state, activePlaylist: { ...state.activePlaylist, playlistId: null } };
        
        case playlistActions.FEATURED_PLAYLISTS_SUCCESS:
            return { ...state, featuredPlaylists: action.playlists };
        
        default:
            return state;
    }
};


export default playlistReducer;