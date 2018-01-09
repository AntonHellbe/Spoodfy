import { artistActions } from '../constants/actions';

const INITIAL_STATE = {
    topArtists: [],
    currentArtist: {},
    loadingArtist: true,
    relatedArtists: [],
    artistTopTracks: [],
    artistAlbums: []
};


const artistReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) { 

        case artistActions.REQUEST_ARTIST:
            return { ...state, loadingArtist: true };

        case artistActions.TOP_ARTISTS_SUCCESS:
            return { ...state, topArtists: action.topArtists };

        case artistActions.ARTIST_SUCCESS:
            return { ...state, currentArtist: action.artist, loadingArtist: false };
        
        case artistActions.RELATED_ARTISTS_SUCCESS:
            return { ...state, relatedArtists: action.artists };
        
        case artistActions.REQUEST_ARTIST_TOP_TRACKS:
            return { ...state, loadingArtist: true };
        
        case artistActions.ARTIST_TOP_TRACKS_SUCCESS:
            return { ...state, artistTopTracks: action.tracks, loadingArtist: false };

        case artistActions.REQUEST_ARTIST_ALBUMS:
            return { ...state, loadingArtist: true };
        
        case artistActions.ARTIST_ALBUMS_SUCCESS:
            return { ...state, artistAlbums: action.albums, loadingArtist: false };

        default:
            return state;
    }
};


export default artistReducer;