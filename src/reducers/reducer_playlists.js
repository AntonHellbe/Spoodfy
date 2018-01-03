import { playlistActions } from '../constants/actions';

const INITIAL_STATE = {
    myPlaylists: []
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case playlistActions.PLAYLISTS_SUCCESS:
            return { ...state, myPlaylists: action.playlists };
        default:
            return state;
    }
};


export default playlistReducer;