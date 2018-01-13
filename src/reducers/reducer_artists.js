import { artistActions } from '../constants/actions';

const INITIAL_STATE = {
    topArtists: [],
    currentArtist: {},
    loadingArtist: true,
    relatedArtists: [],
    followedArtists: [],
    error: ''
};


const artistReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) { 

        case artistActions.REQUEST_TOP_ARTISTS:
            return { ...state, loadingArtist: true };

        case artistActions.TOP_ARTISTS_SUCCESS:
            return { ...state, topArtists: action.topArtists, loadingArtist: false };
        
        case artistActions.REQUEST_RELATED_ARTISTS:
            return { ...state, loadingArtist: true };

        case artistActions.UPDATE_CURRENT_ARTIST:
            return { ...state, currentArtist: action.artist };
        
        case artistActions.RELATED_ARTISTS_SUCCESS:
            return { ...state, relatedArtists: action.artists, loadingArtist: false };
      
        case artistActions.FOLLOWED_ARTISTS_SUCCESS:
            return { ...state, followedArtists: action.artists };
        
        case artistActions.FOLLOWED_ARTISTS_ERROR:
            return { ...state, error: action.error };

        case artistActions.CLEAR_CURRENT_ARTIST:
            return { ...state, currentArtist: {} };

        default:
            return state;
    }
};


export default artistReducer;