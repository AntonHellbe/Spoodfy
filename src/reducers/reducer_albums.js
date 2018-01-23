import { albumActions } from '../constants/actions';

const INITIAL_STATE = {
    artistAlbums: [],
    albumTracks: [],
    loadingAlbum: false,
    currentAlbum: {}
};


const albumReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case albumActions.REQUEST_ALBUM_TRACKS:
            return { ...state, loadingAlbum: true };
        
        case albumActions.ALBUM_TRACKS_SUCCESS:
            return { ...state, albumTracks: action.tracks, loadingAlbum: false };

        case albumActions.REQUEST_ARTIST_ALBUMS:
            return { ...state, loadingAlbum: true };

        case albumActions.ARTIST_ALBUMS_SUCCESS:
            return { ...state, artistAlbums: action.albums, loadingAlbum: false };
        
        case albumActions.UPDATE_CURRENT_ALBUM:
            return { ...state, currentAlbum: action.album };
        
            
        default:
            return state;
    }
};


export default albumReducer;