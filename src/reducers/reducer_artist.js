import { artistActions } from '../constants/actions';

const INITIAL_STATE = {
    topArtists: [],
    activeArtist: {},
    loadingArtist: true,
};


const artistReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) { 

        case artistActions.REQUEST_ARTIST:
            return { ...state, loadingArtist: true };

        case artistActions.TOP_ARTISTS_SUCCESS:
            return { ...state, topArtists: action.topArtists };

        case artistActions.ARTIST_SUCCESS:
            return { ...state, activeArtist: action.artist, loadingArtist: false };

        default:
            return state;
    }
};


export default artistReducer;