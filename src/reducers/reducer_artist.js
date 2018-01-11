import { artistActions } from '../constants/actions';

const INITIAL_STATE = {
    topArtists: [],
    currentArtist: {},
    loadingArtist: true,
    relatedArtists: [],
    artistAlbums: [],
    followedArtists: [],
    error: ''
};


const artistReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) { 

        case artistActions.REQUEST_TOP_ARTISTS:
            return { ...state, loadingArtist: true };

        case artistActions.REQUEST_ARTIST:
            return { ...state, loadingArtist: true };

        case artistActions.TOP_ARTISTS_SUCCESS:
            return { ...state, topArtists: action.topArtists, loadingArtist: false };

        case artistActions.ARTIST_SUCCESS:
            return { ...state, currentArtist: action.artist, loadingArtist: false };
        
        case artistActions.RELATED_ARTISTS_SUCCESS:
            return { ...state, relatedArtists: action.artists };
      

        case artistActions.REQUEST_ARTIST_ALBUMS:
            return { ...state, loadingArtist: true };
        
        case artistActions.ARTIST_ALBUMS_SUCCESS:
            return { ...state, artistAlbums: action.albums, loadingArtist: false };
        
        case artistActions.FOLLOWED_ARTISTS_SUCCESS:
            return { ...state, followedArtists: action.artists };
        
        case artistActions.FOLLOWED_ARTISTS_ERROR:
            return { ...state, error: action.error };

        default:
            return state;
    }
};


export default artistReducer;