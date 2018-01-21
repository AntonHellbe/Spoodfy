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
    editPlaylistModal: false,
    addPlaylistModal: false
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

        case playlistActions.TOGGLE_PLAYLIST_EDIT_MODAL:
            return { ...state, editPlaylistModal: !state.editPlaylistModal };
        
        case playlistActions.TOGGLE_PLAYLIST_ADD_MODAL:
            return { ...state, addPlaylistModal: !state.addPlaylistModal };
        
        default:
            return state;
    }
};


export default playlistReducer;